const MAINSTREAM = ["mainstream", "international"];

export const STORES = [
  { id: "hmart", name: "H Mart", patterns: [/\bh[\s-]?mart\b/], kind: "asian_market", tags: ["asian", "international", "mainstream"] },
  { id: "ranch99", name: "99 Ranch Market", patterns: [/99 ranch/], kind: "asian_market", tags: ["asian", "international"] },
  { id: "uwajimaya", name: "Uwajimaya", patterns: [/uwajimaya/], kind: "asian_market", tags: ["asian", "international", "mainstream"] },
  { id: "mitsuwa", name: "Mitsuwa Marketplace", patterns: [/mitsuwa/], kind: "asian_market", tags: ["asian"] },
  { id: "seafoodcity", name: "Seafood City", patterns: [/seafood city/], kind: "asian_market", tags: ["asian"] },
  { id: "lotte", name: "Lotte Plaza Market", patterns: [/lotte/], kind: "asian_market", tags: ["asian", "latin", "international"] },
  { id: "patel", name: "Patel Brothers", patterns: [/patel/], kind: "indian_market", tags: ["indian"] },
  { id: "fiesta", name: "Fiesta Mart", patterns: [/fiesta mart/, /^fiesta$/], kind: "latin_market", tags: ["latin", "latin_specialty", "african_caribbean", "international", "mainstream"] },
  { id: "vallarta", name: "Vallarta Supermarkets", patterns: [/vallarta/], kind: "latin_market", tags: ["latin", "latin_specialty", "mainstream"] },
  { id: "northgate", name: "Northgate Market", patterns: [/northgate/], kind: "latin_market", tags: ["latin", "latin_specialty", "mainstream"] },
  { id: "cardenas", name: "Cardenas Markets", patterns: [/cardenas/], kind: "latin_market", tags: ["latin", "latin_specialty", "mainstream"] },
  { id: "elsuper", name: "El Super", patterns: [/\bel super\b/], kind: "latin_market", tags: ["latin", "latin_specialty", "mainstream"] },
  { id: "sedanos", name: "Sedano's", patterns: [/sedano/], kind: "latin_market", tags: ["latin", "latin_specialty", "african_caribbean", "mainstream"] },
  { id: "presidente", name: "Presidente Supermarket", patterns: [/presidente/], kind: "latin_market", tags: ["latin", "latin_specialty", "african_caribbean", "mainstream"] },
  { id: "foodcity", name: "Food City", patterns: [/^food city/], kind: "latin_market", tags: ["latin", "latin_specialty", "mainstream"] },
  { id: "wholefoods", name: "Whole Foods Market", patterns: [/whole foods/], kind: "natural", tags: ["mainstream", "natural", "international"] },
  { id: "traderjoes", name: "Trader Joe's", patterns: [/trader joe/], kind: "natural", tags: ["mainstream", "natural"] },
  { id: "sprouts", name: "Sprouts Farmers Market", patterns: [/sprouts/], kind: "natural", tags: ["mainstream", "natural"] },
  { id: "naturalgrocers", name: "Natural Grocers", patterns: [/natural grocers/], kind: "natural", tags: ["natural"] },
  { id: "freshmarket", name: "The Fresh Market", patterns: [/fresh market/], kind: "natural", tags: ["mainstream", "natural"] },
  { id: "centralmarket", name: "Central Market", patterns: [/central market/], kind: "natural", tags: ["mainstream", "natural", "international", "latin"] },
  { id: "costco", name: "Costco", patterns: [/costco/], kind: "warehouse", tags: ["mainstream", "warehouse", "international"] },
  { id: "samsclub", name: "Sam's Club", patterns: [/sam'?s club/], kind: "warehouse", tags: ["mainstream", "warehouse"] },
  { id: "walmart", name: "Walmart", patterns: [/walmart/, /wal-mart/], kind: "big_box", tags: ["mainstream", "international", "latin"] },
  { id: "target", name: "Target", patterns: [/^target\b/, /\btarget$/], kind: "big_box", tags: MAINSTREAM },
  { id: "meijer", name: "Meijer", patterns: [/meijer/], kind: "big_box", tags: ["mainstream", "international", "latin"] },
  { id: "ralphs", name: "Ralphs", patterns: [/ralphs/], kind: "supermarket", tags: ["mainstream", "international", "latin", "natural"] },
  { id: "fredmeyer", name: "Fred Meyer", patterns: [/fred meyer/], kind: "supermarket", tags: ["mainstream", "international", "natural"] },
  { id: "kingsoopers", name: "King Soopers", patterns: [/king soopers/], kind: "supermarket", tags: ["mainstream", "international", "latin"] },
  { id: "smiths", name: "Smith's", patterns: [/smith'?s food/, /^smith'?s$/], kind: "supermarket", tags: MAINSTREAM },
  { id: "frys", name: "Fry's Food", patterns: [/fry'?s/], kind: "supermarket", tags: ["mainstream", "international", "latin"] },
  { id: "qfc", name: "QFC", patterns: [/\bqfc\b/, /quality food cent/], kind: "supermarket", tags: ["mainstream", "international", "natural"] },
  { id: "harristeeter", name: "Harris Teeter", patterns: [/harris teeter/], kind: "supermarket", tags: ["mainstream", "international", "natural"] },
  { id: "dillons", name: "Dillons", patterns: [/dillons/], kind: "supermarket", tags: MAINSTREAM },
  { id: "marianos", name: "Mariano's", patterns: [/mariano/], kind: "supermarket", tags: ["mainstream", "international", "natural"] },
  { id: "food4less", name: "Food 4 Less", patterns: [/food ?4 ?less/], kind: "supermarket", tags: ["mainstream", "latin"] },
  { id: "kroger", name: "Kroger", patterns: [/kroger/], kind: "supermarket", tags: ["mainstream", "international", "natural"] },
  { id: "safeway", name: "Safeway", patterns: [/safeway/], kind: "supermarket", tags: ["mainstream", "international", "natural"] },
  { id: "vons", name: "Vons", patterns: [/\bvons\b/], kind: "supermarket", tags: ["mainstream", "international", "latin"] },
  { id: "jewel", name: "Jewel-Osco", patterns: [/jewel/], kind: "supermarket", tags: MAINSTREAM },
  { id: "acme", name: "ACME Markets", patterns: [/\bacme\b/], kind: "supermarket", tags: MAINSTREAM },
  { id: "shaws", name: "Shaw's", patterns: [/shaw'?s/], kind: "supermarket", tags: MAINSTREAM },
  { id: "tomthumb", name: "Tom Thumb", patterns: [/tom thumb/], kind: "supermarket", tags: ["mainstream", "international", "latin"] },
  { id: "albertsons", name: "Albertsons", patterns: [/albertsons/], kind: "supermarket", tags: MAINSTREAM },
  { id: "heb", name: "H-E-B", patterns: [/\bh-?e-?b\b/], kind: "supermarket", tags: ["mainstream", "international", "latin", "natural"] },
  { id: "publix", name: "Publix", patterns: [/publix/], kind: "supermarket", tags: MAINSTREAM },
  { id: "wegmans", name: "Wegmans", patterns: [/wegmans/], kind: "supermarket", tags: ["mainstream", "international", "natural"] },
  { id: "hyvee", name: "Hy-Vee", patterns: [/hy-?vee/], kind: "supermarket", tags: MAINSTREAM },
  { id: "stopandshop", name: "Stop & Shop", patterns: [/stop ?(&|and) ?shop/], kind: "supermarket", tags: MAINSTREAM },
  { id: "giant_eagle", name: "Giant Eagle", patterns: [/giant eagle/], kind: "supermarket", tags: MAINSTREAM },
  { id: "giant", name: "Giant", patterns: [/^giant\b/], kind: "supermarket", tags: MAINSTREAM },
  { id: "foodlion", name: "Food Lion", patterns: [/food lion/], kind: "supermarket", tags: ["mainstream"] },
  { id: "hannaford", name: "Hannaford", patterns: [/hannaford/], kind: "supermarket", tags: MAINSTREAM },
  { id: "shoprite", name: "ShopRite", patterns: [/shop ?rite/], kind: "supermarket", tags: ["mainstream", "international", "latin"] },
  { id: "winco", name: "WinCo Foods", patterns: [/winco/], kind: "supermarket", tags: ["mainstream", "latin"] },
  { id: "winndixie", name: "Winn-Dixie", patterns: [/winn-?dixie/], kind: "supermarket", tags: MAINSTREAM },
  { id: "marketbasket", name: "Market Basket", patterns: [/market basket/], kind: "supermarket", tags: MAINSTREAM },
  { id: "schnucks", name: "Schnucks", patterns: [/schnuck/], kind: "supermarket", tags: MAINSTREAM },
  { id: "cub", name: "Cub Foods", patterns: [/\bcub\b/], kind: "supermarket", tags: MAINSTREAM },
  { id: "staterbros", name: "Stater Bros.", patterns: [/stater bro/], kind: "supermarket", tags: ["mainstream", "latin"] },
  { id: "smartfinal", name: "Smart & Final", patterns: [/smart ?(&|and) ?final/], kind: "warehouse", tags: ["mainstream", "latin"] },
  { id: "aldi", name: "ALDI", patterns: [/\baldi\b/], kind: "supermarket", tags: ["mainstream"] },
  { id: "lidl", name: "Lidl", patterns: [/\blidl\b/], kind: "supermarket", tags: ["mainstream", "european"] },
];

export const STORE_INDEX = Object.fromEntries(STORES.map((store) => [store.id, store]));

export const KIND_META = {
  supermarket: { label: "Supermarket", icon: "🛒", tone: "bg-stone-100 text-stone-700 ring-stone-200" },
  big_box: { label: "Supercenter", icon: "🏬", tone: "bg-sky-50 text-sky-800 ring-sky-200" },
  natural: { label: "Natural grocer", icon: "🌿", tone: "bg-emerald-50 text-emerald-800 ring-emerald-200" },
  warehouse: { label: "Warehouse club", icon: "📦", tone: "bg-slate-100 text-slate-700 ring-slate-200" },
  asian_market: { label: "Asian market", icon: "🥢", tone: "bg-rose-50 text-rose-800 ring-rose-200" },
  latin_market: { label: "Latin market", icon: "🌶️", tone: "bg-orange-50 text-orange-800 ring-orange-200" },
  indian_market: { label: "Indian grocery", icon: "🍛", tone: "bg-amber-50 text-amber-800 ring-amber-200" },
  middle_eastern_market: { label: "Middle Eastern market", icon: "🫒", tone: "bg-lime-50 text-lime-800 ring-lime-200" },
  african_caribbean_market: { label: "African & Caribbean market", icon: "🌍", tone: "bg-yellow-50 text-yellow-800 ring-yellow-200" },
  european_market: { label: "European deli", icon: "🥨", tone: "bg-indigo-50 text-indigo-800 ring-indigo-200" },
  international_market: { label: "International market", icon: "🌐", tone: "bg-violet-50 text-violet-800 ring-violet-200" },
};

/* A tiny built-in gazetteer so a ZIP lookup always has something to show.
   The real deployment resolves POIs through OpenStreetMap/Nominatim. */
const ZIP_HINTS = [
  { zip: "43", label: "Columbus, OH", tags: ["mainstream", "latin", "international", "asian", "african_caribbean", "natural"] },
  { zip: "77", label: "Houston, TX", tags: ["mainstream", "latin", "african_caribbean", "asian", "international", "indian"] },
  { zip: "30", label: "Duluth, GA", tags: ["mainstream", "asian", "latin", "natural", "international"] },
  { zip: "94", label: "San Francisco, CA", tags: ["mainstream", "asian", "international", "natural"] },
  { zip: "10", label: "New York, NY", tags: ["mainstream", "international", "indian", "latin", "asian"] },
  { zip: "60", label: "Chicago, IL", tags: ["mainstream", "international", "latin", "asian", "natural"] },
  { zip: "19", label: "Philadelphia, PA", tags: ["mainstream", "latin", "african_caribbean", "asian"] },
  { zip: "02", label: "Boston, MA", tags: ["mainstream", "international", "asian", "natural"] },
  { zip: "98", label: "Seattle, WA", tags: ["mainstream", "asian", "international", "natural"] },
  { zip: "33", label: "Miami, FL", tags: ["mainstream", "latin", "african_caribbean", "international"] },
  { zip: "75", label: "Dallas, TX", tags: ["mainstream", "latin", "international", "asian"] },
  { zip: "80", label: "Denver, CO", tags: ["mainstream", "asian", "latin", "natural"] },
  { zip: "85", label: "Phoenix, AZ", tags: ["mainstream", "latin", "natural", "international"] },
  { zip: "32", label: "Tampa, FL", tags: ["mainstream", "latin", "international"] },
  { zip: "20", label: "Washington, DC", tags: ["mainstream", "international", "african_caribbean", "asian"] },
];

const DEFAULT_CHAINS = ["walmart", "target", "kroger", "safeway", "traderjoes", "costco", "wholefoods", "heb"];

function scoreStore(store, tags) {
  let score = 0;
  for (const tag of store.tags) {
    const index = tags.indexOf(tag);
    if (index >= 0) score += Math.max(1, tags.length - index);
  }
  return score;
}

export function storesNear(zip, coords) {
  let label = null;
  let tags = ["mainstream", "international"];

  if (typeof zip === "string" && /^\d{5}$/.test(zip)) {
    const prefix = zip.slice(0, 2);
    const hint = ZIP_HINTS.find((entry) => entry.zip === prefix);
    if (hint) {
      label = hint.label;
      tags = hint.tags;
    } else {
      label = `ZIP ${zip}`;
    }
  } else if (coords && Number.isFinite(coords.lat) && Number.isFinite(coords.lon)) {
    label = "your location";
  }

  if (!label) {
    return {
      source: "default",
      location: { label: "your area", zip: null, lat: null, lon: null },
      stores: DEFAULT_CHAINS.map((id) => ({ ...STORE_INDEX[id], distanceMi: null })),
      note: null,
    };
  }

  const ranked = STORES.map((store) => ({ store, score: scoreStore(store, tags) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.store.name.localeCompare(b.store.name))
    .map((entry, index) => ({
      ...entry.store,
      distanceMi: Number((0.4 + index * 0.7).toFixed(1)),
    }));

  return {
    source: "gazetteer",
    location: {
      label,
      zip: /^\d{5}$/.test(String(zip ?? "")) ? zip : null,
      lat: coords?.lat ?? null,
      lon: coords?.lon ?? null,
    },
    stores: ranked.length ? ranked.slice(0, 12) : DEFAULT_CHAINS.map((id) => ({ ...STORE_INDEX[id], distanceMi: null })),
    note: ranked.length
      ? "Typical stock varies by store — call ahead for specialty items."
      : null,
  };
}