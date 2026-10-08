"use client";

export default function DishCard({ dish, compact = false, onClick }) {
  const Wrapper = onClick ? "button" : "div";
  return (
    <Wrapper
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={`group block w-full cursor-pointer overflow-hidden rounded-3xl border border-clay/70 bg-white text-left shadow-[0_1px_0_rgba(33,26,21,0.04),0_18px_40px_-28px_rgba(33,26,21,0.35)] transition hover:-translate-y-1 hover:border-paprika hover:shadow-[0_24px_50px_-28px_rgba(33,26,21,0.55)] ${
        compact ? "" : ""
      }`}
    >
      {dish.image && (
        <div className="aspect-[16/10] overflow-hidden bg-sand">
          <img
            src={dish.image}
            alt={dish.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className={compact ? "p-5" : "p-5 sm:p-6"}>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-paprika">
          {dish.flag} {dish.cuisine}
        </p>
        <h3 className="mt-2 font-display text-2xl font-semibold leading-tight group-hover:text-paprika">
          {dish.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted line-clamp-2">{dish.description}</p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
          <span className="rounded-full bg-sand px-2.5 py-1">{dish.difficulty}</span>
          <span className="rounded-full bg-sand px-2.5 py-1">{dish.totalMinutes} min</span>
          {dish.specialtyCount > 0 && (
            <span className="rounded-full bg-saffron-soft px-2.5 py-1 text-[#8a5a12]">
              {dish.specialtyCount} specialty swap{dish.specialtyCount === 1 ? "" : "s"}
            </span>
          )}
        </div>
      </div>
    </Wrapper>
  );
}