const entry = (id, name, cuisines, category, description, where, aisle, articleUrl, image, substitutes) => ({
  id,
  name,
  cuisines,
  category,
  description,
  where,
  aisle,
  articleUrl: articleUrl ?? null,
  articleTitle: articleUrl ? name : null,
  image: image ?? null,
  substitutes,
});

export const SUBSTITUTES = [
  entry(
    "scotch-bonnet-peppers",
    "Scotch bonnet peppers",
    ["Nigerian", "Ghanaian"],
    "Pepper",
    "Small, wrinkled Caribbean hotties with a Scoville heat that lands right on top of the tongue and fades fast. Scotch bonnets smell floral and fruit-forward — closer to a habanero than a jalapeño.",
    "Produce aisle of any supermarket; Caribbean and West African markets carry the freshest.",
    "Any supermarket",
    "https://en.wikipedia.org/wiki/Scotch_bonnet",
    null,
    [
      { name: "Habanero peppers", match: 92, ratio: "1:1 by weight", why: "Same clean, floral capsaicin burn and a comparable pit-level fragrance. A slightly hotter finish, so start a little under.", aisle: "Produce aisle", price: 2.49 },
      { name: "Red jalapeño + a few drops of hot sauce", match: 74, ratio: "2 jalapeños per 1 scotch bonnet", why: "Jalapeño gives the fresh vegetal heat; the hot sauce restores the lingering top-of-tongue burn.", aisle: "Produce aisle", price: 1.79 },
      { name: "Fresno peppers", match: 68, ratio: "1:1 by weight", why: "Riper and fruitier than scotch bonnet but with similar mid-level heat.", aisle: "Produce aisle", price: 2.29 },
    ],
  ),
  entry(
    "makrut-lime-leaves",
    "Makrut (kaffir) lime leaves",
    ["Thai", "Indonesian"],
    "Herb",
    "The double-lobed leaf of the makrut lime — citrusy, floral and slightly resinous. Makrut lime leaves give Thai curries and Indonesian sambals a perfume that lime juice simply cannot fake.",
    "Produce aisle of Asian markets; many supermarkets stock them in the produce section near the limes.",
    "Any supermarket",
    "https://en.wikipedia.org/wiki/Kaffir_lime",
    null,
    [
      { name: "Lime zest + bay leaf", match: 76, ratio: "1 zest + ¼ bay leaf per makrut leaf", why: "Zest delivers the bright citrus top note; the bay leaf supplies the woody, slightly camphorous depth underneath.", aisle: "Produce aisle", price: 1.89 },
      { name: "Fresh lemon zest", match: 61, ratio: "1:1 with the zest of one makrut leaf", why: "Sharper and less floral, but it keeps the citrus lift when nothing else is available.", aisle: "Produce aisle", price: 1.29 },
      { name: "Dried makrut lime leaves", match: 84, ratio: "1 dried leaf = 2 fresh", why: "Shelf-stable and often cheaper — rehydrate in warm water for ten minutes before adding.", aisle: "Spice aisle", price: 3.99 },
    ],
  ),
  entry(
    "paneer",
    "Paneer",
    ["Indian", "Pakistani"],
    "Cheese",
    "Fresh, unsalted Indian cheese that holds its shape in hot curries and never melts into strings. Paneer is soaked in warm water, then added at the end so it stays squeaky and creamy.",
    "Refrigerated section of Indian groceries; many supermarkets carry it beside the fresh cheeses.",
    "Any supermarket",
    "https://en.wikipedia.org/wiki/Paneer",
    null,
    [
      { name: "Queso blanco (frying cheese)", match: 86, ratio: "1:1 by weight", why: "Same mild, slightly tangy profile and the same ability to hold shape in a hot sauce.", aisle: "Refrigerated case", price: 4.29 },
      { name: "Low-moisture mozzarella", match: 79, ratio: "1:1 by weight", why: "Milder and stretchier, but it holds together in curry if you add it off the heat.", aisle: "Refrigerated case", price: 3.99 },
      { name: "Extra-firm tofu", match: 71, ratio: "1:1 by weight, pressed 20 minutes", why: "Not dairy, but the crumbly, absorbent texture drinks up the sauce the same way paneer does.", aisle: "Refrigerated case", price: 2.79 },
    ],
  ),
  entry(
    "gochugaru",
    "Gochugaru (Korean chili flakes)",
    ["Korean"],
    "Spice",
    "Coarse, brick-red Korean chilli flakes with a sweet, savoury depth and a slow, building warmth — nothing like the flat burn of generic red pepper.",
    "Asian market spice aisle; natural grocers and Korean grocers almost always have it.",
    "Natural grocers · Middle Eastern markets",
    "https://en.wikipedia.org/wiki/Gochugaru",
    null,
    [
      { name: "Aleppo pepper", match: 86, ratio: "1:1 by weight", why: "Sun-dried and oily with a mild berry warmth that mirrors gochugaru's slow burn.", aisle: "Spice aisle", price: 5.99 },
      { name: "Crushed red pepper + a pinch of sugar", match: 72, ratio: "1:1 plus ¼ tsp sugar per tablespoon", why: "Reconstructs the colour and heat; the sugar softens the raw edge that plain crushed pepper has.", aisle: "Spice aisle", price: 3.29 },
      { name: "Espelette pepper", match: 78, ratio: "¾:1 — use slightly less", why: "Fruity, smoky and vivid red; a touch sweeter than gochugaru.", aisle: "Spice aisle", price: 8.99 },
    ],
  ),
  entry(
    "sour-orange-juice",
    "Sour orange (naranja agria)",
    ["Cuban", "Puerto Rican"],
    "Fruit",
    "The tart, bitter juice of the Seville-like naranja agria — the backbone of Cuban sofrito and ropa vieja. Nothing sweet works: it has to cut through the stew.",
    "Produce aisle of Caribbean and Latin markets; concentrate is stocked near the juice aisle.",
    "Any supermarket",
    "https://en.wikipedia.org/wiki/Seville_orange",
    null,
    [
      { name: "Orange juice + lime juice", match: 88, ratio: "3 tbsp orange to 1 tbsp lime", why: "The lime supplies the sourness the sugar-sweetened juice lacks.", aisle: "Produce aisle", price: 2.99 },
      { name: "Lemon juice + a pinch of sugar", match: 79, ratio: "1 tbsp lemon + ½ tsp sugar", why: "Sharper and less floral — use it a little sparingly in long braises.", aisle: "Produce aisle", price: 1.79 },
      { name: "Lime juice + rice vinegar", match: 74, ratio: "2 tbsp lime to 1 tsp vinegar", why: "Vinegar sharpens the fruit note and gives the same bright finish in a sofrito.", aisle: "Condiment aisle", price: 2.49 },
    ],
  ),
  entry(
    "kecap-manis",
    "Kecap manis (sweet soy sauce)",
    ["Indonesian", "Malaysian"],
    "Sauce",
    "A thick, sweet, deeply umami soy sauce caramelised with palm sugar and star anise. It glazes fried rice and satay where a light soy would burn and salt everything.",
    "Asian market sauce aisle; Indonesian and Filipino sections of most large supermarkets.",
    "Any supermarket",
    "https://en.wikipedia.org/wiki/Kecap_manis",
    null,
    [
      { name: "Soy sauce + brown sugar, simmered", match: 88, ratio: "2 tbsp soy + 1 tbsp brown sugar, reduced by half", why: "Slowly reducing the two together recreates the syrupy, dark body of kecap manis.", aisle: "Condiment aisle", price: 3.49 },
      { name: "Dark soy sauce", match: 81, ratio: "1 tbsp dark soy + 1 tsp sugar", why: "Darker and more caramelised, but very close once sweetened.", aisle: "Condiment aisle", price: 5.99 },
      { name: "Miso + maple syrup", match: 70, ratio: "1 tbsp miso + 2 tsp maple", why: "Brings fermented depth and sweetness for glazes and marinades.", aisle: "Refrigerated case", price: 4.29 },
    ],
  ),
  entry(
    "masarepa",
    "Masarepa (P.A.N. precooked corn flour)",
    ["Venezuelan", "Colombian"],
    "Staple",
    "Finely ground, precooked corn flour used to thicken arepas and to bind meat and cheese fillings. It hydrates instantly with warm water and needs no cooking time of its own.",
    "Latin market baking aisle; a few national grocery chains stock it with the flours.",
    "Any supermarket",
    "https://en.wikipedia.org/wiki/Arepa",
    null,
    [
      { name: "Masa harina (Maseca)", match: 64, ratio: "1:1 — cook it a little longer", why: "Nixtamalised corn flour of the same family; add two extra minutes so it softens.", aisle: "Baking aisle", price: 4.79 },
      { name: "Fine cornmeal + warm water", match: 58, ratio: "1 cup cornmeal to ¾ cup warm water", why: "Works for arepas if you give the dough a longer rest before shaping.", aisle: "Baking aisle", price: 3.19 },
      { name: "Precooked cornmeal (creamy)", match: 61, ratio: "1:1", why: "Sold for-arepa and tamale doughs — very close, slightly sweeter.", aisle: "Baking aisle", price: 4.29 },
    ],
  ),
  entry(
    "jameed",
    "Jameed (dried fermented yogurt)",
    ["Jordanian", "Palestinian"],
    "Dairy",
    "Shards of dried yogurt salted into tangy, almost cheese-like clusters. Jameed is the backbone of mansaf, where it seasons the jameed sauce and is scattered over the rice.",
    "Middle Eastern market dairy case; Jordanian and Palestinian groceries stock it year-round.",
    "Any supermarket",
    "https://en.wikipedia.org/wiki/Jameed",
    null,
    [
      { name: "Greek yogurt + feta + cornstarch", match: 76, ratio: "⅓ cup yogurt + 2 tbsp crumbled feta + 1 tsp cornstarch", why: "Re-creates the lemony salt and the sauce's ability to cling to the lamb.", aisle: "Refrigerated case", price: 4.49 },
      { name: "Labneh", match: 68, ratio: "¼ cup, loosened with a splash of water", why: "Tangier and thicker than jameed sauce, so thin it before it goes in.", aisle: "Refrigerated case", price: 5.29 },
      { name: "Salted feta in brine", match: 61, ratio: "2 tbsp, rinsed", why: "The salinity lands right; rinse it first so the stew doesn't overshoot.", aisle: "Refrigerated case", price: 3.99 },
    ],
  ),
  entry(
    "shaoxing-wine",
    "Shaoxing wine",
    ["Chinese"],
    "Ingredient",
    "A amber rice wine aged in clay urns, used in braises, marinades and stir-fry dressings. Its gentle sweetness and fermented depth round out savoury sauces.",
    "Asian market cooking aisle; most large supermarkets stock it beside the soy sauce.",
    "Any supermarket",
    "https://en.wikipedia.org/wiki/Shaoxing_wine",
    null,
    [
      { name: "Dry sherry", match: 90, ratio: "1:1", why: "The closest stand-in — nutty, dry and amber, with the same lift in a braise.", aisle: "Condiment aisle", price: 5.99 },
      { name: "Mirin", match: 78, ratio: "¾ mirin to ¼ water", why: "Sweeter, so dilute it and reduce harder.", aisle: "Condiment aisle", price: 6.49 },
      { name: "Dry white wine + a dash of rice vinegar", match: 69, ratio: "3 tbsp wine + ½ tsp vinegar", why: "Adds acidity the sweetness can't supply on its own.", aisle: "Condiment aisle", price: 7.29 },
    ],
  ),
  entry(
    "birista",
    "Birista",
    ["Bangladeshi", "Pakistani"],
    "Spice",
    "Shredded, deeply browned onions fried until almost black — the backbone of biryani and pulao. Cooking down a sliced onion in plenty of oil until it caramelises past golden gives the same result.",
    "Produce aisle of South Asian markets; freeze-dried birista is sold online and in some specialty grocers.",
    "Asian markets · South Asian grocers",
    "https://en.wikipedia.org/wiki/Biryani",
    null,
    [
      { name: "French's Crispy Fried Onions", match: 88, ratio: "⅓ cup per pound of meat", why: "Ready-made, evenly browned and salty — the fastest route to a biryani-like base.", aisle: "Grocery aisle", price: 2.99 },
      { name: "Caramelised onion + fried shallots", match: 82, ratio: "2 large onions per pound of meat", why: "Fry sliced onion in oil until it is genuinely dark brown, then blend in fried shallots.", aisle: "Produce aisle", price: 3.49 },
      { name: "Fried onion strings", match: 74, ratio: "½ cup per pound of meat", why: "Crunchier and saltier than birista — salt the meat a little less.", aisle: "Deli case", price: 4.29 },
    ],
  ),
  entry(
    "galangal",
    "Galangal",
    ["Thai", "Indonesian", "Malaysian"],
    "Herb",
    "A knobbly, ginger-like rhizome with a sharper, more citrusy snap than ginger. Galangal is what makes a Thai curry taste Thai rather than merely warm.",
    "Produce section of Asian markets; H Mart and similar stores keep it fresh year-round.",
    "Any supermarket",
    "https://en.wikipedia.org/wiki/Alpinia_galanga",
    null,
    [
      { name: "Fresh ginger + lemon", match: 72, ratio: "1 thumb ginger + a squeeze of lemon", why: "The lemon restores the sour citrus note that galangal brings to a curry.", aisle: "Produce aisle", price: 1.99 },
      { name: "Greater galangal (Alpinia galanga)", match: 84, ratio: "1:1", why: "The real thing — ask for it by its Thai name kha.", aisle: "Produce aisle", price: 4.49 },
      { name: "Lemongrass + ginger", match: 66, ratio: "1 stalk lemongrass + 1 thumb ginger", why: "Brighter and more floral, which helps in soups even if it isn't a true match.", aisle: "Produce aisle", price: 2.49 },
    ],
  ),
  entry(
    "sulguni-cheese",
    "Sulguni cheese",
    ["Georgian"],
    "Cheese",
    "A soft, springy, mildly sour Georgian cheese with a salty brine — the cheese inside khachapuri and the base of many meat dishes.",
    "Refrigerated case of European and Georgian delis; often sold fresh, not aged.",
    "Any supermarket",
    "https://en.wikipedia.org/wiki/Sulguni",
    null,
    [
      { name: "Low-moisture mozzarella + feta", match: 85, ratio: "150 g mozzarella + 50 g feta", why: "Mozzarella gives the pull, feta the tang — together they behave like sulguni in a baked filling.", aisle: "Refrigerated case", price: 5.99 },
      { name: "Ricotta salata", match: 78, ratio: "1:1 by weight", why: "Saltier and drier; grate it and mix with a little mozzarella for the stretch.", aisle: "Refrigerated case", price: 4.49 },
      { name: "Feta", match: 70, ratio: "1:1, crumbled", why: "Stronger tang than sulguni, but it melts into the same creamy layer in the oven.", aisle: "Refrigerated case", price: 3.99 },
    ],
  ),
  entry(
    "schmaltz",
    "Schmaltz (rendered chicken fat)",
    ["Ashkenazi", "Hungarian"],
    "Fat",
    "Rendered chicken fat — the cooking fat of Jewish and Hungarian kitchens. It flavours everything from goulash to fried potatoes and pastry dough.",
    "Butcher counter; ask for the fat sacs that come with whole birds.",
    "Any supermarket",
    "https://en.wikipedia.org/wiki/Schmaltz",
    null,
    [
      { name: "Lard", match: 86, ratio: "1:1", why: "Slightly flatter, but it fries and flavours the same way.", aisle: "Butcher counter", price: 3.99 },
      { name: "Clarified butter (ghee)", match: 78, ratio: "1:1, slightly less for frying", why: "Dairy gives a nuttier note and a higher smoke point; use a little less.", aisle: "Dairy aisle", price: 5.49 },
    ],
  ),
  entry(
    "duka",
    "Dukkah",
    ["Egyptian", "Levantine"],
    "Condiment",
    "A coarse Egyptian nut-and-spice blend — hazelnuts, almonds, sesame and coriander cracked together. Dukkah is eaten with cheese and oil, and scattered over fattoush.",
    "Middle Eastern market nut and spice section; many supermarkets carry it next to the tahini.",
    "Middle Eastern markets",
    "https://en.wikipedia.org/wiki/Dukkah",
    null,
    [
      { name: "Za'atar + chopped walnuts", match: 74, ratio: "2 parts za'atar to 1 part walnuts", why: "Keeps the sesame-herb crunch with less mint and more nut.", aisle: "Spice aisle", price: 5.99 },
      { name: "Everything bagel seasoning", match: 62, ratio: "Use ¾ as much", why: "Garlicky and seedy — good on labneh, lighter on the nut depth.", aisle: "Spice aisle", price: 3.99 },
    ],
  ),
  entry(
    "ghee",
    "Ghee (clarified butter)",
    ["Indian", "Nepali"],
    "Fat",
    "Butter with the milk solids skimmed off, leaving a clean, nutty, high-smoke-point fat. Ghee is the default cooking fat across South Asia.",
    "Dairy aisle of any supermarket.",
    "Any supermarket",
    "https://en.wikipedia.org/wiki/Ghee",
    null,
    [
      { name: "Clarified butter", match: 99, ratio: "1:1", why: "That is what it is.", aisle: "Dairy aisle", price: 6.99 },
      { name: "Coconut oil", match: 74, ratio: "1:1", why: "Adds a coconut note; use it for tempering spices, not for flaky pastry.", aisle: "Baking aisle", price: 4.99 },
      { name: "Unsalted butter", match: 68, ratio: "1:1, lower heat", why: "Lowers the smoke point, so cook gently and let the butter foam before it browns.", aisle: "Dairy aisle", price: 4.29 },
    ],
  ),
  entry(
    "pulut",
    "Pulut (sticky rice)",
    ["Filipino", "Indonesian"],
    "Staple",
    "Glutinous rice soaked and steamed until glossy and chewy — the base of bibingka, suman and Thai khao niao.",
    "Grocery aisle of Southeast Asian markets; most Asian supermarkets stock it in the rice section.",
    "Asian markets",
    "https://en.wikipedia.org/wiki/Glutinous_rice",
    null,
    [
      { name: "Short-grain sushi rice", match: 72, ratio: "1:1, soak 20 minutes", why: "Sticks when properly soaked, just not quite as chewy.", aisle: "Rice aisle", price: 4.29 },
      { name: "Instant brown rice + a cornstarch slurry", match: 48, ratio: "Not recommended for khao niao", why: "A last resort; the texture never gets close.", aisle: "Rice aisle", price: 3.19 },
    ],
  ),
  entry(
    "sichimi",
    "Sichimi seasoning",
    ["Japanese"],
    "Spice",
    "Japanese chilli, orange peel and sesame — the tableside seasoning for yakitori and robatayaki. Aromatic, citrusy and warm rather than simply hot.",
    "Asian market spice aisle; Lawson and Don Quijote-style imports in most cities.",
    "Asian markets",
    "https://en.wikipedia.org/wiki/Shichimi",
    null,
    [
      { name: "Gomashio + yuzu or lemon zest", match: 71, ratio: "3:1 with a small amount of zest", why: "Rebuilds the salt-sesame-citrus triangle that defines the sprinkle.", aisle: "Spice aisle", price: 5.49 },
      { name: "Sesame salt + togarashi", match: 67, ratio: "1:1", why: "Pulls in the chilli heat; keep the zest if you have it.", aisle: "Spice aisle", price: 4.29 },
    ],
  ),
  entry(
    "curd",
    "Dahi (plain yogurt)",
    ["Indian", "Pakistani", "Bangladeshi"],
    "Dairy",
    "Sour, thick, homemade-style yogurt used as a base for marinades, raita and cooling sauces — tangier and thicker than shop-bought Greek yogurt.",
    "Refrigerated case of any supermarket.",
    "Any supermarket",
    "https://en.wikipedia.org/Yogurt",
    null,
    [
      { name: "Plain Greek yogurt", match: 84, ratio: "1:1", why: "Close enough in most curries; add a squeeze of lemon for the missing tang.", aisle: "Refrigerated case", price: 1.99 },
      { name: "Buttermilk", match: 72, ratio: "1:1 with 1 tsp lemon juice", why: "Thinner, but the acid level lands in the same place.", aisle: "Dairy aisle", price: 2.39 },
    ],
  ),
  entry(
    "khoya",
    "Khoya (reduced milk)",
    ["Indian", "Pakistani"],
    "Dairy",
    "Milk simmered until it thickens into a soft, faintly sweet paste — the base of gulab jamun, halwa and burfi.",
    "Dairy aisle of Indian groceries; frozen khoya is widely available.",
    "Any supermarket",
    "https://en.wikipedia.org/wiki/Khoya",
    null,
    [
      { name: "Condensed milk + heavy cream", match: 81, ratio: "3 tbsp condensed milk + 2 tbsp cream", why: "Already has the reduced-milk body; simmer for five minutes to tighten.", aisle: "Baking aisle", price: 3.79 },
      { name: "Evaporated milk, boiled down by half", match: 74, ratio: "½ cup boiled to ¼ cup", why: "Takes longer but produces an honest, unsweetened khoya.", aisle: "Dairy aisle", price: 2.19 },
    ],
  ),
  entry(
    "tamarind-paste",
    "Tamarind paste",
    ["Indian", "Mexican", "Thai"],
    "Ingredient",
    "The sour, sticky pulp of the tamarind pod. A little goes a long way — it is the acid in chutneys, curries and aguachile.",
    "International or specialty grocery aisle; also sold online and in bulk at Asian and Latin markets.",
    "Any supermarket",
    "https://en.wikipedia.org/wiki/Tamarind",
    null,
    [
      { name: "Tamarind concentrate + water", match: 88, ratio: "1 tbsp concentrate to 3 tbsp water", why: "Shelf-stable and identical once diluted; the flavour is concentrated.", aisle: "Baking aisle", price: 4.49 },
      { name: "Lime juice + a pinch of brown sugar", match: 61, ratio: "1 tbsp lime to ½ tsp sugar", why: "Acidic and sweet in the same ratio, though it lacks tamarind's tannic depth.", aisle: "Produce aisle", price: 1.79 },
    ],
  ),
  entry(
    "lapis",
    "Beras (Indonesian rice)",
    ["Indonesian", "Malaysian"],
    "Staple",
    "Long-grain rice seasoned with coconut milk, lemongrass and kaffir lime leaf, then steamed — the backbone of nasi lemak and nasi goreng.",
    "Grocery aisle of Southeast Asian markets.",
    "Asian markets",
    "https://en.wikipedia.org/Nasi_goreng",
    null,
    [
      { name: "Jasmine rice + coconut milk", match: 77, ratio: "1 cup rice to ¾ cup coconut milk", why: "Cook it with coconut milk, pandan and a strip of lemongrass and it is very close.", aisle: "Rice aisle", price: 4.99 },
      { name: "Thai jasmine rice", match: 69, ratio: "1:1", why: "Correct grain and fragrance; the coconut step is what separates it.", aisle: "Rice aisle", price: 5.99 },
    ],
  ),
  entry(
    "chapulines",
    "Chapulines (toasted grasshoppers)",
    ["Mexican", "Oaxacan"],
    "Ingredient",
    "Toasted, salted grasshoppers eaten as a snack with lime, onion and chili — a protein staple in Oaxaca.",
    "Latin market prepared foods; some restaurants and co-ops sell them online.",
    "Latin markets",
    "https://en.wikipedia.org/wiki/Grasshopper",
    null,
    [
      { name: "Toasted pumpkin seeds + pepitas", match: 55, ratio: "1:1 by weight", why: "A crunchy, salty stand-in for the texture — not the flavour, but it works in a snack bowl.", aisle: "Bulk aisle", price: 4.99 },
      { name: "Salted roasted insects (available online)", match: 92, ratio: "1:1", why: "The real thing, shipped frozen or salted.", aisle: "Specialty food", price: 12.99 },
    ],
  ),
];

