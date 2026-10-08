"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroForm() {
  const router = useRouter();
  const [dish, setDish] = useState("");
  const [zip, setZip] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const params = new URLSearchParams();
        if (dish.trim()) params.set("dish", dish.trim());
        if (/^\d{5}$/.test(zip)) params.set("zip", zip);
        router.push(`/kitchen${params.toString() ? `?${params}` : ""}`);
      }}
      className="mt-8 flex flex-col gap-3 sm:flex-row"
    >
      <input
        value={dish}
        onChange={(event) => setDish(event.target.value)}
        placeholder="🍲 Dish you want to cook"
        aria-label="Dish you want to cook"
        className="w-full rounded-2xl border border-clay bg-white px-4 py-3 text-[15px] text-ink placeholder:text-muted/60 outline-none transition focus:border-paprika focus:ring-4 focus:ring-paprika/10 sm:max-w-sm"
      />
      <input
        value={zip}
        onChange={(event) => setZip(event.target.value)}
        placeholder="📍 ZIP code"
        aria-label="ZIP code"
        inputMode="numeric"
        maxLength={5}
        className="w-full rounded-2xl border border-clay bg-white px-4 py-3 text-[15px] text-ink placeholder:text-muted/60 outline-none transition focus:border-paprika focus:ring-4 focus:ring-paprika/10 sm:max-w-[10rem]"
      />
      <button
        type="submit"
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-paprika px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgba(196,70,42,0.7)] transition hover:bg-paprika-dark"
      >
        Culturize it →
      </button>
    </form>
  );
}