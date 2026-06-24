import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/home/Hero";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import PartnerMarquee from "@/components/ui/PartnerMarquee";
import { STATS, PROGRAMMES, NEWS_ARTICLES } from "@/lib/data";
import { GraduationCap, Drop, ArrowRight, CalendarBlank } from "@phosphor-icons/react/dist/ssr";

const PROGRAMME_ICONS: Record<string, React.ElementType> = {
  GraduationCap,
  Drop,
};

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Stats */}
      <section className="bg-green-700 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <p className="font-display font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-green-200 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programmes */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mb-14">
              <h2 className="font-display font-bold text-text-primary text-2xl sm:text-4xl md:text-5xl tracking-tight mb-4">
                What we do
              </h2>
              <p className="text-text-secondary text-lg max-w-[52ch]">
                Two focused programme areas where we concentrate resources for maximum, measurable impact.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 gap-6">
            {PROGRAMMES.map((prog, i) => {
              const Icon = PROGRAMME_ICONS[prog.icon];
              return (
                <RevealOnScroll key={prog.slug} delay={i * 0.1}>
                  <Link
                    href={`/programmes/${prog.slug}`}
                    className="group block relative rounded-card overflow-hidden aspect-[16/10] bg-green-800"
                  >
                    <Image
                      src={prog.image}
                      alt={`${prog.title} programme`}
                      fill
                      className="object-cover opacity-60 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/30 to-transparent" />
                    <div className="absolute inset-0 p-5 sm:p-8 flex flex-col justify-between">
                      <div className="w-12 h-12 rounded-btn bg-gold-500/90 flex items-center justify-center">
                        {Icon && <Icon size={24} className="text-green-900" weight="fill" />}
                      </div>
                      <div>
                        <p className="text-gold-400 text-xs font-semibold tracking-widest uppercase mb-2">
                          {prog.keyResult}
                        </p>
                        <h3 className="font-display font-bold text-white text-3xl mb-2">{prog.title}</h3>
                        <p className="text-green-100 text-sm leading-relaxed max-w-[40ch] mb-4">
                          {prog.tagline}
                        </p>
                        <span className="inline-flex items-center gap-2 text-gold-400 text-sm font-semibold group-hover:gap-3 transition-all">
                          Learn more <ArrowRight size={16} weight="bold" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </RevealOnScroll>
              );
            })}
          </div>

          <RevealOnScroll delay={0.2}>
            <div className="mt-8 text-center">
              <Link
                href="/programmes"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-btn border-2 border-green-700 text-green-700 font-semibold text-sm hover:bg-green-700 hover:text-white transition-colors duration-150"
              >
                View all programmes <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-24 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
              <div>
                <h2 className="font-display font-bold text-text-primary text-2xl sm:text-4xl md:text-5xl tracking-tight mb-3">
                  Latest News
                </h2>
                <p className="text-text-secondary text-lg">Updates from the field and our campaigns.</p>
              </div>
              <Link
                href="/news"
                className="inline-flex items-center gap-2 text-green-700 font-semibold text-sm hover:text-green-600 transition-colors"
              >
                All articles <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-3 gap-6">
            {NEWS_ARTICLES.slice(0, 3).map((article, i) => (
              <RevealOnScroll key={article.slug} delay={i * 0.08}>
                <Link
                  href={`/news/${article.slug}`}
                  className="group flex flex-col bg-white rounded-card overflow-hidden border border-green-100 hover:border-green-300 hover:shadow-lg hover:shadow-green-100 transition-all duration-300"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-green-100">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-pill bg-green-700 text-white text-xs font-semibold">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-text-muted text-xs mb-3">
                      <CalendarBlank size={13} />
                      {article.date}
                    </div>
                    <h3 className="font-display font-bold text-text-primary text-lg leading-snug mb-3 group-hover:text-green-700 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed flex-1">{article.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-green-700 text-sm font-semibold mt-4 group-hover:gap-2.5 transition-all">
                      Read more <ArrowRight size={14} weight="bold" />
                    </span>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Strip */}
      <section className="py-20 bg-green-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <RevealOnScroll>
            <h2 className="font-display font-bold text-white text-2xl sm:text-4xl md:text-5xl tracking-tight mb-4">
              Your gift changes lives
            </h2>
            <p className="text-green-100 text-lg mb-10 max-w-[48ch] mx-auto">
              Every naira goes directly to programme delivery. Choose an amount or give what you can.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { amount: "2,000", label: "Funds school supplies for one child" },
                { amount: "5,000", label: "Vaccinates 10 children" },
                { amount: "10,000", label: "Supports one borehole repair" },
              ].map(({ amount, label }) => (
                <Link
                  key={amount}
                  href={`/donate?amount=${amount.replace(",", "")}`}
                  className="group flex flex-col items-center px-8 py-5 rounded-card bg-white/10 hover:bg-gold-500 border border-white/20 hover:border-gold-400 transition-all duration-200 w-full sm:w-auto sm:min-w-[180px]"
                >
                  <span className="font-display font-bold text-white group-hover:text-green-900 text-2xl mb-1">
                    N{amount}
                  </span>
                  <span className="text-green-200 group-hover:text-green-800 text-xs text-center leading-snug">
                    {label}
                  </span>
                </Link>
              ))}
            </div>
            <Link
              href="/donate"
              className="inline-flex items-center px-8 py-4 rounded-btn bg-gold-500 hover:bg-gold-400 text-green-900 font-bold text-base transition-colors duration-150 active:scale-[0.98]"
            >
              Donate Now
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white border-t border-green-100">
        <p className="text-center text-text-muted text-xs font-semibold tracking-widest uppercase mb-10">
          Partners and Funders
        </p>
        <PartnerMarquee />
      </section>
    </>
  );
}
