import { motion } from "motion/react";
import { ScanFace, Ruler, Sparkles, Glasses } from "lucide-react";
import techImage from "@/assets/tech.jpg";

const steps = [
  {
    icon: ScanFace,
    title: "Measure",
    body: "Zeiss Visufit 1000 captures a 3D representation of the face to take fitting measurements — Bapat Optics hosted its launch in Pune.",
  },
  {
    icon: Ruler,
    title: "Analyse",
    body: "Zeiss i.Profiler digital instruments record the detailed optical measurements a prescription is built on.",
  },
  {
    icon: Sparkles,
    title: "Personalise",
    body: "Lens geometry is matched to the chosen frame, the wearing position and how you actually use your eyes.",
  },
  {
    icon: Glasses,
    title: "Fit",
    body: "Final adjustment happens in store, by hand, until the frame sits where the measurements assumed it would.",
  },
];

export function EyeQ() {
  return (
    <section id="eyeq" className="bg-paper py-16 sm:py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6 flex items-center gap-3 text-[9px] text-muted-foreground sm:mb-8 sm:text-[10px]">
              <span className="inline-block h-px w-8 bg-gold sm:w-12" />
              EyeQ · Precision technology
            </p>
            <h2 className="display text-[10vw] text-obsidian sm:text-[7vw] md:text-[4.8vw]">
              Fitting, measured to the millimetre.
            </h2>
            <p className="mt-5 max-w-md text-xs leading-relaxed text-muted-foreground sm:mt-6 sm:text-sm">
              As a Zeiss partner, Bapat Optics works with digital measurement and fitting
              technology rather than guesswork. Certified optometrists perform comprehensive digital refraction with zero guesswork.
            </p>
            <span className="eyebrow mt-6 inline-block rounded border border-gold/50 bg-gold/10 px-3.5 py-2 text-[9px] text-gold sm:mt-8">
              Zeiss Visufit 1000 · Launched in Pune at Bapat Optics · Free Checkups
            </span>
          </div>

          <div className="lg:col-span-7">
            <img
              src={techImage}
              alt="Optical lens held in a precision measurement instrument"
              loading="lazy"
              decoding="async"
              width={1408}
              height={1008}
              className="mb-px w-full rounded-t-lg object-cover"
            />
            <div className="grid gap-px bg-obsidian/10 sm:grid-cols-2">
              {steps.map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                  className="group bg-paper p-6 sm:p-7 md:p-8 transition-colors hover:bg-obsidian"
                >
                  <s.icon
                    size={20}
                    className="text-gold transition-transform duration-500 group-hover:-translate-y-1"
                  />
                  <h3 className="display mt-4 text-xl sm:text-2xl text-obsidian transition-colors group-hover:text-paper">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground transition-colors group-hover:text-steel">
                    {s.body}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
