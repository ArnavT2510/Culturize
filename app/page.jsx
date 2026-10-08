import Link from "next/link";
import HeroForm from "@/components/HeroForm";
import { SUBSTITUTES, SUBSTITUTE_COUNT, SUBSTITUTE_TOTAL } from "@/lib/substitutes";
import { TRENDING_DISHES } from "@/lib/dishes";
import { listRecipes } from "@/lib/recipes";
import { card, btnPrimary, btnSecondary } from "@/lib/ui";

export const metadata = {
  title: "Culturize — Cook the taste of home with ingredients near you",
  description:
    "Culturize scans the grocery stores near you and rebuilds your recipe with the closest-tasting swaps — aisle, price and flavor match included.",
};

const MARQUEE_SWAPS = [
  ["scotch bonnet peppers", "Habanero peppers", 92],
  ["makrut lime leaves", "Lime zest + bay leaf", 76],
  ["paneer", "Queso blanco (frying cheese)", 86],
  ["gochugaru", "Aleppo pepper", 86],
  ["sour orange juice", "Orange juice + lime juice", 88],
  ["kecap manis", "Soy sauce + brown sugar, simmered", 88],
  ["masarepa", "Masa harina (Maseca)", 64],
  ["jameed", "Greek yogurt + feta + cornstarch", 76],
  ["Shaoxing wine", "Dry sherry", 90],
  ["birista", "French's Crispy Fried Onions", 88],
  ["galangal", "Fresh ginger + lemon", 72],
  ["sulguni cheese", "Low-moisture mozzarella + feta", 85],
];

const STEPS = [
  {
    icon: "🍲",
    title: "Tell us the dish",
    body: "Pick from our kitchen library — jollof, phở, mole, mansaf and more — or paste your family's handwritten recipe.",
  },
  {
    icon: "🛒",
    title: "We scan stores near you",
    body: "From your ZIP we map nearby supermarkets and international markets, and what each one typically stocks.",
  },
  {
    icon: "✨",
    title: "Cook with smart swaps",
    body: "Get the recipe rewritten around flavor-matched substitutes, with a store-by-store list, aisles and prices.",
  },
];

const PERSONAS = [
  {
    icon: "🎒",
    title: "The homesick student",
    body: "First semester away and craving your mom's egusi? We'll get you most of the way there with the Walmart by campus.",
  },
  {
    icon: "🍼",
    title: "The new parent",
    body: "Pass your culture down one meal at a time — without a two-hour drive to the nearest international market.",
  },
  {
    icon: "📜",
    title: "The second-gen cook",
    body: "Translate Grandma's handwritten recipe into a shopping list for the store you actually go to.",
  },
];

