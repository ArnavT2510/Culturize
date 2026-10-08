import { recipes, SAMPLE_AREA, stores, statusLabels } from "./data.js";

const form = document.querySelector("#search-form");
const dishInput = document.querySelector("#dish-input");
const locationInput = document.querySelector("#location-input");
const formMessage = document.querySelector("#form-message");
const resultsSection = document.querySelector("#results-section");
const resultsContent = document.querySelector("#results-content");
const resultsTitle = document.querySelector("#results-title");
const resultsSubtitle = document.querySelector("#results-subtitle");
const areaLabel = document.querySelector("#area-label");
const dataNote = document.querySelector("#data-note");

let currentRecipe = recipes[0];
let currentArea = { kind: "sample", label: `${SAMPLE_AREA.city} · ${SAMPLE_AREA.zip}` };
let activeMode = "authentic";

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function normalize(value) {
  return value
    .toLocaleLowerCase("en-US")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function findRecipe(query) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return null;

  const searchable = recipes.map((recipe) => ({
    recipe,
    names: [recipe.title, ...recipe.aliases].map(normalize),
  }));

  const exact = searchable.find(({ names }) => names.includes(normalizedQuery));
  if (exact) return exact.recipe;

  const close = searchable.find(({ names }) => names.some((name) =>
    normalizedQuery.length >= 5 && (name.startsWith(normalizedQuery) || normalizedQuery.startsWith(name)),
  ));
  return close?.recipe ?? null;
}

function resolveLocation(value) {
  const trimmed = value.trim();
  const zipMatch = trimmed.match(/^(\d{5})(?:-\d{4})?$/);
  if (zipMatch) {
    if (zipMatch[1] === SAMPLE_AREA.zip) {
      return { valid: true, supported: true, kind: "zip", label: `${SAMPLE_AREA.city} · ${SAMPLE_AREA.zip}` };
    }
    return { valid: true, supported: false, kind: "zip", label: zipMatch[1] };
  }

  const coordinateMatch = trimmed.match(/^(-?\d{1,2}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)$/);
  if (coordinateMatch) {
    const latitude = Number(coordinateMatch[1]);
    const longitude = Number(coordinateMatch[2]);
    const validCoordinates = Number.isFinite(latitude)
      && Number.isFinite(longitude)
      && latitude >= -90 && latitude <= 90
      && longitude >= -180 && longitude <= 180;

    if (!validCoordinates) return { valid: false };

    // The checked-in example catalog covers a small area around the San Francisco sample ZIP.
    const supported = Math.abs(latitude - SAMPLE_AREA.coordinates.latitude) <= 0.035
      && Math.abs(longitude - SAMPLE_AREA.coordinates.longitude) <= 0.045;
    return {
      valid: true,
      supported,
      kind: "coordinates",
      label: supported ? `${SAMPLE_AREA.city} · sample area` : `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`,
    };
  }

  return { valid: false };
}

function getPlan(ingredient) {
  if (activeMode === "swaps" && ingredient.swap) {
    return { type: "swap", itemName: ingredient.swap.name, details: ingredient.swap };
  }

  if (ingredient.authentic) {
    return { type: "authentic_nearby", itemName: ingredient.name, details: ingredient.authentic };
  }

  if (ingredient.base) {
    return { type: ingredient.base.type, itemName: ingredient.name, details: ingredient.base };
  }

  if (ingredient.swap) {
    return { type: "swap", itemName: ingredient.swap.name, details: ingredient.swap };
  }

  return { type: "specialty", itemName: ingredient.name, details: { note: "No tested swap. Keep the original ingredient if you can find it." } };
}

function getStoreName(storeId) {
  return storeId && stores[storeId] ? stores[storeId].name : "";
}

function renderPlanSummary(ingredients) {
  const counts = ingredients.reduce((summary, ingredient) => {
    const plan = getPlan(ingredient);
    summary[plan.type] = (summary[plan.type] ?? 0) + 1;
    return summary;
  }, {});

  const pills = [
    ["authentic_nearby", "authentic nearby"],
    ["swap", "tested swaps"],
    ["easy", "easy to find"],
    ["pantry", "from your pantry"],
    ["specialty", "specialty"],
  ]
    .filter(([key]) => counts[key])
    .map(([key, label]) => `<span class="summary-pill summary-${key}"><b>${counts[key]}</b> ${label}</span>`)
    .join("");

  return `<div class="plan-summary" aria-label="Ingredient breakdown">
    <span class="ingredient-count"><b>${ingredients.length}</b> ingredient notes</span>
    <div class="summary-pills">${pills}</div>
  </div>`;
}

