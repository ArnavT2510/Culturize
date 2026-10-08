import Link from "next/link";
import { listRecipes } from "@/lib/recipes";
import { card, btnPrimary } from "@/lib/ui";

export const metadata = {
  title: "Cookbook · Culturize",
  description: "The community cookbook — recipes already translated into your local grocery aisles.",
};

export default function RecipesPage() {
  const recipes = listRecipes();

  return (
    <main>
      <section className="no-print border-b border-clay/60 bg-sand/50">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paprika">
            Fresh from the community
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            The community cookbook
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            Every dish here has already been translated into the aisles of a real American grocery
            store. Open one to see the swaps, the flavor match and where to shop.
          </p>
          <Link href="/kitchen" className={`${btnPrimary} mt-6`}>
            Culturize your own dish →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        {recipes.length === 0 ? (
          <div className={`${card} p-8 text-center`}>
            <p className="text-4xl">🍲</p>
            <h2 className="mt-3 font-display text-3xl font-semibold">Nothing saved yet</h2>
            <p className="mt-2 text-muted">
              Culturize a dish and hit “Save to cookbook” to start your collection.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <Link
                key={recipe.id}
                href={`/recipes/${recipe.id}`}
                className={`${card} group p-5 transition hover:-translate-y-1 hover:border-paprika hover:shadow-[0_24px_50px_-28px_rgba(33,26,21,0.55)]`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-paprika">
                  {recipe.flag} {recipe.cuisine}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold group-hover:text-paprika">
                  {recipe.title}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {recipe.cuisine} · {recipe.location}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                  <span className="rounded-full bg-herb-soft px-2.5 py-1 text-herb">
                    {recipe.flavorMatch}% flavor match
                  </span>
                  <span className="rounded-full bg-sand px-2.5 py-1 text-muted">
                    {recipe.swapCount} swap{recipe.swapCount === 1 ? "" : "s"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}