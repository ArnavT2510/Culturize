"use client";

import { card } from "@/lib/ui";
import { StoreChip } from "./Panels";

export { StoreChip };

export default function RecipePanel({ recipe, actions }) {
  const swaps = recipe.swaps ?? [];

  return (
    <article className={`${card} animate-rise overflow-hidden`}>
      <div className="bg-ink px-5 py-5 text-cream sm:px-7">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-saffron">
          Culturized · {recipe.flavorMatch}% flavor match
        </p>
        <h2 className="mt-1 font-display text-3xl font-semibold">{recipe.title}</h2>
        {recipe.cuisine && <p className="mt-1 text-sm text-cream/70">{recipe.cuisine} kitchen</p>}
      </div>

      <div className="space-y-5 p-5 sm:p-7">
        {swaps.length > 0 ? (
          <div className="rounded-3xl border border-saffron/60 bg-saffron-soft/55 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-paprika">
                  Smart swaps
                </p>
                <h3 className="mt-1 font-display text-2xl font-semibold">
                  {swaps.length} ingredient{swaps.length === 1 ? "" : "s"} rebuilt
                </h3>
              </div>
              <span className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold ring-1 ring-clay">
                {recipe.flavorMatch}% flavor match
              </span>
            </div>
            <ul className="mt-4 space-y-3">
              {swaps.map((swap) => (
                <li
                  key={swap.original}
                  className="rounded-2xl border border-clay/70 bg-white p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <p className="font-semibold">{swap.original}</p>
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold ring-1 ring-clay">
                      {swap.match}% flavor match
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    <span className="font-semibold text-ink">Use:</span> {swap.use}
                  </p>
                  {swap.aisle && (
                    <p className="mt-2 text-xs font-semibold text-herb">
                      📍 {swap.aisle}
                      {swap.price != null ? ` · ~$${Number(swap.price).toFixed(2)}` : ""}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="rounded-3xl border border-herb/30 bg-herb-soft/50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-herb">
              Good news — no swaps needed
            </p>
            <h3 className="mt-1 font-display text-2xl font-semibold">Cook it exactly as written</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Every ingredient in this recipe is available in a normal American grocery store.
            </p>
          </div>
        )}

        <div>
          <h3 className="font-display text-xl font-semibold">Ingredients</h3>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {(recipe.ingredients ?? []).map((item) => {
              const swap = swaps.find(
                (entry) => item.name.toLowerCase().startsWith(entry.original.toLowerCase()),
              );
              return (
                <li
                  key={item.name + item.amount}
                  className="flex items-center gap-3 rounded-2xl border border-clay/70 bg-sand/45 px-4 py-3 text-sm"
                >
                  <span className="font-semibold">{item.amount}</span>
                  <span className={swap ? "line-through decoration-paprika/50" : ""}>{item.name}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {(recipe.steps ?? []).length > 0 && (
          <div>
            <h3 className="font-display text-xl font-semibold">Method</h3>
            <ol className="mt-3 space-y-2.5">
              {recipe.steps.map((step, index) => (
                <li key={step} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-saffron-soft text-xs font-semibold text-[#8a5a12]">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        {actions && <div className="flex flex-wrap gap-3 pt-2">{actions}</div>}
      </div>
    </article>
  );
}