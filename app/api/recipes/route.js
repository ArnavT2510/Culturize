import { NextResponse } from "next/server";
import { addRecipe, listRecipes } from "@/lib/recipes";

export async function GET() {
  return NextResponse.json({ ok: true, recipes: listRecipes() });
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Couldn't read that request." }, { status: 400 });
  }
  const created = addRecipe(payload?.recipe);
  if (created.error) return NextResponse.json({ ok: false, error: created.error }, { status: 400 });
  return NextResponse.json({ ok: true, id: created.id, recipe: created });
}