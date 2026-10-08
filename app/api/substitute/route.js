import { NextResponse } from "next/server";
import { findIngredient } from "@/lib/substitutes";
import { storesNear, STORE_INDEX } from "@/lib/stores";

function pickStore(result, zip, coords) {
  const nearby = storesNear(zip, coords);
  const wanted = result.aisle;
  const specialty = nearby.stores.find((store) => {
    const meta = STORE_INDEX[store.id];
    if (!meta) return false;
    if (wanted === "Any supermarket") return true;
    if (/natural/i.test(wanted)) return meta.tags.includes("natural");
    if (/middle eastern/i.test(wanted)) return meta.kind === "middle_eastern_market";
    if (/south asian|asian/i.test(wanted)) return meta.kind === "asian_market" || meta.kind === "indian_market";
    if (/latin|caribbean/i.test(wanted)) return meta.kind === "latin_market";
    return true;
  });
  return specialty ?? nearby.stores[0] ?? null;
}

export async function GET(request) {
  const query = request.nextUrl.searchParams.get("q") ?? "";
  const ingredient = findIngredient(query);
  if (!ingredient) {
    return NextResponse.json({ ok: false, error: "We couldn't find that ingredient yet." });
  }
  return NextResponse.json({ ok: true, ingredient });
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Couldn't read that request." });
  }

  const name = String(payload?.ingredient ?? "").trim();
  const dish = String(payload?.dish ?? "").trim();
  if (!name) {
    return NextResponse.json({ ok: false, error: "Tell us which ingredient you don't have." });
  }

  const knowledge = findIngredient(name);
  if (!knowledge) {
    return NextResponse.json(
      { ok: false, error: "We don't have a tested substitute for that spelling yet." },
      { status: 404 },
    );
  }

  const store = pickStore(knowledge, payload?.zip, payload?.lat ? { lat: payload.lat, lon: payload.lon } : null);

  return NextResponse.json({
    ok: true,
    dish: dish || knowledge.name,
    location: { label: store?.name ? `near you` : "your area" },
    ingredient: {
      original: knowledge.name,
      status: "swap",
      use: knowledge.substitutes[0].name,
      match: knowledge.substitutes[0].match,
      ratio: knowledge.substitutes[0].ratio,
      why: knowledge.substitutes[0].why,
      store,
      buy: knowledge.substitutes[0],
      alternatives: knowledge.substitutes.slice(1).map((option) => ({
        name: option.name,
        match: option.match,
        storeName: store?.name ?? null,
      })),
      knowledge,
    },
  });
}