export default function HomePage() {
  const featured = SUBSTITUTES.slice(0, 8);
  const recipes = listRecipes().slice(0, 3);
  const marquee = [...MARQUEE_SWAPS, ...MARQUEE_SWAPS];

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-clay/60 bg-sand/45">
        <div className="bg-dots absolute inset-0 opacity-60" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paprika">
              The grocery translator for home cooks
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.6rem,6vw,4.6rem)] font-semibold leading-[1.02] tracking-tight">
              Cook the taste of home — from the store down the street.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Can&apos;t find scotch bonnets, gochugaru or makrut lime leaves? Culturize scans the
              grocery stores near you and rebuilds your recipe with the closest-tasting swaps — aisle,
              price and flavor match included. Search any dish, or paste a link to any recipe online.
            </p>

            <HeroForm />

            <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
              <Link href="/kitchen" className="text-paprika hover:underline">
                🍲 Search any dish
              </Link>
              <Link href="/kitchen?mode=ingredient" className="text-herb hover:underline">
                🥬 Look up an ingredient
              </Link>
              <Link href="/kitchen?mode=missing" className="text-plum hover:underline">
                🔁 Find a missing-ingredient swap
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="animate-float overflow-hidden rounded-[2.25rem] border-4 border-white shadow-[0_40px_80px_-40px_rgba(33,26,21,0.6)]">
              <img
                src="/images/hero.jpg"
                alt="A family table filled with home-cooked dishes from around the world"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-3 w-64 rounded-3xl border border-clay/70 bg-white/95 p-4 shadow-[0_24px_50px_-28px_rgba(33,26,21,0.55)] backdrop-blur sm:-left-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                Example swap · 92% estimated
              </p>
              <p className="mt-3 flex items-center gap-2 text-sm font-semibold">
                <span className="line-through decoration-paprika/60">Scotch bonnet peppers</span>
              </p>
              <p className="mt-1 text-sm text-muted">→ Habanero peppers</p>
              <p className="mt-3 text-xs font-semibold text-herb">
                🛒 Produce aisle · store matched after ZIP search
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Swap marquee */}
      <section className="no-print overflow-hidden border-b border-clay/60 bg-ink py-6">
        <div className="flex w-max animate-marquee gap-8">
          {marquee.map(([from, to, match], index) => (
            <div key={`${from}-${index}`} className="flex shrink-0 items-center gap-2 text-sm text-cream/75">
              <span className="text-cream">{from}</span>
              <span className="text-saffron">→</span>
              <span className="text-cream">{to}</span>
              <span className="font-semibold text-saffron">{match}%</span>
            </div>
          ))}
        </div>
      </section>

      {/* Market image */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="overflow-hidden rounded-[2.25rem] border-4 border-white shadow-[0_40px_80px_-40px_rgba(33,26,21,0.6)]">
            <img
              src="/images/market.jpg"
              alt="A shopper choosing peppers in an American supermarket"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className={`${card} relative overflow-hidden p-6 sm:p-8`}>
            <div className="bg-dots absolute inset-0 opacity-50" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-paprika">
                One authentic find, two smart swaps
              </p>
              <h3 className="mt-2 font-display text-3xl font-semibold">Gochugaru</h3>
              <p className="mt-2 text-muted">
                Korean chili flakes rarely sit in a mainstream aisle — we point you at the specialty
                market that carries them, and give you Aleppo pepper when even that is out of reach.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
                <span className="rounded-full bg-herb-soft px-3 py-1 text-herb">✓ Authentic find</span>
                <span className="rounded-full bg-saffron-soft px-3 py-1 text-[#8a5a12]">86% swap</span>
              </div>
              <p className="mt-6 text-sm font-semibold text-muted">
                Example estimate: 94% flavor match · 3 swaps · approx. $38
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-24 border-y border-clay/60 bg-sand/45">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paprika">
            How it works
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Your home kitchen, translated for American aisles.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Most diaspora cooks know the feeling: the recipe is in your heart, but half the ingredients
            are an ocean away. Culturize closes that gap with a flavor knowledge base built from how
            families actually cook abroad.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <div key={step.title} className={`${card} p-6`}>
                <p className="text-4xl">{step.icon}</p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-paprika">
                  Step 0{index + 1}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/kitchen" className={btnPrimary}>
              Open the kitchen →
            </Link>
          </div>
        </div>
      </section>

      {/* Swap library */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paprika">
          The Swap Library
        </p>
        <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {SUBSTITUTE_COUNT} hard-to-find ingredients, decoded.
        </h2>
        <Link href="/substitutes" className="mt-6 inline-block text-sm font-semibold text-paprika hover:underline">
          Browse all swaps →
        </Link>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((item) => (
            <Link
              key={item.id}
              href={`/substitutes?q=${encodeURIComponent(item.name)}`}
              className={`${card} group p-5 transition hover:-translate-y-1 hover:border-paprika hover:shadow-[0_24px_50px_-28px_rgba(33,26,21,0.55)]`}
            >
              <p className="text-xs text-muted">{item.cuisines.join(" · ")}</p>
              <p className="mt-2 font-semibold group-hover:text-paprika">{item.name}</p>
              <p className="mt-1 text-sm text-muted">→ {item.substitutes[0].name}</p>
              <p className="mt-3 font-display text-2xl font-semibold text-paprika">
                {item.substitutes[0].match}%
              </p>
              <p className="mt-3 text-xs text-muted">📍 {item.aisle}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-clay/60 bg-cast text-cream/75">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron">
            A world of home cooking
          </p>
          <h2 className="mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight text-cream sm:text-5xl">
            No fixed menu. Bring the dish you&apos;re actually craving.
          </h2>
          <p className="mt-4 max-w-2xl text-lg">
            Search a dish name, ingredient, regional spelling or paste a recipe link. Culturize checks
            its recipe library, global cookbooks and the open web — then matches hard-to-find
            ingredients to stores near you.
          </p>
          <div className="mt-8 flex flex-wrap gap-6 text-sm font-semibold">
            <Link href="/kitchen" className="text-saffron hover:underline">
              Find a dish →
            </Link>
            <Link href="/kitchen?mode=ingredient" className="text-saffron hover:underline">
              Look up an ingredient
            </Link>
          </div>

          <dl className="mt-14 grid gap-8 sm:grid-cols-3">
            <div>
              <dt className="font-display text-6xl font-semibold text-saffron">{SUBSTITUTE_COUNT}</dt>
              <dd className="mt-2 text-sm">curated ingredients — plus open-ended food search</dd>
            </div>
            <div>
              <dt className="font-display text-6xl font-semibold text-saffron">{SUBSTITUTE_TOTAL}</dt>
              <dd className="mt-2 text-sm">flavor-matched substitutes</dd>
            </div>
            <div>
              <dt className="font-display text-6xl font-semibold text-saffron">ANY</dt>
              <dd className="mt-2 text-sm">
                dish search across recipe libraries, cookbooks &amp; the web
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Recently culturized */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paprika">
          Fresh from the community
        </p>
        <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Recently culturized
        </h2>
        <Link href="/recipes" className="mt-6 inline-block text-sm font-semibold text-paprika hover:underline">
          Open the cookbook →
        </Link>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {recipes.map((recipe) => (
            <Link
              key={recipe.id}
              href={`/recipes/${recipe.id}`}
              className={`${card} group p-5 transition hover:-translate-y-1 hover:border-paprika`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-paprika">
                {recipe.flag} {recipe.cuisine}
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold group-hover:text-paprika">
                {recipe.title}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {recipe.cuisine} · {recipe.location}
              </p>
              <p className="mt-4 text-sm font-semibold text-herb">
                {recipe.flavorMatch}% flavor match · {recipe.swapCount} swap
                {recipe.swapCount === 1 ? "" : "s"}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-3 overflow-hidden rounded-2xl border border-clay/70 bg-sand/45 px-5 py-3 text-sm">
          <span className="shrink-0 font-semibold">🔥 Trending in the kitchen:</span>
          <span className="flex w-max gap-6 whitespace-nowrap text-paprika">
            {[...TRENDING_DISHES, ...TRENDING_DISHES].map((dish, index) => (
              <Link
                key={`${dish}-${index}`}
                href={`/kitchen?dish=${encodeURIComponent(dish)}`}
                className="shrink-0 hover:underline"
              >
                {dish}
              </Link>
            ))}
          </span>
        </div>
      </section>

      {/* Made for */}
      <section className="border-t border-clay/60 bg-sand/45">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paprika">Made for</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Everyone cooking far from home
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {PERSONAS.map((persona) => (
              <div key={persona.title} className={`${card} p-6`}>
                <p className="text-4xl">{persona.icon}</p>
                <h3 className="mt-4 font-display text-2xl font-semibold">{persona.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{persona.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grandmother CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="overflow-hidden rounded-[2.25rem] border-4 border-white shadow-[0_40px_80px_-40px_rgba(33,26,21,0.6)]">
            <img
              src="/images/swap.jpg"
              alt="Grandmother's handwritten recipe next to a fresh grocery list"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Your grandmother&apos;s recipe. Your neighborhood store.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Paste the recipe exactly as your family writes it. We&apos;ll find every ingredient — or
              its closest match — within a few miles of you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/kitchen" className={btnPrimary}>
                Culturize a dish →
              </Link>
              <Link href="/kitchen?mode=paste" className={btnSecondary}>
                Translate a family recipe
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}