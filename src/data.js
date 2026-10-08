export const SAMPLE_AREA = {
  zip: "94103",
  city: "San Francisco",
  coordinates: { latitude: 37.77, longitude: -122.41 },
};

export const recipes = [
  {
    id: "thai-green-curry",
    title: "Thai green curry",
    cuisine: "Thai",
    aliases: ["green curry", "thai curry", "green curry chicken"],
    intro: "A fragrant coconut curry, mapped to the ingredients that make sense around you.",
    ingredients: [
      {
        id: "green-curry-paste",
        name: "Thai green curry paste",
        authentic: {
          storeId: "rainbow",
          aisle: "International foods",
          price: "est. $5.49 / jar",
          note: "The original curry base is typically stocked nearby.",
        },
      },
      {
        id: "thai-basil",
        name: "Thai basil",
        authentic: {
          storeId: "rainbow",
          aisle: "Fresh herbs",
          price: "est. $2.99 / bunch",
          note: "Use the fragrant leaves to finish the curry.",
        },
        swap: {
          name: "Sweet basil + mint",
          match: 76,
          ratio: "Use 3 parts sweet basil and 1 part mint for every 4 parts Thai basil.",
          why: "Sweet basil keeps the anise-like lift; mint restores some of Thai basil’s cool, peppery edge.",
          storeId: "safeway",
          aisle: "Fresh herbs",
          price: "est. $2.49 / bunch",
        },
      },
      {
        id: "makrut-lime-leaves",
        name: "Makrut lime leaves",
        authentic: {
          storeId: "rainbow",
          aisle: "Fresh herbs",
          price: "est. $3.49 / pack",
          note: "Add the leaves while the curry simmers, then remove before serving.",
        },
        swap: {
          name: "Lime zest + bay leaf",
          match: 81,
          ratio: "Use 1 strip of lime zest and 1 small bay leaf for every 2 makrut lime leaves.",
          why: "Lime brings the bright citrus perfume; bay adds a soft, lingering herbal note.",
          storeId: "safeway",
          aisle: "Produce + dried herbs",
          price: "est. $1.49 for both",
        },
      },
      {
        id: "galangal",
        name: "Galangal",
        authentic: {
          storeId: "rainbow",
          aisle: "Fresh roots",
          price: "est. $3.99 / piece",
          note: "Slice thinly and simmer with the curry base for its piney warmth.",
        },
        swap: {
          name: "Fresh ginger",
          match: 68,
          ratio: "Use 1 teaspoon of fresh ginger for every 1 teaspoon of galangal.",
          why: "Ginger keeps the warm, bright bite, though it is less citrusy and pine-like than galangal.",
          storeId: "safeway",
          aisle: "Produce",
          price: "est. $2.49 / piece",
        },
      },
      {
        id: "coconut-milk",
        name: "Coconut milk",
        base: {
          type: "easy",
          storeId: "safeway",
          aisle: "International foods",
          price: "est. $2.49 / can",
          note: "A regular grocery item for the curry base.",
        },
      },
      {
        id: "jasmine-rice",
        name: "Jasmine rice",
        base: {
          type: "pantry",
          note: "A familiar pantry staple to serve alongside.",
        },
      },
      {
        id: "thai-eggplant",
        name: "Thai eggplant",
        base: {
          type: "specialty",
          note: "No tested swap. Keep the original ingredient if you can find it.",
        },
      },
    ],
    method: [
      "Warm the curry paste in a little oil until fragrant.",
      "Stir in coconut milk, then simmer with your protein and Thai eggplant until tender.",
      "Finish with [[thai-basil]] and [[makrut-lime-leaves]]. Serve over jasmine rice.",
    ],
    stores: ["rainbow", "safeway"],
  },
  {
    id: "filipino-chicken-adobo",
    title: "Filipino chicken adobo",
    cuisine: "Filipino",
    aliases: ["chicken adobo", "filipino adobo", "adobo"],
    intro: "A savory, tangy classic with nearby options for its distinctive vinegar and soy.",
    ingredients: [
      {
        id: "cane-vinegar",
        name: "Cane vinegar",
        authentic: {
          storeId: "rainbow",
          aisle: "Vinegars",
          price: "est. $3.99 / bottle",
          note: "The mellow, slightly sweet vinegar used in many adobo recipes.",
        },
        swap: {
          name: "Rice vinegar + apple cider vinegar",
          match: 74,
          ratio: "Mix 2 parts rice vinegar with 1 part apple cider vinegar for each 3 parts cane vinegar.",
          why: "Rice vinegar keeps the acidity clean; cider vinegar adds the gentle fruitiness of cane.",
          storeId: "safeway",
          aisle: "Vinegars",
          price: "est. $5.98 for both bottles",
        },
      },
      {
        id: "filipino-soy-sauce",
        name: "Filipino soy sauce",
        authentic: {
          storeId: "rainbow",
          aisle: "International foods",
          price: "est. $4.49 / bottle",
          note: "A deeper, savory soy sauce is typically stocked at the specialty grocer.",
        },
        swap: {
          name: "Regular soy sauce",
          match: 86,
          ratio: "Use regular soy sauce 1:1 for Filipino soy sauce.",
          why: "It keeps the salty umami backbone; the finished sauce may be a little less rounded.",
          storeId: "safeway",
          aisle: "International foods",
          price: "est. $3.49 / bottle",
        },
      },
      {
        id: "chicken-thighs",
        name: "Chicken thighs",
        base: {
          type: "easy",
          storeId: "safeway",
          aisle: "Meat",
          price: "est. $4.99 / lb",
          note: "A standard cut at a neighborhood grocery store.",
        },
      },
      {
        id: "bay-leaves",
        name: "Bay leaves",
        base: {
          type: "pantry",
          note: "A common dried herb to check for in your spice cupboard.",
        },
      },
      {
        id: "white-rice",
        name: "White rice",
        base: {
          type: "pantry",
          note: "Use the rice you usually serve with adobo.",
        },
      },
      {
        id: "black-pepper",
        name: "Black peppercorns",
        base: {
          type: "pantry",
          note: "A pantry spice for the simmering sauce.",
        },
      },
    ],
    method: [
      "Brown the chicken thighs in a heavy pot.",
      "Add [[cane-vinegar]], [[filipino-soy-sauce]], garlic, bay leaves, and pepper; simmer until the chicken is tender.",
      "Reduce the sauce until glossy, then serve with white rice.",
    ],
    stores: ["rainbow", "safeway"],
  },
  {
    id: "mexican-pozole-rojo",
    title: "Mexican pozole rojo",
    cuisine: "Mexican",
    aliases: ["pozole rojo", "pozole", "red pozole"],
    intro: "A chile-rich stew, with a clear path from dried chiles to the toppings in your bowl.",
    ingredients: [
      {
        id: "guajillo-chiles",
        name: "Guajillo chiles",
        authentic: {
          storeId: "rainbow",
          aisle: "Dried chiles",
          price: "est. $4.99 / bag",
          note: "Toast and soak the original dried chiles for the pozole base.",
        },
        swap: {
          name: "Ancho chile + cayenne",
          match: 78,
          ratio: "Use 1 ancho chile and a pinch of cayenne for every 2 guajillo chiles.",
          why: "Ancho brings dried-fruit depth; a little cayenne restores guajillo’s gentle warmth.",
          storeId: "rainbow",
          aisle: "Dried chiles",
          price: "est. $4.99 / bag",
        },
      },
      {
        id: "mexican-oregano",
        name: "Mexican oregano",
        authentic: {
          storeId: "rainbow",
          aisle: "Dried herbs",
          price: "est. $3.49 / jar",
          note: "Add the citrusy herb near the end of cooking.",
        },
        swap: {
          name: "Mediterranean oregano",
          match: 79,
          ratio: "Use Mediterranean oregano 1:1 for Mexican oregano.",
          why: "It keeps the familiar herbal finish, though it is a little sweeter and less citrusy.",
          storeId: "safeway",
          aisle: "Dried herbs",
          price: "est. $3.49 / jar",
        },
      },
      {
        id: "hominy",
        name: "Hominy",
        base: {
          type: "easy",
          storeId: "safeway",
          aisle: "Canned vegetables",
          price: "est. $2.49 / can",
          note: "A regular canned-goods aisle find for pozole.",
        },
      },
      {
        id: "pork-shoulder",
        name: "Pork shoulder",
        base: {
          type: "easy",
          storeId: "safeway",
          aisle: "Meat",
          price: "est. $4.99 / lb",
          note: "A familiar cut for a slow-simmered stew.",
        },
      },
      {
        id: "cabbage",
        name: "Cabbage",
        base: {
          type: "easy",
          storeId: "safeway",
          aisle: "Produce",
          price: "est. $2.49 / head",
          note: "Slice finely for a crisp topping.",
        },
      },
      {
        id: "radishes",
        name: "Radishes",
        base: {
          type: "easy",
          storeId: "safeway",
          aisle: "Produce",
          price: "est. $1.99 / bunch",
          note: "Serve thinly sliced over each bowl.",
        },
      },
      {
        id: "tostadas",
        name: "Tostadas",
        base: {
          type: "easy",
          storeId: "safeway",
          aisle: "International foods",
          price: "est. $3.49 / pack",
          note: "Crisp corn tostadas are a regular grocery find in the Latin foods aisle.",
        },
      },
    ],
    method: [
      "Toast and soak the guajillo chiles, then blend them with a little soaking liquid.",
      "Simmer pork shoulder in the chile base with hominy until tender.",
      "Finish with Mexican oregano; serve with cabbage, radishes, and tostadas.",
    ],
    stores: ["rainbow", "safeway"],
  },
];

export const stores = {
  rainbow: {
    id: "rainbow",
    name: "Rainbow Grocery Co-op",
    address: "1745 Folsom St · San Francisco, CA 94103",
    kind: "Specialty & natural groceries",
    mark: "R",
    color: "sage",
  },
  safeway: {
    id: "safeway",
    name: "Safeway",
    address: "2300 16th St · San Francisco, CA 94103",
    kind: "Everyday groceries",
    mark: "S",
    color: "coral",
  },
};

export const statusLabels = {
  authentic_nearby: "Authentic nearby",
  swap: "Flavor-matched swap",
  easy: "Easy to find",
  pantry: "Pantry",
  specialty: "Specialty",
};
