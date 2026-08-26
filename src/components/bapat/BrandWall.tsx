import { brands } from "@/data/site";

export function BrandWall() {
  const row = [...brands, ...brands];
  return (
    <section className="overflow-hidden border-y border-paper/10 bg-obsidian py-14">
      <p className="eyebrow mb-10 px-6 text-center text-[9px] tracking-[0.24em] text-steel md:px-10">
        Authorized Luxury Brand Partners · Available At Pune Stores
      </p>
      <div className="relative">
        <div className="marquee-track flex w-max items-center gap-16 md:gap-24">
          {row.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="display whitespace-nowrap text-4xl text-paper/35 transition-colors hover:text-gold md:text-6xl"
            >
              {b}
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-obsidian to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-obsidian to-transparent" />
      </div>
    </section>
  );
}
