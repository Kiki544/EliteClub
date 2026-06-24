import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ProgressBar from "@/components/ui/ProgressBar";
import { STATS, PROGRAMMES, STATES, SDG_GOALS, NEWS_ARTICLES } from "@/lib/data";
import { DownloadSimple, ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = { title: "Impact and Results" };

const ANNUAL_REPORTS = [
  { year: "2025", size: "2.3 MB" },
  { year: "2024", size: "2.1 MB" },
  { year: "2023", size: "1.8 MB" },
  { year: "2022", size: "1.6 MB" },
];

export default function ImpactPage() {
  return (
    <>
      <div className="pt-[72px] bg-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl md:text-6xl tracking-tight mb-4">
            Impact and Results
          </h1>
          <p className="text-green-100 text-lg max-w-[52ch]">
            Transparent reporting on what we have delivered and how it compares to our targets.
          </p>
        </div>
      </div>

      {/* Big Numbers */}
      <section className="py-24 bg-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display font-bold text-white text-3xl sm:text-4xl md:text-6xl mb-3">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-green-200 text-sm font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programme Results */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="font-display font-bold text-text-primary text-4xl tracking-tight mb-14">
              Results by programme
            </h2>
          </RevealOnScroll>
          <div className="grid lg:grid-cols-2 gap-8">
            {PROGRAMMES.map((prog, pi) => (
              <RevealOnScroll key={prog.slug} delay={pi * 0.1}>
                <div className="p-8 rounded-card bg-white border border-green-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-display font-bold text-text-primary text-2xl">{prog.title}</h3>
                    <span className="px-3 py-1 rounded-pill bg-green-100 text-green-700 text-xs font-semibold">
                      {prog.keyResult}
                    </span>
                  </div>
                  <div className="space-y-6">
                    {prog.objectives.map((obj) => (
                      <ProgressBar
                        key={obj.title}
                        label={obj.title}
                        achieved={obj.achieved}
                        target={obj.target}
                      />
                    ))}
                  </div>
                  <Link
                    href={`/programmes/${prog.slug}`}
                    className="inline-flex items-center gap-1.5 mt-6 text-green-700 text-sm font-semibold hover:text-green-600 transition-colors"
                  >
                    Full programme details <ArrowRight size={14} weight="bold" />
                  </Link>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* State Breakdown */}
      <section className="py-24 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="font-display font-bold text-text-primary text-4xl tracking-tight mb-4">
              State-by-state breakdown
            </h2>
            <p className="text-text-secondary text-lg mb-12">Active across {STATES.length} states in Nigeria.</p>
          </RevealOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STATES.map((state, i) => (
              <RevealOnScroll key={state.name} delay={(i % 4) * 0.06}>
                <div className="p-5 bg-white rounded-card border border-green-100">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-display font-bold text-text-primary text-xl">{state.name}</p>
                    <span className="font-display font-bold text-green-700 text-lg">
                      {state.beneficiaries.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {state.programmes.map((p) => (
                      <span key={p} className="px-2 py-0.5 rounded-pill bg-green-100 text-green-700 text-xs font-semibold">
                        {p}
                      </span>
                    ))}
                  </div>
                  <p className="text-text-muted text-xs leading-snug">{state.summary}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* SDG */}
      <section className="py-24 bg-green-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="font-display font-bold text-4xl tracking-tight mb-4">
              UN Sustainable Development Goals
            </h2>
            <p className="text-green-200 text-lg mb-12 max-w-[52ch]">
              Our work directly contributes to five of the 17 Global Goals.
            </p>
          </RevealOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {SDG_GOALS.map((goal, i) => (
              <RevealOnScroll key={goal.number} delay={i * 0.08}>
                <div
                  className="p-5 rounded-card text-white"
                  style={{ backgroundColor: goal.color }}
                >
                  <p className="font-display font-bold text-4xl mb-2 opacity-90">{goal.number}</p>
                  <p className="font-bold text-sm mb-2">{goal.title}</p>
                  <p className="text-white/80 text-xs leading-snug">{goal.description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="font-display font-bold text-text-primary text-4xl tracking-tight mb-12">
              Success stories
            </h2>
          </RevealOnScroll>
          <div className="grid md:grid-cols-2 gap-8">
            {PROGRAMMES.map((prog, i) => (
              <RevealOnScroll key={prog.slug} delay={i * 0.1}>
                <div className="grid sm:grid-cols-[200px_1fr] gap-6 p-6 bg-white rounded-card border border-green-100">
                  <div className="relative aspect-square sm:aspect-[3/4] rounded-btn overflow-hidden bg-green-100">
                    <Image
                      src={prog.caseStudy.image}
                      alt={prog.caseStudy.name}
                      fill
                      className="object-cover"
                      sizes="200px"
                    />
                  </div>
                  <div>
                    <p className="text-green-600 text-xs font-semibold tracking-widest uppercase mb-3">
                      {prog.caseStudy.location}
                    </p>
                    <p className="text-text-primary text-base leading-relaxed mb-4 italic">
                      "{prog.caseStudy.story}"
                    </p>
                    <p className="text-text-primary font-semibold text-sm">{prog.caseStudy.name}</p>
                    <p className="text-text-muted text-xs">{prog.title} programme beneficiary</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Annual Reports */}
      <section className="py-24 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
              <div>
                <h2 className="font-display font-bold text-text-primary text-3xl tracking-tight mb-2">
                  Annual reports
                </h2>
                <p className="text-text-secondary text-base">Full accounts, independently audited.</p>
              </div>
              <Link
                href="/publications"
                className="text-green-700 font-semibold text-sm hover:text-green-600 transition-colors"
              >
                Publications library
              </Link>
            </div>
          </RevealOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ANNUAL_REPORTS.map((r, i) => (
              <RevealOnScroll key={r.year} delay={i * 0.06}>
                <a
                  href="#"
                  className="flex items-center justify-between p-5 bg-white rounded-card border border-green-200 hover:border-green-400 hover:bg-green-50 transition-colors group"
                >
                  <div>
                    <p className="font-display font-bold text-text-primary text-lg group-hover:text-green-700 transition-colors">
                      Annual Report {r.year}
                    </p>
                    <p className="text-text-muted text-xs mt-1">PDF, {r.size}</p>
                  </div>
                  <DownloadSimple size={20} className="text-green-600" weight="bold" />
                </a>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={0.1}>
            <div className="mt-12 p-6 rounded-card bg-white border border-green-200">
              <p className="text-text-secondary text-sm leading-relaxed">
                <span className="font-semibold text-text-primary">Data collection and validation:</span> All beneficiary figures are collected through monthly programme monitoring visits and validated by our independent Monitoring, Evaluation, Accountability and Learning (MEAL) team. Verification visits are conducted quarterly. Discrepancies between reported and verified figures are documented in each annual report.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
