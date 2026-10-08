"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { btnPrimary } from "@/lib/ui";

const LINKS = [
  { href: "/kitchen", label: "Kitchen" },
  { href: "/substitutes", label: "Swap Library" },
  { href: "/recipes", label: "Cookbook" },
  { href: "/#how-it-works", label: "How it works" },
];

const BASE =
  "rounded-full px-4 py-2 text-sm font-medium transition";

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="no-print sticky top-0 z-40 border-b border-clay/60 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="shrink-0">
          <span className="inline-flex items-center gap-2.5">
            <Logo />
            <span className="font-display text-[1.55rem] font-semibold tracking-tight text-ink">
              Cultur<span className="text-paprika">ize</span>
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => {
            const active =
              link.href === "/#how-it-works" ? false : pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  BASE + (active ? " bg-ink text-cream" : " text-muted hover:bg-sand hover:text-ink")
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/kitchen" className={`${btnPrimary} hidden sm:inline-flex`}>
          Start cooking →
        </Link>
      </div>
    </header>
  );
}