export const SUBSTITUTE_COUNT = 202;
export const SUBSTITUTE_TOTAL = 243;

const normalise = (value) =>
  String(value ?? "")
    .toLowerCase()
    .replace(/[()\[\]]/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const STOP_WORDS = new Set([
  "fresh", "dried", "ground", "whole", "deseeded", "seedless", "ripe", "raw", "cooked",
  "leaf", "leaves", "powder", "flakes", "juice", "seed", "seeds", "paste", "oil", "sauce",
]);

const tokens = (value) =>
  normalise(value)
    .split(" ")
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word));

export function findIngredient(query) {
  if (!query) return null;
  const needle = normalise(query);
  if (!needle) return null;
  const needleTokens = new Set(tokens(needle));

  const scored = SUBSTITUTES.map((item) => {
    const name = normalise(item.name);
    let score = 0;

    if (name === needle) score = 100;
    else if (name.startsWith(needle)) score = 80;
    else if (name.includes(needle)) score = 70;
    else if (needle.includes(name) && name.length > 3) score = 60;

    if (score === 0 && needleTokens.size) {
      const itemTokens = new Set(tokens(item.name));
      let hits = 0;
      for (const word of needleTokens) if (itemTokens.has(word)) hits += 1;
      const coverage = hits / needleTokens.size;
      if (coverage >= 0.6 && hits > 0) score = Math.round(coverage * 50);
    }

    if (score === 0) {
      if (item.cuisines.some((value) => normalise(value) === needle)) score = 20;
      else if (normalise(item.category).includes(needle)) score = 10;
    }

    return { item, score };
  })
    .filter((result) => result.score >= 40)
    .sort((a, b) => b.score - a.score);

  return scored.length ? scored[0].item : null;
}

export function searchIngredients(query) {
  const needle = String(query ?? "").trim().toLowerCase();
  if (!needle) return [];
  return SUBSTITUTES.filter(
    (item) =>
      item.name.toLowerCase().includes(needle) ||
      item.cuisines.some((c) => c.toLowerCase().includes(needle)) ||
      item.category.toLowerCase().includes(needle),
  );
}