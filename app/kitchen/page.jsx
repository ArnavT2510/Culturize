import KitchenLoader from "./KitchenLoader";
import { DISHES } from "@/lib/dishes";

export const metadata = {
  title: "Kitchen · Culturize",
  description:
    "Search any dish, look up any cultural ingredient, or find a nearby-store substitute for the ingredient you’re missing.",
};

const MODES = ["dish", "ingredient", "missing", "paste"];

export default async function KitchenPage({ searchParams }) {
  const params = (await searchParams) ?? {};
  const initialDish = typeof params.dish === "string" ? params.dish : "";
  const initialZip = typeof params.zip === "string" ? params.zip : "";
  const initialMode = MODES.includes(params.mode) ? params.mode : "dish";

  return (
    <main>
      <section className="no-print border-b border-clay/60 bg-sand/50">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paprika">
            The Kitchen
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            What are we cooking today?
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            Search any dish, look up a cultural ingredient, import a recipe link, or tell us the one
            ingredient you&apos;re missing. We&apos;ll match it to stores and sensible alternatives near
            you.
          </p>
        </div>
      </section>

      <KitchenLoader
        dishes={DISHES}
        initialDish={initialDish}
        initialZip={initialZip}
        initialMode={initialMode}
        autoRun={false}
        aiEnabled={false}
      />
    </main>
  );
}