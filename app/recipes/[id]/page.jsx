import Link from "next/link";
import { notFound } from "next/navigation";
import { getRecipe } from "@/lib/recipes";
import { card, btnPrimary, btnSecondary } from "@/lib/ui";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const recipe = getRecipe(id);
  if (!recipe) return { title: "Recipe not found · Culturize" };
  return {
    title: `${recipe.title} · Culturize`,
    description: `${recipe.flavorMatch}% flavor match with ${recipe.swapCount} swap${
      recipe.swapCount === 1 ? "" : "s"
    } for ${recipe.cuisine} cooks.`,
  };
}

export default async function RecipePage({ params }) {
  const { id } = await params;
  const recipe = getRecipe(id);
  if (!recipe) notFound();

  return (
    <main>
      <section className="no-print border-b border-clay/60 bg-sand/50">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paprika">
            {recipe.flag} {recipe.cuisine} · {recipe.location}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {recipe.title}
          </h1>
          <p className="mt-3 text-muted">
            {recipe.flavorMatch}% flavor match · {recipe.swapCount} swap
            {recipe.swapCount === 1 ? "" : "s"} · cooked from stores near you
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className={`${card} p-6 sm:p-7`}>
            <h2 className="font-display text-2xl font-semibold">Ingredients</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {recipe.ingredients.map((item) => (
                <li
                  key={item.name + item.amount}
                  className="flex items-center gap-3 rounded-2xl border border-clay/70 bg-sand/45 px-4 py-3 text-sm"
                >
                  <span className="font-semibold">{item.amount}</span>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {recipe.steps.length > 0 && (
            <div className={`${card} p-6 sm:p-7`}>
              <h2 className="font-display text-2xl font-semibold">Method</h2>
              <ol className="mt-4 space-y-3">
                {recipe.steps.map((step, index) => (
                  <li key={step} className="flex gap-3 leading-relaxed text-muted">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-saffron-soft text-xs font-semibold text-[#8a5a12]">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        <aside className="no-print self-start lg:sticky lg:top-24">
          <div className={`${card} p-6`}>
            <h2 className="font-display text-xl font-semibold">Shopping notes</h2>
            <p className="mt-2 text-sm text-muted">
              {recipe.swapCount === 0
                ? "Every ingredient here is available in a normal American grocery store."
                : "This is what changed between the original recipe and your local aisles."}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link href="/kitchen" className={btnPrimary}>
                Cook another dish →
              </Link>
              <Link href="/recipes" className={btnSecondary}>
                ← Back to the cookbook
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}