function renderIngredient(ingredient, index) {
  const plan = getPlan(ingredient);
  const details = plan.details;
  const label = statusLabels[plan.type];
  const isSwap = plan.type === "swap";
  const store = getStoreName(details.storeId);

  let description = "";
  let meta = "";

  if (isSwap) {
    description = `<p class="ingredient-choice">Use <strong>${escapeHtml(plan.itemName)}</strong><span class="ingredient-original">in place of ${escapeHtml(ingredient.name)}</span></p>
      <div class="swap-details">
        <span class="match-score"><span class="match-dot" aria-hidden="true"></span> Flavor match <strong>${details.match}%</strong></span>
        <p class="swap-ratio"><span>Ratio</span>${escapeHtml(details.ratio)}</p>
        <p class="swap-why"><span>Why it works</span>${escapeHtml(details.why)}</p>
      </div>`;
    meta = renderMeta(store, details.aisle, details.price, "swap-source");
  } else if (plan.type === "authentic_nearby") {
    description = `<p class="ingredient-note">${escapeHtml(details.note)}</p>`;
    meta = renderMeta(store, details.aisle, details.price, "authentic-source");
  } else if (plan.type === "easy") {
    description = `<p class="ingredient-note">${escapeHtml(details.note)}</p>`;
    meta = renderMeta(store, details.aisle, details.price, "easy-source");
  } else if (plan.type === "pantry") {
    description = `<p class="ingredient-note">${escapeHtml(details.note)}</p>
      <div class="ingredient-meta"><span class="meta-tag pantry-tag"><span aria-hidden="true">⌂</span> At home · pantry staple</span></div>`;
  } else {
    description = `<p class="ingredient-note specialty-note"><strong>No tested swap.</strong> Keep the original ingredient if you can find it.</p>
      <div class="ingredient-meta"><span class="meta-tag specialty-tag">Specialty item</span><span class="meta-tag muted-tag">No local match listed</span></div>`;
  }

  return `<li class="ingredient-row ingredient-${plan.type}">
    <div class="ingredient-row-top">
      <span class="ingredient-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
      <div class="ingredient-name-wrap">
        <h4>${escapeHtml(ingredient.name)}</h4>
        ${isSwap ? `<span class="original-label">Original ingredient</span>` : ""}
      </div>
      <span class="status-label status-${plan.type}"><span class="status-symbol" aria-hidden="true">${statusSymbol(plan.type)}</span>${escapeHtml(label)}</span>
    </div>
    <div class="ingredient-detail">${description}${meta}</div>
  </li>`;
}

function statusSymbol(type) {
  return {
    authentic_nearby: "✳",
    swap: "↔",
    easy: "○",
    pantry: "⌂",
    specialty: "!",
  }[type] ?? "•";
}

function renderMeta(storeName, aisle, price, type) {
  const safeStore = storeName ? `<span class="meta-tag store-tag"><svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.5 6.5h11l-1 7h-9l-1-7Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="m3 6.5 1.4-4h7.2l1.4 4M6 9v2.5m4-2.5v2.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>${escapeHtml(storeName)}</span>` : "";
  const safeAisle = aisle ? `<span class="meta-tag aisle-tag">${escapeHtml(aisle)}</span>` : "";
  const safePrice = price ? `<span class="meta-tag price-tag">${escapeHtml(price)}</span>` : "";
  return `<div class="ingredient-meta ${type}">${safeStore}${safeAisle}${safePrice}</div>`;
}

function renderStores(recipe) {
  return recipe.stores.map((storeId) => {
    const store = stores[storeId];
    const typicalItems = [];

    for (const ingredient of recipe.ingredients) {
      if (ingredient.authentic?.storeId === storeId) typicalItems.push(ingredient.name);
      if (ingredient.swap?.storeId === storeId) typicalItems.push(ingredient.swap.name);
      if (ingredient.base?.storeId === storeId) typicalItems.push(ingredient.name);
    }

    const uniqueItems = [...new Set(typicalItems)];
    return `<article class="store-card">
      <div class="store-card-top">
        <div class="store-mark store-mark-${store.color}" aria-hidden="true">${escapeHtml(store.mark)}</div>
        <div class="store-card-heading"><h4>${escapeHtml(store.name)}</h4><p>${escapeHtml(store.kind)}</p></div>
        <span class="store-stock-label"><span aria-hidden="true"></span> Typical stock</span>
      </div>
      <p class="store-address"><svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M12.8 6.6c0 3.6-4.8 7.2-4.8 7.2S3.2 10.2 3.2 6.6a4.8 4.8 0 1 1 9.6 0Z" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="6.5" r="1.5" stroke="currentColor" stroke-width="1.2"/></svg>${escapeHtml(store.address)}</p>
      <div class="store-items-label">IN THIS RECIPE MAP</div>
      <div class="store-item-list">${uniqueItems.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
    </article>`;
  }).join("");
}

