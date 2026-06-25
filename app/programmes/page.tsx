import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { PROGRAMMES } from "@/lib/data";
import { GraduationCap, Drop, Briefcase, ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = { title: "Our Programmes" };

const ICONS: Record<string, React.ElementType> = { GraduationCap, Drop, Briefcase };

export default function ProgrammesPage() {
  return (
    <>
      <div className="pt-[72px] bg-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl md:text-6xl tracking-tight mb-4">
            Our Programmes
          </h1>
          <p className="text-green-100 text-lg max-w-[54ch]">
            We concentrate on three areas where focused investment produces the most durable change.
          </p>
        </div>
      </div>

      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10">
            {PROGRAMMES.map((prog, i) => {
              const Icon = ICONS[prog.icon];
              const reverse = i % 2 !== 0;
              return (
                <RevealOnScroll key={prog.slug} delay={0.05}>
                  <div
                    className={`grid lg:grid-cols-2 gap-12 items-center ${reverse ? "lg:grid-flow-dense" : ""}`}
                  >
                    <div className={`${reverse ? "lg:col-start-2" : ""}`}>
                      <div className="relative rounded-card overflow-hidden aspect-[16/10] bg-green-100">
                        <Image
                          src={prog.image}
                          alt={prog.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </div>

                    <div className={`${reverse ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                      <div className="w-14 h-14 rounded-card bg-green-100 flex items-center justify-center mb-6">
                        {Icon && <Icon size={28} className="text-green-700" weight="fill" />}
                      </div>
                      <h2 className="font-display font-bold text-text-primary text-4xl tracking-tight mb-3">
                        {prog.title}
                      </h2>
                      <p className="text-gold-600 font-semibold text-sm mb-4">{prog.keyResult}</p>
                      <p className="text-text-secondary text-base leading-relaxed mb-6 max-w-[52ch]">
                        {prog.description}
                      </p>
                      <ul className="space-y-2 mb-8">
                        {prog.objectives.map((obj) => (
                          <li key={obj.title} className="flex items-start gap-3 text-sm text-text-secondary">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                            {obj.title}: {obj.activities.join(", ")}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/programmes/${prog.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-btn bg-green-700 text-white font-semibold text-sm hover:bg-green-600 transition-colors"
                      >
                        Full Programme Details <ArrowRight size={16} weight="bold" />
                      </Link>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
