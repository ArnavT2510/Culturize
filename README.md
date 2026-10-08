# Culturize

Culturize is a grocery translator for home cooks far from home. Enter a dish and a U.S. ZIP code or latitude/longitude to see a recipe ingredient map organized around nearby authentic ingredients, flavor-matched swaps, everyday groceries, pantry staples, and specialty items with no tested swap.

## Run locally

```sh
npm install
npm run dev
```

To create a production build:

```sh
npm run build
```

## Preview data

This repository is a frontend preview with curated sample maps for Thai green curry, Filipino chicken adobo, and Mexican pozole rojo. The checked-in store examples cover San Francisco, CA 94103 (including a small nearby coordinate area). Store stock is illustrative typical stock and prices are estimates; this build does not query live inventory, geocoding, or a live store directory. Searches outside the included sample coverage return an explicit no-data state rather than fabricated matches.
