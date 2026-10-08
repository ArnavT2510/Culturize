import { findIngredient } from "./substitutes";

const SEED_RECIPES = [
  {
    id: 6,
    title: "Jollof Rice",
    dishId: "jollof-rice",
    cuisine: "Nigerian",
    flag: "🇳🇬",
    location: "Columbus, OH",
    zip: "43201",
    flavorMatch: 97,
    swapCount: 2,
    ingredients: [
      { name: "Long-grain rice", amount: "3 cups" },
      { name: "Scotch bonnet peppers", amount: "2" },
      { name: "Tomato paste", amount: "⅓ cup" },
      { name: "Smoked paprika", amount: "1 tsp" },
      { name: "Bay leaves", amount: "2" },
    ],
    steps: [
      "Blend the peppers, tomato paste and spices into a smooth paste.",
      "Fry the paste in oil until it darkens and the oil separates.",
      "Add the rice and stock, cover and steam low for 40 minutes.",
      "Rest, fluff and serve.",
    ],
  },
  {
    id: 5,
    title: "Egusi Soup",
    dishId: "egusi-soup",
    cuisine: "Nigerian",
    flag: "🇳🇬",
    location: "Houston, TX",
    zip: "77002",
    flavorMatch: 100,
    swapCount: 0,
    ingredients: [
      { name: "Egusi (melon) seeds", amount: "2 cups" },
      { name: "Spinach", amount: "2 bunches" },
      { name: "Palm oil", amount: "⅓ cup" },
      { name: "Pounded yam", amount: "to serve" },
    ],
    steps: [
      "Blend the egusi seeds into a smooth paste and simmer.",
      "Add greens, seasoning and palm oil.",
      "Simmer 20 minutes and serve with pounded yam.",
    ],
  },
  {
    id: 4,
    title: "Kimchi Jjigae",
    dishId: "kimchi-jjigae",
    cuisine: "Korean",
    flag: "🇰🇷",
    location: "Duluth, GA",
    zip: "30096",
    flavorMatch: 94,
    swapCount: 3,
    ingredients: [
      { name: "Aged kimchi", amount: "2 cups" },
      { name: "Gochugaru", amount: "2 tbsp" },
      { name: "Pork belly", amount: "200 g" },
      { name: "Tofu", amount: "½ block" },
    ],
    steps: [
      "Fry the pork until the fat renders and crisps.",
      "Add kimchi and gochugaru and cook down five minutes.",
      "Add broth and tofu, simmer 15 minutes.",
    ],
  },
];

let STORE = [...SEED_RECIPES];
let nextId = 7;

export function listRecipes() {
  return [...STORE].sort((a, b) => b.id - a.id);
}

export function getRecipe(id) {
  return STORE.find((recipe) => String(recipe.id) === String(id)) ?? null;
}

export function addRecipe(recipe) {
  if (!recipe || !recipe.title) {
    return { error: "That recipe needs a title." };
  }
  const created = {
    id: nextId++,
    title: recipe.title,
    dishId: recipe.dishId ?? null,
    cuisine: recipe.cuisine ?? "",
    flag: recipe.flag ?? "🍲",
    location: recipe.location ?? "Saved locally",
    zip: recipe.zip ?? null,
    flavorMatch: recipe.flavorMatch ?? 90,
    swapCount: (recipe.swaps ?? []).length,
    ingredients: recipe.ingredients ?? [],
    steps: recipe.steps ?? [],
    createdAt: Date.now(),
  };
  STORE = [created, ...STORE];
  return created;
}

export function buildRecipe({ mode, dish, cuisine, servings, ingredientsText, stepsText, swaps }) {
  const lines = String(ingredientsText ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const UNIT_WORDS =
  /^(cups?|tbsp|tablespoons?|tsp|teaspoons?|oz|ounces?|lbs?|pounds?|g|kg|mg|ml|l|cloves?|cans?|packages?|pkg|bunch(?:es)?|handfuls?|slices?|pieces?|sticks?|heads?|sprigs?|pints?|quarts?|gallons?|liters?|litres?|cubes?|pinch(?:es)?|dash(?:es)?|drops?|bags?|boxes|jars?|bottles?|thumbs?|fingers?|scoops?|knobs?|stalks?)$/i;

const NUMBERISH =
  /^(\d+\s*[./-]\s*\d+|\d+\S*|[¼½¾⅓⅔⅛⅜⅝⅞]|to\s+\d+|\d+\s*[\u00d7x]\s*\d+|[\d.]+\s*(in|inch(?:es)?|cm|g|kg|oz|lb|lbs|ml|l))$/i;

function parseLine(line) {
  const tokens = line.split(/\s+/).filter(Boolean);
  let index = 0;
  const parts = [];
  while (index < tokens.length && NUMBERISH.test(tokens[index])) parts.push(tokens[index++]);
  while (
    index < tokens.length &&
    /^[a-z]+$/i.test(tokens[index]) &&
    UNIT_WORDS.test(tokens[index])
  ) {
    parts.push(tokens[index++]);
  }
  const amount = parts.join(" ");
  const name = tokens.slice(index).join(" ").trim();
  return { amount, name: name || line.trim() };
}

  const parsed = lines.map((line) => {
    const { amount, name } = parseLine(line);
    return { amount, name, knowledge: findIngredient(name) };
  });

  const swapCount = parsed.filter((item) => item.knowledge).length;

  return {
    title: dish || "Family recipe",
    dish,
    cuisine: cuisine || "",
    ingredients: parsed.map((item) => ({ name: item.name, amount: item.amount })),
    steps: String(stepsText ?? "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean),
    swaps: parsed
      .filter((item) => item.knowledge)
      .map((item) => ({
        original: item.knowledge.name,
        use: item.knowledge.substitutes[0].name,
        match: item.knowledge.substitutes[0].match,
        aisle: item.knowledge.substitutes[0].aisle,
        price: item.knowledge.substitutes[0].price,
      })),
    flavorMatch: parsed.length
      ? Math.round(
          parsed.reduce((total, item) => total + (item.knowledge ? item.knowledge.substitutes[0].match : 100), 0) /
            parsed.length,
        )
      : 100,
    servings: servings ?? null,
    mode,
  };
}