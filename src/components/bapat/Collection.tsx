import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Eye, MessageCircle, Sparkles, Check, ArrowUpRight } from "lucide-react";
import { inr, products, whatsappUrl, type Product } from "@/data/site";
import { usePrefersReducedMotion } from "./hooks";

const filterCategories = ["All", "Eyeglasses", "Sunglasses"] as const;
type FilterTab = (typeof filterCategories)[number];

function ProductVisual({ product, hovered }: { product: Product; hovered: boolean }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-bone/60 p-4 transition-colors group-hover:bg-bone">
      <img
        src={product.image}
        alt={`${product.brand} ${product.name}`}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-contain object-center transition-all duration-700 ease-out ${
          hovered ? "scale-105 opacity-0" : "scale-100 opacity-100"
        }`}
      />
      <img
        src={product.imageAlt ?? product.image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className={`absolute inset-0 h-full w-full object-contain object-center p-4 transition-all duration-700 ease-out ${
          hovered ? "scale-105 opacity-100" : "scale-100 opacity-0"
        }`}
      />
    </div>
  );
}

function ProductCard({
  product,
  onOpen,
}: {
  product: Product;
  onOpen: (p: Product) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const reduced = usePrefersReducedMotion();

  return (
    <motion.article
      initial={reduced ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col justify-between overflow-hidden rounded-xl border border-obsidian/10 bg-paper shadow-sm transition-all duration-500 hover:border-gold/60 hover:shadow-xl hover:shadow-gold/5"
    >
      <div className="relative">
        {/* Category & Status Badges */}
        <div className="absolute left-3.5 top-3.5 z-10 flex flex-wrap gap-1.5">
          <span className="eyebrow rounded bg-obsidian/90 px-2.5 py-1 text-[8px] tracking-wider text-paper backdrop-blur-md">
            {product.brand}
          </span>
          <span className="eyebrow rounded border border-gold/30 bg-gold/10 px-2 py-1 text-[8px] tracking-wider text-gold">
            {product.category}
          </span>
        </div>

        {/* Visual Frame Container */}
        <button
          type="button"
          data-cursor="VIEW"
          onClick={() => onOpen(product)}
          aria-label={`View details for ${product.brand} ${product.name}`}
          className="relative block w-full focus:outline-none"
        >
          <ProductVisual product={product} hovered={hovered} />
          
          {/* Hover Overlay Button */}
          <div
            className={`absolute inset-0 flex items-center justify-center bg-obsidian/30 backdrop-blur-[2px] transition-opacity duration-300 ${
              hovered ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <span className="eyebrow flex items-center gap-1.5 rounded-full bg-paper px-4 py-2 text-[9px] font-semibold text-obsidian shadow-lg transition-transform duration-300 group-hover:scale-105">
              <Eye size={12} className="text-gold" /> Quick View
            </span>
          </div>
        </button>
      </div>

      {/* Frame Details & Info */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="eyebrow text-[9px] text-muted-foreground">{product.brand}</p>
              <h3 className="display mt-1 text-2xl text-obsidian sm:text-[1.65rem]">
                {product.name}
              </h3>
            </div>
            <p className="whitespace-nowrap font-sans text-sm font-semibold text-obsidian">
              {inr(product.price)}
            </p>
          </div>

          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {product.material}
          </p>

          <div className="mt-4 flex items-center gap-1.5 text-[10px] text-emerald-700">
            <Check size={12} className="shrink-0" />
            <span>Available at Kothrud & Sadashiv Peth</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-2 border-t border-obsidian/10 pt-4">
          <button
            type="button"
            onClick={() => onOpen(product)}
            className="eyebrow inline-flex items-center justify-center gap-1.5 rounded border border-obsidian/20 bg-transparent py-2.5 text-[9px] text-obsidian transition-colors hover:border-gold hover:text-gold"
          >
            <Eye size={12} /> Details
          </button>
          <a
            href={whatsappUrl(
              `Hello Bapat Optics, I am interested in trying the ${product.brand} ${product.name} frame.`,
            )}
            target="_blank"
            rel="noreferrer"
            className="eyebrow inline-flex items-center justify-center gap-1.5 rounded bg-obsidian py-2.5 text-[9px] text-paper transition-all hover:bg-gold hover:text-obsidian"
          >
            <MessageCircle size={12} /> Enquire
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function Collection() {
  const [activeTab, setActiveTab] = useState<FilterTab>("All");
  const [active, setActive] = useState<Product | null>(null);

  const filteredProducts =
    activeTab === "All"
      ? products
      : products.filter((p) => p.category === activeTab);

  return (
    <section id="collection" className="bg-bone py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10">
        {/* Section Header with Category Tabs */}
        <div className="mb-10 flex flex-col justify-between gap-6 border-t border-obsidian/15 pt-6 sm:mb-12 sm:pt-8 md:mb-14 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3">
              <span className="inline-block h-px w-8 bg-gold sm:w-10" />
              <p className="eyebrow text-[9px] tracking-[0.18em] text-gold sm:text-[10px] sm:tracking-[0.2em]">
                Curated Designer Edit
              </p>
            </div>
            <h2 className="display mt-1.5 text-[10vw] text-obsidian sm:text-[7vw] md:text-[5vw]">
              Selected Frames
            </h2>
            <p className="mt-2 max-w-lg text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Hand-picked silhouettes from top luxury brands. Every frame is measured and fitted with precision Zeiss optics in our Pune stores.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {filterCategories.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`eyebrow rounded-full px-4 py-2 text-[9px] tracking-wider transition-all sm:px-5 sm:py-2.5 sm:text-[10px] ${
                  activeTab === tab
                    ? "bg-obsidian text-paper shadow-md"
                    : "border border-obsidian/15 bg-paper text-obsidian hover:border-gold hover:text-gold"
                }`}
              >
                {tab === "All" ? "All Frames" : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Uniform Balanced 3-Column Luxury Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={setActive} />
          ))}
        </div>

        {/* In-Store Consultation Callout Strip */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 rounded-xl border border-gold/30 bg-paper p-6 sm:mt-16 sm:flex-row sm:p-8">
          <div className="flex items-center gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold">
              <Sparkles size={18} />
            </div>
            <div>
              <p className="display text-xl text-obsidian sm:text-2xl">Looking for a specific designer frame?</p>
              <p className="text-xs text-muted-foreground">
                We carry over 500+ styles across Armani Exchange, Versace, Oakley, Burberry & Mont Blanc at both Pune stores.
              </p>
            </div>
          </div>
          <a
            href={whatsappUrl("Hello Bapat Optics, I am looking for a specific frame model. Can you help me check availability?")}
            target="_blank"
            rel="noreferrer"
            className="eyebrow inline-flex shrink-0 items-center gap-1.5 rounded bg-gold px-6 py-3.5 text-[10px] font-semibold text-obsidian transition-all hover:bg-gold-soft"
          >
            Check Full Inventory <ArrowUpRight size={13} />
          </a>
        </div>
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-obsidian/85 p-3 sm:p-4 backdrop-blur-md"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.brand} ${active.name}`}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative grid max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-paper shadow-2xl md:grid-cols-2"
            >
              <div className="relative flex aspect-square w-full items-center justify-center bg-bone/80 p-8 sm:h-full">
                <img
                  src={active.image}
                  alt={`${active.brand} ${active.name}`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-between p-6 sm:p-8 md:p-10">
                <div>
                  <span className="eyebrow rounded bg-gold/15 px-2.5 py-1 text-[9px] text-gold">
                    {active.brand}
                  </span>
                  <h3 className="display mt-2 text-3xl sm:text-4xl text-obsidian">{active.name}</h3>
                  <div className="hairline my-4 sm:my-5" />
                  <dl className="space-y-2.5 text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <dt>Category</dt>
                      <dd className="text-obsidian font-medium">{active.category}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Material</dt>
                      <dd className="text-obsidian font-medium">{active.material}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Indicative Price</dt>
                      <dd className="text-obsidian font-semibold">{inr(active.price)}</dd>
                    </div>
                  </dl>
                  <p className="mt-4 text-[11px] leading-relaxed text-muted-foreground">
                    Message us on WhatsApp to reserve this frame for an in-store trial at Kothrud or Sadashiv Peth, along with a free Zeiss digital eye exam.
                  </p>
                </div>
                <a
                  href={whatsappUrl(
                    `Hello Bapat Optics, I'd like to try the ${active.brand} ${active.name} frame at your store.`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="eyebrow mt-6 block rounded bg-obsidian py-3.5 text-center text-[10px] text-paper transition-colors hover:bg-gold hover:text-obsidian sm:mt-8"
                >
                  Book In-Store Try-On
                </a>
              </div>
              <button
                onClick={() => setActive(null)}
                aria-label="Close quick view"
                className="absolute right-3 top-3 rounded-full bg-obsidian/80 p-1.5 text-paper backdrop-blur-md transition-colors hover:bg-gold hover:text-obsidian"
              >
                <X size={15} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
