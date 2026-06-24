import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import ProgressBar from "@/components/ui/ProgressBar";
import { PROGRAMMES } from "@/lib/data";
import { DownloadSimple, CheckFat } from "@phosphor-icons/react/dist/ssr";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROGRAMMES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const prog = PROGRAMMES.find((p) => p.slug === slug);
  return { title: prog ? `${prog.title} Programme` : "Programme" };
}

export default async function ProgrammeDetailPage({ params }: Props) {
  const { slug } = await params;
  const prog = PROGRAMMES.find((p) => p.slug === slug);
  if (!prog) notFound();

  return (
    <>
      <div className="pt-[72px] relative min-h-[60vh] flex items-end overflow-hidden bg-green-900">
        <Image
          src={prog.image}
          alt={prog.title}
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/95 via-green-900/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16">
          <p className="text-gold-400 text-xs font-semibold tracking-widest uppercase mb-3">{prog.keyResult}</p>
          <h1 className="font-display font-bold text-white text-5xl md:text-6xl tracking-tight">
            {prog.title}
          </h1>
        </div>
      </div>

      {/* Description */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <RevealOnScroll>
              <h2 className="font-display font-bold text-text-primary text-3xl tracking-tight mb-5">
                The challenge we address
              </h2>
              <p className="text-text-secondary text-base leading-relaxed mb-8">{prog.description}</p>
              <div className="space-y-5">
                {prog.objectives.map((obj) => (
                  <div key={obj.title} className="p-5 rounded-card bg-green-50 border border-green-100">
                    <div className="flex items-start gap-3 mb-3">
                      <CheckFat size={18} className="text-green-700 mt-0.5 flex-shrink-0" weight="fill" />
                      <p className="font-display font-bold text-text-primary text-base">{obj.title}</p>
                    </div>
                    <ul className="space-y-1 pl-7">
                      {obj.activities.map((act) => (
                        <li key={act} className="text-text-secondary text-sm">{act}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h2 className="font-display font-bold text-text-primary text-3xl tracking-tight mb-6">
                Results against targets
              </h2>
              <div className="space-y-8">
                {prog.objectives.map((obj) => (
                  <div key={obj.title}>
                    <ProgressBar
                      label={obj.title}
                      achieved={obj.achieved}
                      target={obj.target}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 rounded-card bg-green-700 text-white">
                <p className="font-display font-bold text-2xl mb-2">{prog.keyResult}</p>
                <p className="text-green-100 text-sm">Total beneficiaries directly served through this programme</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="font-display font-bold text-text-primary text-3xl tracking-tight mb-10">
              A beneficiary's story
            </h2>
          </RevealOnScroll>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <RevealOnScroll>
              <div className="relative rounded-card overflow-hidden aspect-[3/4] max-h-[500px] bg-green-100">
                <Image
                  src={prog.caseStudy.image}
                  alt={prog.caseStudy.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <div>
                <p className="text-green-700 text-xs font-semibold tracking-widest uppercase mb-6">
                  {prog.caseStudy.location}
                </p>
                <blockquote className="font-display font-bold text-text-primary text-2xl leading-snug mb-6">
                  "{prog.caseStudy.story}"
                </blockquote>
                <p className="text-text-secondary font-semibold">{prog.caseStudy.name}</p>
                <p className="text-text-muted text-sm">Programme beneficiary, {prog.caseStudy.location}</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Partners and Downloads */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <RevealOnScroll>
              <h2 className="font-display font-bold text-text-primary text-2xl tracking-tight mb-6">
                Delivery partners
              </h2>
              <div className="space-y-3">
                {prog.partners.map((p) => (
                  <div key={p} className="px-5 py-4 rounded-card bg-green-50 border border-green-100 text-text-secondary text-sm font-medium">
                    {p}
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <h2 className="font-display font-bold text-text-primary text-2xl tracking-tight mb-6">
                Programme documents
              </h2>
              <div className="space-y-3">
                {[
                  { label: `${prog.title} Programme Summary 2025`, size: "PDF, 1.2 MB" },
                  { label: `${prog.title} Baseline Data Report`, size: "PDF, 3.4 MB" },
                  { label: "Monitoring and Evaluation Framework", size: "PDF, 0.8 MB" },
                ].map(({ label, size }) => (
                  <a
                    key={label}
                    href="#"
                    className="flex items-center justify-between px-5 py-4 rounded-card bg-white border border-green-200 hover:border-green-400 hover:bg-green-50 transition-colors group"
                  >
                    <div>
                      <p className="text-text-primary text-sm font-medium group-hover:text-green-700 transition-colors">
                        {label}
                      </p>
                      <p className="text-text-muted text-xs mt-0.5">{size}</p>
                    </div>
                    <DownloadSimple size={18} className="text-green-600 flex-shrink-0" weight="bold" />
                  </a>
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
