import { NextResponse } from "next/server";
import { DISHES } from "@/lib/dishes";
import { searchIngredients } from "@/lib/substitutes";

export async function GET(request) {
  const query = (request.nextUrl.searchParams.get("q") ?? "").trim();
  if (query.length < 2) return NextResponse.json({ suggestions: [] });

  const needle = query.toLowerCase();

  const dishes = DISHES.filter(
    (dish) =>
      dish.name.toLowerCase().includes(needle) ||
      dish.cuisine.toLowerCase().includes(needle),
  )
    .slice(0, 6)
    .map((dish) => ({ kind: "dish", name: dish.name, cuisine: dish.cuisine, source: dish.id }));

  const ingredients = searchIngredients(query)
    .slice(0, 4)
    .map((item) => ({ kind: "ingredient", name: item.name, cuisine: item.cuisines[0], source: item.id }));

  return NextResponse.json({ suggestions: [...dishes, ...ingredients] });
}