function renderMethod(recipe) {
  const nameById = new Map(recipe.ingredients.map((ingredient) => [ingredient.id, getPlan(ingredient).itemName]));
  const steps = recipe.method.map((step) => {
    const text = step.replace(/\[\[([a-z0-9-]+)\]\]/g, (token, ingredientId) => nameById.get(ingredientId) ?? token);
    return `<li>${escapeHtml(text)}</li>`;
  }).join("");

  return `<section class="method-card" aria-labelledby="method-title">
    <div class="method-heading">
      <span class="method-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M7.5 3.5v6m3-6v6m-3-3h3m-1.5 3v11m8-17c-1.7 2-2.5 4.2-2.5 6.1 0 1.7.9 2.7 2.5 3.1v7.8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      <div><p class="card-kicker">A WAY TO BRING IT TOGETHER</p><h3 id="method-title">Cooking notes</h3></div>
    </div>
    <ol class="method-list">${steps}</ol>
  </section>`;
}

function renderRecipe(recipe, area) {
  currentRecipe = recipe;
  currentArea = area;
  resultsTitle.textContent = `${recipe.title}, made close to home`;
  resultsSubtitle.textContent = recipe.intro;
  areaLabel.textContent = area.label;
  dataNote.hidden = false;
  resultsContent.className = "results-grid";
  resultsContent.setAttribute("aria-busy", "false");

  const modeLabel = activeMode === "authentic" ? "AS AUTHENTIC AS POSSIBLE" : "USE SWAPS WHERE TESTED";
  const rows = recipe.ingredients.map(renderIngredient).join("");
  const storesMarkup = renderStores(recipe);

  resultsContent.innerHTML = `<div class="recipe-column">
      <article class="recipe-card">
        <div class="recipe-card-heading">
          <div>
            <p class="card-kicker">RECIPE, REWRITTEN</p>
            <h3>Your ingredient map</h3>
          </div>
          <span class="cuisine-tag"><span aria-hidden="true">✳</span> ${escapeHtml(recipe.cuisine)} cuisine</span>
        </div>
        <div class="mode-control">
          <div class="mode-copy"><span class="mode-icon" aria-hidden="true">↔</span><span><strong>How would you like to shop?</strong><small>${modeLabel}</small></span></div>
          <div class="mode-switch" role="group" aria-label="Choose authentic ingredients or tested swaps">
            <button class="mode-button ${activeMode === "authentic" ? "is-active" : ""}" type="button" data-mode="authentic" aria-pressed="${activeMode === "authentic"}">As authentic as possible</button>
            <button class="mode-button ${activeMode === "swaps" ? "is-active" : ""}" type="button" data-mode="swaps" aria-pressed="${activeMode === "swaps"}">Use tested swaps</button>
          </div>
        </div>
        ${renderPlanSummary(recipe.ingredients)}
        <ol class="ingredient-list" aria-label="Ingredients and nearby options">${rows}</ol>
        ${renderMethod(recipe)}
      </article>
    </div>
    <aside class="stores-column" aria-labelledby="stores-title">
      <div class="stores-panel">
        <div class="stores-panel-heading">
          <span class="stores-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M3.5 10h17L19 21H5L3.5 10Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="m4.5 10 2-6h11l2 6M9 14v3m6-3v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span>
          <div><p class="card-kicker">NEARBY STORES · TYPICAL STOCK</p><h3 id="stores-title">Shop the ingredients</h3></div>
        </div>
        <p class="stores-intro">Local grocery options included in this sample recipe map.</p>
        <div class="store-list">${storesMarkup}</div>
        <div class="stock-caveat"><span aria-hidden="true">i</span><p>Typical stock can change. Prices are estimates; confirm with the store before you go.</p></div>
      </div>
      <div class="aisle-tip">
        <span class="aisle-tip-icon" aria-hidden="true">✳</span>
        <p><strong>Keep the flavor, not the stress.</strong><br />The right swap is the one that helps the dish feel like yours.</p>
      </div>
    </aside>`;
}

