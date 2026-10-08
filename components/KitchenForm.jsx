"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import DishCard from "./DishCard";
import RecipePanel, { StoreChip } from "./RecipePanel";
import { IngredientLookupPanel, MissingSwapPanel, RemoteImage } from "./Panels";
import { CUISINE_OPTIONS } from "@/lib/cuisines";
import { card, label as labelClass, input, btnPrimary } from "@/lib/ui";

const STEPS = [
  { icon: "🔎", text: "Finding the recipe — our library, cookbooks and the web" },
  { icon: "📍", text: "Locating grocery stores near you" },
  { icon: "🛒", text: "Checking what each store typically stocks" },
  { icon: "🌶️", text: "Flavor-matching hard-to-find ingredients" },
  { icon: "📝", text: "Rewriting the recipe around your swaps" },
];

const EXAMPLE_LIST = `2 cups long-grain rice
3 tbsp gochugaru
1 tbsp fish sauce
6 makrut lime leaves
1 thumb galangal
2 tbsp palm sugar
1 lb chicken thighs
Salt to taste`;

const ZIP_KEY = "culturize:zip";

const TABS = [
  ["dish", "🍲 Find a dish"],
  ["ingredient", "🥬 Look up ingredient"],
  ["missing", "🔁 Missing ingredient"],
  ["paste", "📜 Paste recipe"],
];

const STYLE_OPTIONS = [
  ["authentic", "🧭 Authentic first", "Use the real thing from specialty markets nearby when we can."],
  ["one-stop", "🛒 One-stop shop", "Everything from a single store, with smart swaps."],
];

