import { NextResponse } from "next/server";
import { buildRecipe } from "@/lib/recipes";
import { DISHES } from "@/lib/dishes";

function nearestDishes(query) {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  const scored = DISHES.map((dish) => {
    const name = dish.name.toLowerCase();
    let score = 0;
    if (name === needle) score = 100;
    else if (name.startsWith(needle)) score = 70;
    else if (name.includes(needle)) score = 50;
    else if (needle.includes(name)) score = 40;
    else {
      const words = needle.split(/\s+/).filter((word) => word.length > 2);
      score = words.filter((word) => name.includes(word)).length * 8;
    }
    return { dish, score };
  })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, 4).map((entry) => entry.dish);
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Couldn't read that request." }, { status: 400 });
  }

  const dish = String(payload?.dish ?? "").trim();
  if (!dish) {
    return NextResponse.json(
      { ok: false, error: "We couldn't find that dish yet.", suggestions: [] },
      { status: 404 },
    );
  }

  const recipe = buildRecipe(payload);
  return NextResponse.json({ ok: true, recipe });
}

export async function GET(request) {
  const query = request.nextUrl.searchParams.get("dish") ?? "";
  return NextResponse.json({ suggestions: nearestDishes(query) });
}