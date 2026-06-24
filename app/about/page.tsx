import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { ArrowRight, DownloadSimple, CheckCircle } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = { title: "About Us" };

const TIMELINE = [
  { year: "2010", event: "Elite Club of Aagba founded by community leaders in Aagba, committed to local self-help and development." },
  { year: "2013", event: "Registered as a formal NGO with the Corporate Affairs Commission. First Education bursaries awarded to 24 students." },
  { year: "2016", event: "WASH programme launched in partnership with State Ministry of Water Resources. First five boreholes drilled." },
  { year: "2018", event: "Expanded into four new states. Total beneficiary count surpasses 3,000 for the first time." },
  { year: "2021", event: "International partnership established. Annual report independently audited for the first time." },
  { year: "2023", event: "Solar-powered water systems introduced. Beneficiaries reach 10,000." },
  { year: "2025", event: "12,450 total beneficiaries. Eight states active. 2025 Annual Report published." },
];

const VALUES = [
  { title: "Community-Led", body: "Programmes are designed with communities, not for them. Local voices shape every decision." },
  { title: "Accountability", body: "Full financial transparency, independent audits, and open reporting on what we achieve and where we fall short." },
  { title: "Equity", body: "We prioritise the most underserved, including girls, people with disabilities, and internally displaced persons." },
  { title: "Sustainability", body: "Every intervention builds local capacity so communities thrive long after our direct support ends." },
];

export default function AboutPage() {
  return (
    <>
      <div className="pt-[72px] bg-green-800 min-h-[50vh] flex items-end">
        <div className="relative w-full overflow-hidden">
          <Image
            src="https://picsum.photos/seed/community-leader-speech-nigeria/1400/600"
            alt="Community gathering"
            width={1400}
            height={600}
            className="w-full h-64 md:h-80 object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-green-800/40" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
              <h1 className="font-display font-bold text-white text-3xl sm:text-4xl md:text-6xl tracking-tight">
                About Us
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Founding Story */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <RevealOnScroll>
              <div>
                <h2 className="font-display font-bold text-text-primary text-2xl sm:text-3xl md:text-4xl tracking-tight mb-6">
                  Our founding story
                </h2>
                <div className="space-y-4 text-text-secondary text-base leading-relaxed">
                  <p>
                    The Elite Club of Aagba began in 2010 as a self-help group of community members who shared a belief that lasting change in Aagba had to be built from within. Pooling modest contributions, the founding members funded the first secondary school bursaries for six children whose families could not afford school fees.
                  </p>
                  <p>
                    What started as a local initiative grew into a structured NGO registered with the Corporate Affairs Commission in 2013, with a board of trustees, formal governance, and a mandate to extend to communities across Nigeria facing similar challenges.
                  </p>
                  <p>
                    Today we run two focused programme areas, Education and WASH, because we believe that without learning and without clean water, no other opportunity is possible.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="/annual-report-2025.pdf"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-btn bg-green-700 text-white font-semibold text-sm hover:bg-green-600 transition-colors"
                  >
                    <DownloadSimple size={18} weight="bold" />
                    Download Annual Report 2025
                  </a>
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <div className="relative rounded-card overflow-hidden aspect-[4/3] bg-green-100">
                <Image
                  src="https://picsum.photos/seed/ngo-founders-meeting-nigeria/700/525"
                  alt="Founding members of Elite Club of Aagba"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="py-24 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="grid md:grid-cols-2 gap-4 sm:gap-8 mb-16">
              <div className="p-5 sm:p-8 rounded-card bg-green-700 text-white">
                <p className="text-gold-400 text-xs font-semibold tracking-widest uppercase mb-3">Mission</p>
                <p className="font-display font-bold text-2xl leading-snug">
                  To empower Nigerian communities through access to quality education and clean water, enabling every person to reach their full potential.
                </p>
              </div>
              <div className="p-5 sm:p-8 rounded-card bg-white border border-green-200">
                <p className="text-green-600 text-xs font-semibold tracking-widest uppercase mb-3">Vision</p>
                <p className="font-display font-bold text-text-primary text-2xl leading-snug">
                  A Nigeria where no child misses school because of poverty and no family drinks unsafe water.
                </p>
              </div>
            </div>
          </RevealOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <RevealOnScroll key={v.title} delay={i * 0.08}>
                <div className="p-6 bg-white rounded-card border border-green-100">
                  <CheckCircle size={28} className="text-green-600 mb-4" weight="fill" />
                  <h3 className="font-display font-bold text-text-primary text-lg mb-2">{v.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{v.body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="font-display font-bold text-text-primary text-2xl sm:text-3xl md:text-4xl tracking-tight mb-14 text-center">
              Our history
            </h2>
          </RevealOnScroll>
          <div className="relative">
            <div className="absolute left-[68px] top-0 bottom-0 w-px bg-green-200 hidden sm:block" />
            <div className="space-y-10">
              {TIMELINE.map((item, i) => (
                <RevealOnScroll key={item.year} delay={i * 0.06}>
                  <div className="flex gap-4 sm:gap-10 items-start">
                    <div className="flex-shrink-0 w-16 sm:w-24 text-right">
                      <span className="font-display font-bold text-green-700 text-base sm:text-lg">{item.year}</span>
                    </div>
                    <div className="hidden sm:flex flex-shrink-0 mt-1.5">
                      <div className="w-3 h-3 rounded-full bg-gold-500 ring-4 ring-gold-100" />
                    </div>
                    <p className="text-text-secondary text-base leading-relaxed flex-1 pt-0.5">{item.event}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="py-24 bg-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
              <div>
                <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight mb-6">Governance and accountability</h2>
                <div className="space-y-4 text-green-100 text-base leading-relaxed">
                  <p>
                    Elite Club of Aagba is governed by a Board of Trustees that meets quarterly. The Board sets strategic direction, approves annual budgets, and reviews programme performance reports.
                  </p>
                  <p>
                    Financial statements are independently audited each year. We comply with all CAC reporting requirements and publish summary accounts in our annual report.
                  </p>
                  <p>
                    We are committed to the Accountability to Affected Populations (AAP) principles: communities we serve have clear channels to give feedback and raise complaints.
                  </p>
                </div>
                <div className="mt-8 grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "CAC Registration", value: "[Reg. No. CAC/IT/XXXXX]" },
                    { label: "Tax ID", value: "[TIN XXXXXXXXXX]" },
                    { label: "Audit Firm", value: "[Audit Firm Name]" },
                    { label: "Legal Form", value: "Incorporated Trustee" },
                  ].map(({ label, value }) => (
                    <div key={label} className="p-4 rounded-card bg-white/10 border border-white/10">
                      <p className="text-green-300 text-xs font-semibold mb-1">{label}</p>
                      <p className="text-white text-sm font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <p className="font-display font-bold text-6xl text-gold-400 mb-3">100%</p>
                  <p className="text-green-100 text-lg mb-8 max-w-[28ch]">of programme funds reach direct service delivery</p>
                  <Link
                    href="/publications"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-btn bg-gold-500 text-green-900 font-bold text-sm hover:bg-gold-400 transition-colors"
                  >
                    Download Reports <ArrowRight size={16} weight="bold" />
                  </Link>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