function renderNoMap(dish, area) {
  currentRecipe = null;
  currentArea = area;
  resultsTitle.textContent = "No tested ingredient map yet";
  resultsSubtitle.textContent = "We won’t guess at a swap when there isn’t a tested match in this preview.";
  areaLabel.textContent = area.label;
  dataNote.hidden = true;
  resultsContent.className = "results-grid results-grid-empty";
  resultsContent.setAttribute("aria-busy", "false");
  resultsContent.innerHTML = `<article class="empty-state">
    <div class="empty-illustration" aria-hidden="true"><span>?</span><i></i><b></b></div>
    <div class="empty-copy"><p class="card-kicker">NO TESTED MAP</p>
      <h3>We don’t have a tested ingredient map for “${escapeHtml(dish)}”.</h3>
      <p>Try one of the sample dishes above to see nearby stock, tested swaps, pantry staples, and specialty items with no tested substitute.</p>
      <button type="button" class="empty-sample-button" data-dish="Thai green curry">Try Thai green curry <span aria-hidden="true">→</span></button>
    </div>
  </article>`;
}

function renderNoLocation(location) {
  currentRecipe = null;
  currentArea = { kind: "unsupported", label: location.label };
  resultsTitle.textContent = "No nearby-store sample for this area";
  resultsSubtitle.textContent = "The preview’s local stock map currently covers San Francisco, CA 94103.";
  areaLabel.textContent = location.label;
  dataNote.hidden = true;
  resultsContent.className = "results-grid results-grid-empty";
  resultsContent.setAttribute("aria-busy", "false");
  resultsContent.innerHTML = `<article class="empty-state location-empty">
    <div class="empty-illustration map-illustration" aria-hidden="true"><svg viewBox="0 0 36 36" fill="none"><path d="M18 31s10-9 10-16A10 10 0 0 0 8 15c0 7 10 16 10 16Z" stroke="currentColor" stroke-width="1.7"/><circle cx="18" cy="14.5" r="3.5" stroke="currentColor" stroke-width="1.7"/></svg></div>
    <div class="empty-copy"><p class="card-kicker">OUTSIDE THIS PREVIEW</p>
      <h3>We don’t have typical-stock data for ${escapeHtml(location.label)} yet.</h3>
      <p>This local preview includes sample stores and ingredient matches for San Francisco, CA 94103. Enter <strong>94103</strong> or coordinates near <strong>37.77, -122.41</strong> to explore it.</p>
      <button type="button" class="empty-sample-button" data-location="94103">Load the 94103 sample <span aria-hidden="true">→</span></button>
    </div>
  </article>`;
}

function search({ scroll = false } = {}) {
  const dish = dishInput.value.trim();
  const locationValue = locationInput.value.trim();

  if (!dish) {
    formMessage.textContent = "Enter a dish or recipe to get started.";
    formMessage.classList.add("is-error");
    dishInput.focus();
    return;
  }

  if (!locationValue) {
    formMessage.textContent = "Enter a U.S. ZIP code or coordinates.";
    formMessage.classList.add("is-error");
    locationInput.focus();
    return;
  }

  const location = resolveLocation(locationValue);
  if (!location.valid) {
    formMessage.textContent = "Use a 5-digit U.S. ZIP code or coordinates like 37.77, -122.41.";
    formMessage.classList.add("is-error");
    locationInput.focus();
    return;
  }

  formMessage.textContent = "";
  formMessage.classList.remove("is-error");

  if (!location.supported) {
    renderNoLocation(location);
  } else {
    const recipe = findRecipe(dish);
    if (recipe) {
      renderRecipe(recipe, { kind: "sample", label: location.label });
    } else {
      renderNoMap(dish, { kind: "sample", label: location.label });
    }
  }

  if (scroll) {
    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  search({ scroll: true });
});

document.querySelector("#clear-dish").addEventListener("click", () => {
  dishInput.value = "";
  dishInput.focus();
});

document.querySelectorAll(".sample-chip").forEach((button) => {
  button.addEventListener("click", () => {
    dishInput.value = button.dataset.dish;
    search({ scroll: true });
  });
});

resultsContent.addEventListener("click", (event) => {
  const modeButton = event.target.closest("[data-mode]");
  if (modeButton && currentRecipe) {
    activeMode = modeButton.dataset.mode;
    renderRecipe(currentRecipe, currentArea);
    return;
  }

  const sampleButton = event.target.closest("[data-dish]");
  if (sampleButton) {
    dishInput.value = sampleButton.dataset.dish;
    search({ scroll: false });
    return;
  }

  const locationButton = event.target.closest("[data-location]");
  if (locationButton) {
    locationInput.value = locationButton.dataset.location;
    search({ scroll: false });
  }
});

renderRecipe(recipes[0], currentArea);
