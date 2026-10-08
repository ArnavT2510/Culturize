import { NextResponse } from "next/server";
import { getRecipe } from "@/lib/recipes";

export async function GET(_request, context) {
  const { id } = await context.params;
  const recipe = getRecipe(id);
  if (!recipe) return NextResponse.json({ ok: false, error: "Recipe not found" }, { status: 404 });
  return NextResponse.json({ ok: true, recipe });
}