# Culturize

**The grocery translator for home cooks.**

Culturize scans the grocery stores near you and rebuilds your recipe with the
closest-tasting swaps — aisle, price and flavor match included.

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19**
- **Tailwind CSS v4** (`@theme` design tokens, no config file)
- **Fraunces + DM Sans** self-hosted via `@fontsource-variable`

## Routes

| Route | What it does |
| --- | --- |
| `/` | Landing page — hero, how it works, swap library, stats, personas |
| `/kitchen` | The kitchen: dish search, ingredient lookup, missing-ingredient rescue, family-recipe paste |
| `/substitutes` | Searchable Swap Library of hard-to-find ingredients |
| `/recipes` | Community cookbook of saved, culturized recipes |
| `/recipes/[id]` | A single cookbook entry |

### API

| Endpoint | Purpose |
| --- | --- |
| `GET /api/stores?zip=&lat=&lon=` | Nearby grocery stores + international markets |
| `GET /api/substitute?q=` | Ingredient encyclopedia lookup |
| `POST /api/substitute` | Dish-specific substitute for a missing ingredient |
| `POST /api/culturize` | Build a recipe rewritten around flavor-matched swaps |
| `GET /api/dishes/suggest?q=` | Typeahead for the kitchen search box |
| `GET/POST /api/recipes` | List / save cookbook recipes |

## Design tokens

Defined in `app/globals.css` under `@theme`:

```
cream #fbf6ee   sand #f3eadc   clay #e7d5bf   ink #211a15   muted #6e6158
cast  #1c1714   paprika #c4462a  paprika-dark #a3361e
saffron #efa23a   saffron-soft #fcebcf   herb #2f6a4d   herb-soft #ddefe3   plum #6a2c55
```

Shared component classes live in `lib/ui.js` (`card`, `label`, `input`,
`btnPrimary`, `btnSecondary`) so every surface matches.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```