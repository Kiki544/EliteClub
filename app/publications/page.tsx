import type { Metadata } from "next";
import Image from "next/image";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { PUBLICATIONS } from "@/lib/data";
import { DownloadSimple, Lock, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = { title: "Publications Library" };

const TYPES = ["All", "Annual Report", "Research", "Evaluation", "Policy", "Training Material"];

export default function PublicationsPage() {
  const featured = PUBLICATIONS[0];
  const rest = PUBLICATIONS.slice(1);

  return (
    <>
      <div className="pt-[72px] bg-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl md:text-6xl tracking-tight mb-4">
            Publications Library
          </h1>
          <p className="text-green-100 text-lg max-w-[52ch]">
            Annual reports, research, evaluations, and training materials available to download.
          </p>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="bg-white border-b border-green-100 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlass size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="search"
                placeholder="Search publications..."
                className="w-full pl-10 pr-4 py-2.5 rounded-btn border border-green-200 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {TYPES.map((type) => (
                <button
                  key={type}
                  className={`flex-shrink-0 px-3 py-2 rounded-pill text-xs font-semibold transition-colors ${
                    type === "All"
                      ? "bg-green-700 text-white"
                      : "bg-green-50 text-text-secondary hover:bg-green-100"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Publication */}
          <RevealOnScroll>
            <div className="grid lg:grid-cols-[220px_1fr] gap-10 items-center mb-16 p-8 bg-green-50 rounded-card border border-green-200">
              <div className="relative rounded-btn overflow-hidden aspect-[3/4] bg-green-100 max-h-[280px] lg:max-h-none">
                <Image
                  src={featured.cover}
                  alt={featured.title}
                  fill
                  className="object-cover"
                  sizes="220px"
                />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <span className="px-3 py-1 rounded-pill bg-gold-500 text-green-900 text-xs font-bold">
                    Featured
                  </span>
                  <span className="px-3 py-1 rounded-pill bg-green-100 text-green-700 text-xs font-semibold">
                    {featured.type}
                  </span>
                  <span className="text-text-muted text-xs">{featured.year}</span>
                </div>
                <h2 className="font-display font-bold text-text-primary text-3xl tracking-tight mb-3">
                  {featured.title}
                </h2>
                <p className="text-text-secondary text-base leading-relaxed mb-6 max-w-[56ch]">
                  {featured.summary}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-btn bg-green-700 text-white font-semibold text-sm hover:bg-green-600 transition-colors"
                >
                  <DownloadSimple size={18} weight="bold" />
                  Download PDF
                </a>
              </div>
            </div>
          </RevealOnScroll>

          {/* Publication Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((pub, i) => (
              <RevealOnScroll key={pub.id} delay={i * 0.06}>
                <div className="bg-white rounded-card border border-green-100 overflow-hidden hover:border-green-300 hover:shadow-md transition-all duration-200 flex flex-col">
                  <div className="relative aspect-[3/4] bg-green-100 max-h-[220px] overflow-hidden">
                    <Image
                      src={pub.cover}
                      alt={pub.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {pub.restricted && (
                      <div className="absolute inset-0 bg-green-900/60 flex items-center justify-center">
                        <Lock size={32} className="text-white" weight="fill" />
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                      <span className="px-2 py-0.5 rounded-pill bg-green-100 text-green-700 text-xs font-semibold">
                        {pub.type}
                      </span>
                      <span className="text-text-muted text-xs">{pub.year}</span>
                    </div>
                    <h3 className="font-display font-bold text-text-primary text-base leading-snug mb-3 flex-1">
                      {pub.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-5">{pub.summary}</p>
                    {pub.restricted ? (
                      <button className="inline-flex items-center gap-2 px-4 py-2 rounded-btn border border-green-300 text-text-secondary text-sm font-medium hover:border-green-600 hover:text-green-700 transition-colors w-fit">
                        <Lock size={15} />
                        Request Access
                      </button>
                    ) : (
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-btn border border-green-300 text-green-700 text-sm font-medium hover:bg-green-700 hover:text-white hover:border-green-700 transition-colors w-fit"
                      >
                        <DownloadSimple size={15} weight="bold" />
                        Download PDF
                      </a>
                    )}
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Request Access Form */}
          <RevealOnScroll delay={0.1}>
            <div className="mt-16 p-8 rounded-card bg-green-50 border border-green-200">
              <h2 className="font-display font-bold text-text-primary text-2xl tracking-tight mb-3">
                Request access to restricted documents
              </h2>
              <p className="text-text-secondary text-sm mb-6 max-w-[52ch]">
                Some documents are restricted to verified researchers and partner organisations. Submit a request and our team will respond within 3 working days.
              </p>
              <form className="grid sm:grid-cols-2 gap-5 max-w-2xl">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-text-primary">Full Name</label>
                  <input className="px-4 py-2.5 rounded-btn border border-green-200 text-sm text-text-primary focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white" placeholder="Your name" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-text-primary">Organisation</label>
                  <input className="px-4 py-2.5 rounded-btn border border-green-200 text-sm text-text-primary focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white" placeholder="Your organisation" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-text-primary">Email Address</label>
                  <input type="email" className="px-4 py-2.5 rounded-btn border border-green-200 text-sm text-text-primary focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white" placeholder="you@organisation.org" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-text-primary">Document Requested</label>
                  <input className="px-4 py-2.5 rounded-btn border border-green-200 text-sm text-text-primary focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white" placeholder="Publication title" />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" className="px-6 py-3 rounded-btn bg-green-700 text-white font-semibold text-sm hover:bg-green-600 transition-colors">
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
