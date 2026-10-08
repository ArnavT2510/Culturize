import Link from "next/link";
import { SUBSTITUTES, SUBSTITUTE_COUNT, SUBSTITUTE_TOTAL } from "@/lib/substitutes";
import { card, input } from "@/lib/ui";

export const metadata = {
  title: "Swap Library · Culturize",
  description:
    "Browse the Culturize flavor knowledge base — hard-to-find ingredients decoded with flavor-matched substitutes, ratios and aisles.",
};

export default async function SubstitutesPage({ searchParams }) {
  const params = (await searchParams) ?? {};
  const query = typeof params.q === "string" ? params.q : "";
  const needle = query.trim().toLowerCase();

  const results = needle
    ? SUBSTITUTES.filter(
        (item) =>
          item.name.toLowerCase().includes(needle) ||
          item.cuisines.some((value) => value.toLowerCase().includes(needle)) ||
          item.category.toLowerCase().includes(needle),
      )
    : SUBSTITUTES;

  return (
    <main>
      <section className="no-print border-b border-clay/60 bg-sand/50">
        <div className="mx-auto max-w-7xl px-5 py-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paprika">
            The Swap Library
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {SUBSTITUTE_COUNT} hard-to-find ingredients, decoded.
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            Every entry carries a flavor match, a ratio, the aisle it lives in and an honest reason it
            works. {SUBSTITUTE_TOTAL} flavor-matched substitutes and counting.
          </p>

          <form className="mt-6 max-w-xl" action="/substitutes">
            <label htmlFor="swap-search" className="sr-only">
              Search the swap library
            </label>
            <input
              id="swap-search"
              name="q"
              defaultValue={query}
              placeholder="Search an ingredient, cuisine or category…"
              className={input}
              autoComplete="off"
            />
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        {results.length === 0 ? (
          <div className={`${card} p-8 text-center`}>
            <p className="text-4xl">🔎</p>
            <h2 className="mt-3 font-display text-3xl font-semibold">
              We don&apos;t have that one in the library yet
            </h2>
            <p className="mt-2 text-muted">
              Tell us what you&apos;re missing and we&apos;ll suggest the closest match we know.
            </p>
            <Link
              href="/kitchen?mode=missing"
              className="mt-6 inline-flex rounded-full bg-paprika px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-paprika-dark"
            >
              Find a substitute →
            </Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-muted">
              Showing {results.length} of {SUBSTITUTE_COUNT} ingredients
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((item) => (
                <article key={item.id} className={`${card} p-5`}>
                  <p className="text-xs text-muted">{item.cuisines.join(" · ")}</p>
                  <h2 className="mt-2 font-display text-2xl font-semibold">{item.name}</h2>
                  <p className="mt-1 text-xs text-muted">{item.category}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-2">
                    {item.description}
                  </p>

                  <ul className="mt-4 space-y-2">
                    {item.substitutes.slice(0, 2).map((substitute) => (
                      <li
                        key={substitute.name}
                        className="rounded-2xl border border-clay/70 bg-sand/45 p-3"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <p className="text-sm font-semibold">{substitute.name}</p>
                          <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold ring-1 ring-clay">
                            {substitute.match}%
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-muted">
                          <span className="font-semibold text-ink">How much:</span> {substitute.ratio}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-4 text-xs font-semibold text-herb">📍 {item.aisle}</p>
                  <Link
                    href={`/kitchen?mode=ingredient&ingredient=${encodeURIComponent(item.name)}`}
                    className="mt-4 inline-flex text-sm font-semibold text-paprika hover:underline"
                  >
                    Look it up in the kitchen →
                  </Link>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}