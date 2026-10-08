import Link from "next/link";
import Logo from "./Logo";

const columnClass = "hover:text-saffron";

export default function SiteFooter() {
  return (
    <footer className="no-print mt-24 bg-cast text-cream/75">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Logo />
            <span className="font-display text-[1.55rem] font-semibold tracking-tight text-cream">
              Cultur<span className="text-paprika">ize</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">
            Culturize helps cooks far from home recreate the dishes they grew up with — using smart
            swaps from the grocery stores down the street.
          </p>
          <p className="mt-6 font-display text-lg italic text-saffron">
            “Home is a flavor. We help you find it.”
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-cream">Cook</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/kitchen" className={columnClass}>
                Culturize a dish
              </Link>
            </li>
            <li>
              <Link href="/kitchen?mode=paste" className={columnClass}>
                Translate a family recipe
              </Link>
            </li>
            <li>
              <Link href="/substitutes" className={columnClass}>
                Swap Library
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-cream">Explore</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <Link href="/recipes" className={columnClass}>
                Saved cookbook
              </Link>
            </li>
            <li>
              <Link href="/kitchen?mode=ingredient" className={columnClass}>
                Look up an ingredient
              </Link>
            </li>
            <li>
              <Link href="/kitchen?mode=missing" className={columnClass}>
                Find a substitute
              </Link>
            </li>
            <li>
              <Link href="/#how-it-works" className={columnClass}>
                How it works
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-cream">
            Good to know
          </h3>
          <p className="mt-4 text-sm leading-relaxed">
            Store locations © OpenStreetMap contributors. Recipes come from our library, TheMealDB, the
            Wikibooks Cookbook (CC BY-SA) and the sites we link to. Prices are estimates; availability
            varies by location.
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-5 py-5 text-xs sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Culturize. Made for every kitchen far from home.</p>
          <p className="text-cream/50">Cook boldly. Swap wisely. Share generously.</p>
        </div>
      </div>
    </footer>
  );
}