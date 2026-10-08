import { NextResponse } from "next/server";
import { storesNear } from "@/lib/stores";

function serialise(store) {
  const { patterns, ...rest } = store;
  return rest;
}

export async function GET(request) {
  const params = request.nextUrl.searchParams;
  const zip = params.get("zip");
  const lat = params.get("lat");
  const lon = params.get("lon");
  const coords =
    lat && lon && Number.isFinite(Number(lat)) && Number.isFinite(Number(lon))
      ? { lat: Number(lat), lon: Number(lon) }
      : null;

  const result = storesNear(zip, coords);
  return NextResponse.json({ ...result, stores: result.stores.map(serialise) });
}