export default function KitchenForm({
  dishes,
  initialDish,
  initialZip,
  initialMode,
  autoRun,
  aiEnabled,
}) {
  const [mode, setMode] = useState(initialMode);
  const [dish, setDish] = useState(initialMode === "ingredient" ? "" : initialDish);
  const [ingredientQuery, setIngredientQuery] = useState(
    initialMode === "ingredient" ? initialDish : "",
  );
  const [missingIngredient, setMissingIngredient] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [zip, setZip] = useState(initialZip);
  const [coords, setCoords] = useState(null);
  const [servings, setServings] = useState(null);
  const [style, setStyle] = useState("authentic");
  const [ingredientsText, setIngredientsText] = useState("");
  const [stepsText, setStepsText] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [storeResult, setStoreResult] = useState(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ingredientResult, setIngredientResult] = useState(null);
  const [missingResult, setMissingResult] = useState(null);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [saving, setSaving] = useState(false);
  const [savedId, setSavedId] = useState(null);

  const zipTimer = useRef(null);
  const storesAbort = useRef(null);
  const resultRef = useRef(null);
  const bootstrapped = useRef(false);

  async function loadStores(query, onDone) {
    storesAbort.current?.abort();
    const controller = new AbortController();
    storesAbort.current = controller;
    setLocating(true);
    try {
      const response = await fetch(`/api/stores?${query}`, { signal: controller.signal });
      if (response.ok) {
        const data = await response.json();
        setStoreResult(data);
        onDone?.(data);
      }
    } catch {
      /* aborted */
    } finally {
      if (storesAbort.current === controller) setLocating(false);
    }
  }

  function onZipChange(value) {
    const clean = value.replace(/\D/g, "").slice(0, 5);
    setZip(clean);
    setCoords(null);
    setLocationError(null);
    if (zipTimer.current) clearTimeout(zipTimer.current);
    if (clean.length === 5) {
      try {
        localStorage.setItem(ZIP_KEY, clean);
      } catch {}
      zipTimer.current = setTimeout(() => loadStores(`zip=${clean}`), 400);
    } else {
      storesAbort.current?.abort();
      setStoreResult(null);
      setLocating(false);
    }
  }

  async function run(overrides) {
    const activeMode = overrides?.mode ?? mode;
    const dishName = (overrides?.dish ?? dish).trim();
    const zipValue = overrides?.zip ?? zip;
    const shoppingStyle = overrides?.style ?? style;

    if (activeMode === "dish" && !dishName) {
      setError("Tell us what you'd like to cook.");
      setRecipe(null);
      return;
    }
    if (activeMode === "paste" && !ingredientsText.trim()) {
      setError("Paste your family recipe's ingredients (one per line) first.");
      setRecipe(null);
      return;
    }

    setBusy(true);
    setError(null);
    setSuggestions([]);
    setRecipe(null);
    setIngredientResult(null);
    setMissingResult(null);
    setSavedId(null);
    setProgress(0);

    const ticker = setInterval(
      () => setProgress((value) => Math.min(value + 1, STEPS.length - 1)),
      1100,
    );
    resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    try {
      const response = await fetch("/api/culturize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: activeMode,
          dish: dishName,
          cuisine: cuisine || undefined,
          zip: coords ? undefined : /^\d{5}$/.test(zipValue) ? zipValue : undefined,
          lat: coords?.lat,
          lon: coords?.lon,
          servings: servings ?? undefined,
          style: shoppingStyle,
          ingredientsText: activeMode === "paste" ? ingredientsText : undefined,
          stepsText: activeMode === "paste" ? stepsText : undefined,
        }),
      });
      const data = await response.json();

      if (data.ok) {
        setRecipe(data.recipe);
        if (activeMode === "dish") {
          const next = new URLSearchParams({ dish: dishName });
          if (/^\d{5}$/.test(zipValue)) next.set("zip", zipValue);
          window.history.replaceState(null, "", `/kitchen?${next}`);
        }
      } else if (activeMode === "dish") {
        try {
          const lookup = await fetch(`/api/substitute?q=${encodeURIComponent(dishName)}`);
          if (lookup.ok) {
            const payload = await lookup.json();
            const match = payload.ingredient;
            if (payload.ok && match && "unknown" !== match.kind) {
              setMode("ingredient");
              setIngredientQuery(dishName);
              setIngredientResult(match);
              setError(null);
              window.history.replaceState(
                null,
                "",
                `/kitchen?mode=ingredient&ingredient=${encodeURIComponent(dishName)}`,
              );
              return;
            }
          }
        } catch {}
        setError(data.error);
        setSuggestions(data.suggestions ?? []);
      } else {
        setError(data.error);
      }
    } catch {
      setError("We couldn't reach the kitchen. Check your connection and try again.");
    } finally {
      clearInterval(ticker);
      setBusy(false);
      requestAnimationFrame(() =>
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  }

  const activeQuery = mode === "ingredient" ? ingredientQuery : mode === "missing" ? missingIngredient : dish;

  async function lookupIngredient(value = ingredientQuery) {
    const query = value.trim();
    if (!query) {
      setError("Type an ingredient to look it up.");
      return;
    }
    setIngredientQuery(query);
    setMode("ingredient");
    setBusy(true);
    setError(null);
    setRecipe(null);
    setMissingResult(null);
    setIngredientResult(null);
    try {
      const response = await fetch(`/api/substitute?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      if (!response.ok || !data.ok || !data.ingredient) {
        throw new Error(data.error ?? "Couldn't find ingredient information.");
      }
      setIngredientResult(data.ingredient);
      const next = new URLSearchParams({ mode: "ingredient", ingredient: query });
      if (/^\d{5}$/.test(zip)) next.set("zip", zip);
      window.history.replaceState(null, "", `/kitchen?${next}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Couldn't look up that ingredient.");
    } finally {
      setBusy(false);
    }
  }

  async function findMissing() {
    const dishName = dish.trim();
    const ingredient = missingIngredient.trim();
    if (!dishName) {
      setError("Tell us which dish you're making.");
      return;
    }
    if (!ingredient) {
      setError("Tell us which ingredient you don't have.");
      return;
    }
    setBusy(true);
    setError(null);
    setRecipe(null);
    setIngredientResult(null);
    setMissingResult(null);
    setSuggestions([]);
    try {
      const response = await fetch("/api/substitute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dish: dishName,
          ingredient,
          cuisine: cuisine || undefined,
          zip: coords ? undefined : /^\d{5}$/.test(zip) ? zip : undefined,
          lat: coords?.lat,
          lon: coords?.lon,
          style,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) throw new Error(data.error ?? "Couldn't find a substitute.");
      setMissingResult(data);
      window.history.replaceState(null, "", "/kitchen?mode=missing");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Couldn't find a substitute. Try another spelling.");
    } finally {
      setBusy(false);
    }
  }

  async function saveRecipe() {
    if (!recipe) return;
    setSaving(true);
    try {
      const response = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipe }),
      });
      const data = await response.json();
      if (response.ok && data.id) setSavedId(data.id);
      else setError(data.error ?? "Couldn't save this recipe.");
    } catch {
      setError("Couldn't save this recipe.");
    } finally {
      setSaving(false);
    }
  }

  function chooseDish(name) {
    setMode("dish");
    setDish(name);
    run({ dish: name, mode: "dish" });
  }

  useEffect(() => {
    const query = activeQuery.trim();
    if (mode !== "dish" && mode !== "ingredient" && mode !== "missing") return;
    if (query.length < 3) return;
    if (/^https?:/i.test(query)) return;
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/dishes/suggest?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        });
        if (response.ok) setSearchSuggestions((await response.json()).suggestions);
      } catch {}
    }, 320);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [dish, ingredientQuery, missingIngredient, mode, activeQuery]);

  useEffect(() => {
    if (bootstrapped.current) return;
    bootstrapped.current = true;
    let stored = initialZip;
    if (!stored) {
      try {
        stored = localStorage.getItem(ZIP_KEY) ?? "";
      } catch {
        stored = "";
      }
    }
    if (/^\d{5}$/.test(stored)) {
      if (stored !== initialZip) setZip(stored);
      loadStores(`zip=${stored}`);
    }
    if (autoRun && initialDish && initialMode === "dish") run({ dish: initialDish, zip: stored });
    if (initialMode === "ingredient" && initialDish) lookupIngredient(initialDish);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[400px_minmax(0,1fr)]">
      <aside className="no-print self-start lg:sticky lg:top-24">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            if (mode === "ingredient") lookupIngredient();
            else if (mode === "missing") findMissing();
            else run();
          }}
          className={`${card} p-5 sm:p-6`}
        >
          <div
            className="grid grid-cols-2 gap-1 rounded-2xl bg-sand p-1 text-[12px] font-semibold sm:text-sm"
            role="tablist"
          >
            {TABS.map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={mode === value}
                onClick={() => setMode(value)}
                className={`rounded-xl px-3 py-2.5 transition ${
                  mode === value ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="mt-5 space-y-4">
            {(mode === "dish" || mode === "missing") && (
              <div>
                <label htmlFor="dish" className={labelClass}>
                  {mode === "missing" ? "What dish are you making?" : "What are you craving?"}
                </label>
                <input
                  id="dish"
                  list={mode === "dish" ? "kitchen-search-suggestions" : undefined}
                  value={dish}
                  onChange={(event) => {
                    const value = event.target.value;
                    setDish(value);
                    const match = searchSuggestions.find(
                      (item) => item.name.toLocaleLowerCase() === value.trim().toLocaleLowerCase(),
                    );
                    if (match && match.kind !== "dish") {
                      setMode("ingredient");
                      setIngredientQuery(match.name);
                      setIngredientResult(null);
                      setRecipe(null);
                      setError(null);
                    }
                  }}
                  placeholder={
                    mode === "missing"
                      ? "e.g. moong dal tadka"
                      : "Any dish, from any cuisine — or paste a recipe link"
                  }
                  className={input}
                  autoComplete="off"
                />
                {mode === "dish" && (
                  <p className="mt-1.5 text-xs text-muted">
                    {aiEnabled ? "✨ AI is on. " : ""}
                    Search any dish. We check recipes across the web and cookbooks — not just a fixed menu.
                  </p>
                )}
              </div>
            )}

            {(mode === "dish" || mode === "ingredient" || mode === "missing") && (
              <datalist id="kitchen-search-suggestions">
                {searchSuggestions.map((item) => (
                  <option
                    key={`${item.kind}-${item.source}-${item.name}`}
                    value={item.name}
                    label={`${
                      item.kind === "ingredient" ? "🥬 Ingredient" : item.kind === "reference" ? "📚 Food reference" : "🍲 Dish"
                    } · ${item.cuisine ?? item.source}`}
                  />
                ))}
                {mode === "dish" &&
                  dishes.map((dishOption) => (
                    <option key={dishOption.id} value={dishOption.name} label={`🍲 ${dishOption.cuisine}`} />
                  ))}
              </datalist>
            )}

            {mode === "ingredient" && (
              <div>
                <label htmlFor="ingredient-query" className={labelClass}>
                  Ingredient, staple or food name
                </label>
                <input
                  id="ingredient-query"
                  list="kitchen-search-suggestions"
                  value={ingredientQuery}
                  onChange={(event) => setIngredientQuery(event.target.value)}
                  placeholder="e.g. moong dal, shatkora, epazote"
                  className={input}
                  autoComplete="off"
                />
                <p className="mt-1.5 text-xs text-muted">
                  Look up what it is, where it comes from, a real reference photo and possible swaps.
                </p>
              </div>
            )}

            {mode === "missing" && (
              <div>
                <label htmlFor="missing-ingredient" className={labelClass}>
                  What ingredient don&apos;t you have?
                </label>
                <input
                  id="missing-ingredient"
                  list="kitchen-search-suggestions"
                  value={missingIngredient}
                  onChange={(event) => setMissingIngredient(event.target.value)}
                  placeholder="e.g. moong dal, kaffir lime leaves, fenugreek"
                  className={input}
                  autoComplete="off"
                />
                <p className="mt-1.5 text-xs text-muted">
                  We&apos;ll use the dish and local stores to choose a fitting substitute.
                </p>
              </div>
            )}

            {mode === "paste" && (
              <>
                <div>
                  <label htmlFor="ingredients" className={labelClass}>
                    Ingredients · one per line
                  </label>
                  <textarea
                    id="ingredients"
                    value={ingredientsText}
                    onChange={(event) => setIngredientsText(event.target.value)}
                    rows={7}
                    placeholder={EXAMPLE_LIST}
                    className={`${input} font-mono text-[13px] leading-relaxed`}
                  />
                  <button
                    type="button"
                    onClick={() => setIngredientsText(EXAMPLE_LIST)}
                    className="mt-1 text-xs font-semibold text-paprika hover:underline"
                  >
                    Use an example list
                  </button>
                </div>
                <div>
                  <label htmlFor="steps" className={labelClass}>
                    Steps · optional
                  </label>
                  <textarea
                    id="steps"
                    value={stepsText}
                    onChange={(event) => setStepsText(event.target.value)}
                    rows={4}
                    placeholder="Paste the method and we'll note every swap inside it."
                    className={`${input} text-[13px] leading-relaxed`}
                  />
                </div>
              </>
            )}

            {mode !== "ingredient" && (
              <div>
                <label htmlFor="cuisine" className={labelClass}>
                  Home cuisine · optional
                </label>
                <select
                  id="cuisine"
                  value={cuisine}
                  onChange={(event) => setCuisine(event.target.value)}
                  className={input}
                >
                  <option value="">Any / let Culturize figure it out</option>
                  {CUISINE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label htmlFor="zip" className={labelClass}>
                Where do you shop?
              </label>
              <div className="flex gap-2">
                <input
                  id="zip"
                  value={coords ? `📍 ${storeResult?.location.label ?? "Current location"}` : zip}
                  onChange={(event) => onZipChange(event.target.value)}
                  onFocus={() => {
                    if (coords) onZipChange(zip);
                  }}
                  inputMode="numeric"
                  placeholder="ZIP code"
                  className={input}
                />
                <button
                  type="button"
                  onClick={() => {
                    if ("geolocation" in navigator) {
                      setLocationError(null);
                      setLocating(true);
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          const next = {
                            lat: +position.coords.latitude.toFixed(4),
                            lon: +position.coords.longitude.toFixed(4),
                          };
                          setCoords(next);
                          loadStores(`lat=${next.lat}&lon=${next.lon}`, (data) => {
                            if (data?.location?.zip) setZip(data.location.zip);
                          });
                        },
                        () => {
                          setLocating(false);
                          setLocationError("We couldn't get your location — enter a ZIP code instead.");
                        },
                        { timeout: 10000, maximumAge: 600000 },
                      );
                    } else {
                      setLocationError("Location isn't available in this browser — enter a ZIP instead.");
                    }
                  }}
                  className="shrink-0 rounded-2xl border border-clay bg-white px-3 text-sm font-semibold text-ink transition hover:bg-sand"
                  title="Use my location"
                >
                  📍 Locate
                </button>
              </div>
              {locationError && <p className="mt-1.5 text-xs text-paprika">{locationError}</p>}
              <div className="mt-3 min-h-6">
                {locating ? (
                  <div className="flex flex-wrap gap-2" aria-live="polite">
                    {[0, 1, 2].map((key) => (
                      <span key={key} className="h-7 w-28 animate-pulse rounded-full bg-sand" />
                    ))}
                    <span className="sr-only">Finding stores…</span>
                  </div>
                ) : storeResult ? (
                  <div className="rounded-2xl bg-sand/60 p-3">
                    <p className="text-xs font-semibold text-ink">
                      {storeResult.source === "osm"
                        ? `${storeResult.stores.length} stores mapped near ${storeResult.location.label}`
                        : `Common chains near ${storeResult.location.label}`}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {storeResult.stores.slice(0, 8).map((store) => (
                        <StoreChip key={store.id} store={store} />
                      ))}
                    </div>
                    {storeResult.note && (
                      <p className="mt-2 text-[11px] leading-snug text-muted">{storeResult.note}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-muted">
                    Add your ZIP to see the grocery stores and markets near you.
                  </p>
                )}
              </div>
            </div>

            {mode !== "ingredient" && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className={labelClass}>Servings</span>
                  <div className="flex items-center justify-between rounded-2xl border border-clay bg-white px-2 py-1.5">
                    <button
                      type="button"
                      aria-label="Fewer servings"
                      onClick={() => setServings((value) => Math.max(1, (value ?? 4) - 1))}
                      className="grid h-8 w-8 place-items-center rounded-full text-lg hover:bg-sand"
                    >
                      −
                    </button>
                    <span className="text-sm font-semibold">{servings ?? "Auto"}</span>
                    <button
                      type="button"
                      aria-label="More servings"
                      onClick={() => setServings((value) => Math.min(24, (value ?? 4) + 1))}
                      className="grid h-8 w-8 place-items-center rounded-full text-lg hover:bg-sand"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <span className={labelClass}>Engine</span>
                  <div className="rounded-2xl border border-clay bg-white px-3 py-2.5 text-sm font-semibold">
                    {aiEnabled ? "✨ AI + library" : "🌶️ Flavor engine"}
                  </div>
                </div>
              </div>
            )}

            {mode !== "ingredient" && (
              <fieldset>
                <legend className={labelClass}>Shopping style</legend>
                <div className="grid gap-2">
                  {STYLE_OPTIONS.map(([value, title, description]) => (
                    <label
                      key={value}
                      className={`flex cursor-pointer gap-3 rounded-2xl border p-3 transition ${
                        style === value
                          ? "border-paprika bg-paprika/5"
                          : "border-clay bg-white hover:bg-sand/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="style"
                        value={value}
                        checked={style === value}
                        onChange={() => setStyle(value)}
                        className="mt-1 accent-paprika"
                      />
                      <span>
                        <span className="block text-sm font-semibold">{title}</span>
                        <span className="block text-xs text-muted">{description}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            <button type="submit" disabled={busy} className={`${btnPrimary} w-full py-3.5 text-[15px]`}>
              {busy
                ? mode === "ingredient"
                  ? "Looking it up…"
                  : mode === "missing"
                    ? "Finding a substitute…"
                    : "Culturizing…"
                : mode === "ingredient"
                  ? "Look up ingredient"
                  : mode === "missing"
                    ? "Find my substitute"
                    : "Culturize my recipe"}
              {!busy && <span aria-hidden="true">→</span>}
            </button>
          </div>
        </form>
      </aside>

      <section ref={resultRef} className="min-w-0 scroll-mt-24" aria-live="polite">
        {busy ? (
          <div className={`${card} p-6 sm:p-8`}>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-saffron-soft border-t-paprika" />
              <div>
                <p className="font-display text-2xl font-semibold">
                  {mode === "ingredient"
                    ? `Looking up ${ingredientQuery || "ingredient"}…`
                    : mode === "missing"
                      ? "Finding a dish-specific substitute…"
                      : `Culturizing ${mode === "dish" ? dish || "your dish" : dish || "your family recipe"}…`}
                </p>
                <p className="text-sm text-muted">
                  {coords
                    ? "Checking stores around your location"
                    : /^\d{5}$/.test(zip)
                      ? `Checking stores near ${zip}`
                      : "Using common grocery chains"}
                </p>
              </div>
            </div>
            <ol className="mt-8 space-y-2.5">
              {STEPS.map((step, index) => (
                <li
                  key={step.text}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                    index < progress ? "text-ink" : "text-muted/60"
                  } ${index < progress ? "bg-herb-soft/55" : "bg-sand/45"}`}
                >
                  <span className="text-lg">{step.icon}</span>
                  {step.text}
                </li>
              ))}
            </ol>
            <div className="mt-6 grid gap-4">
              {[0, 1].map((key) => (
                <div key={key} className="h-24 animate-pulse rounded-2xl bg-sand" />
              ))}
            </div>
          </div>
        ) : mode === "ingredient" && ingredientResult ? (
          <IngredientLookupPanel result={ingredientResult} />
        ) : mode === "missing" && missingResult ? (
          <MissingSwapPanel result={missingResult} />
        ) : recipe ? (
          <RecipePanel
            recipe={recipe}
            actions={
              <>
                {savedId ? (
                  <Link href={`/recipes/${savedId}`} className={btnPrimary}>
                    Saved ✓ View in cookbook
                  </Link>
                ) : (
                  <button type="button" onClick={saveRecipe} disabled={saving} className={btnPrimary}>
                    {saving ? "Saving…" : "♥ Save to cookbook"}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-clay bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-ink/30 hover:bg-sand"
                >
                  🖨 Print
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const next = style === "authentic" ? "one-stop" : "authentic";
                    setStyle(next);
                    run({ style: next });
                  }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-clay bg-white px-5 py-2.5 text-sm font-semibold text-ink transition hover:border-ink/30 hover:bg-sand"
                >
                  {style === "authentic" ? "🛒 Try one-stop shop" : "🧭 Try authentic first"}
                </button>
              </>
            }
          />
        ) : error ? (
          <div className={`${card} p-6 sm:p-8`}>
            <p className="text-4xl">🧑‍🍳</p>
            <h2 className="mt-3 font-display text-3xl font-semibold">{error}</h2>
            {suggestions.length > 0 ? (
              <>
                <p className="mt-2 text-muted">Here are the closest dishes in our kitchen right now:</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {suggestions.map((item) => (
                    <DishCard key={item.id} dish={item} compact onClick={() => chooseDish(item.name)} />
                  ))}
                </div>
                <div className="mt-8 rounded-2xl bg-saffron-soft/60 p-5">
                  <p className="font-semibold">Have the recipe written down?</p>
                  <p className="mt-1 text-sm text-muted">
                    Paste its ingredient list and we&apos;ll culturize every line against the stores near you.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setMode("paste");
                      setError(null);
                      setSuggestions([]);
                    }}
                    className={`${btnPrimary} mt-4`}
                  >
                    📜 Paste my family recipe
                  </button>
                </div>
              </>
            ) : (
              <p className="mt-2 text-muted">Adjust the form and try again.</p>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className={`${card} relative overflow-hidden p-6 sm:p-8`}>
              <div className="bg-dots absolute inset-0 opacity-50" />
              <div className="relative">
                <p className="text-4xl">{mode === "ingredient" ? "🥬" : mode === "missing" ? "🔁" : "🍳"}</p>
                <h2 className="mt-3 font-display text-3xl font-semibold">
                  {mode === "ingredient"
                    ? "Look up an ingredient from anywhere"
                    : mode === "missing"
                      ? "Tell us what you don't have"
                      : "Search any dish in the world"}
                </h2>
                <p className="mt-2 max-w-2xl text-muted">
                  {mode === "ingredient"
                    ? "The ingredient library is a starting point, not a limit. We also search a broad food encyclopedia and show source links and real reference photos."
                    : mode === "missing"
                      ? "Name the meal, the ingredient you're missing and your ZIP. We'll check flavor-matched swaps and nearby stores."
                      : "Type a dish name, cuisine, or paste a recipe link. We search the kitchen library, worldwide recipe databases, cookbooks and the open web."}
                </p>
                {mode === "dish" && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setMode("ingredient")}
                      className="rounded-full border border-clay bg-white px-4 py-2 text-sm font-semibold hover:border-paprika hover:text-paprika"
                    >
                      🥬 Look up an ingredient
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("missing")}
                      className="rounded-full border border-clay bg-white px-4 py-2 text-sm font-semibold hover:border-paprika hover:text-paprika"
                    >
                      🔁 I&apos;m missing an ingredient
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("paste")}
                      className="rounded-full border border-clay bg-white px-4 py-2 text-sm font-semibold hover:border-paprika hover:text-paprika"
                    >
                      📜 Paste a family recipe
                    </button>
                  </div>
                )}
              </div>
            </div>

            {mode === "dish" && suggestions.length > 0 && (
              <div className={`${card} p-5`}>
                <p className="font-semibold">Closest recipe matches</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {suggestions.map((item) => (
                    <DishCard key={item.id} dish={item} compact onClick={() => chooseDish(item.name)} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

export { RemoteImage };