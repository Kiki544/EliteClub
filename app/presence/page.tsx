import type { Metadata } from "next";
import dynamic from "next/dynamic";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { STATES, STATS } from "@/lib/data";
import { MapPin, Users } from "@phosphor-icons/react/dist/ssr";

const NigeriaMap = dynamic(() => import("@/components/ui/NigeriaMap"), {
  ssr: false,
  loading: () => (
    <div className="rounded-card bg-green-50 border border-green-200 h-96 flex items-center justify-center">
      <p className="text-green-500 text-sm animate-pulse">Loading map…</p>
    </div>
  ),
});

export const metadata: Metadata = { title: "Where We Work" };

export default function PresencePage() {
  const totalBeneficiaries = STATES.reduce((sum, s) => sum + s.beneficiaries, 0);

  return (
    <>
      <div className="pt-[72px] bg-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl md:text-6xl tracking-tight mb-4">
            Where We Work
          </h1>
          <p className="text-green-100 text-lg max-w-[52ch]">
            Active in {STATES.length} states across Nigeria, delivering Education and WASH programmes in partnership with local governments and communities.
          </p>
        </div>
      </div>

      {/* Summary Bar */}
      <section className="py-10 bg-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="font-display font-bold text-white text-4xl mb-1">{STATES.length}</p>
              <p className="text-green-200 text-sm">States</p>
            </div>
            <div className="text-center">
              <p className="font-display font-bold text-white text-4xl mb-1">{totalBeneficiaries.toLocaleString()}</p>
              <p className="text-green-200 text-sm">Beneficiaries</p>
            </div>
            <div className="text-center">
              <p className="font-display font-bold text-white text-4xl mb-1">2</p>
              <p className="text-green-200 text-sm">Programme Areas</p>
            </div>
            <div className="text-center">
              <p className="font-display font-bold text-white text-4xl mb-1">15</p>
              <p className="text-green-200 text-sm">Years of Operation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="font-display font-bold text-text-primary text-3xl tracking-tight mb-6">
              Nigeria - Active States
            </h2>
          </RevealOnScroll>
          <RevealOnScroll delay={0.05}>
            <NigeriaMap />
          </RevealOnScroll>
        </div>
      </section>

      {/* State Cards Grid */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="font-display font-bold text-text-primary text-3xl tracking-tight mb-10">
              States at a glance
            </h2>
          </RevealOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {STATES.map((state, i) => (
              <RevealOnScroll key={state.name} delay={(i % 4) * 0.07}>
                <div className="bg-white rounded-card border border-green-100 p-6 hover:border-green-400 hover:shadow-md transition-all duration-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-display font-bold text-text-primary text-xl mb-0.5">{state.name} State</p>
                      <p className="text-text-muted text-xs">Rep: {state.representative}</p>
                    </div>
                    <MapPin size={20} className="text-green-600 flex-shrink-0 mt-1" weight="fill" />
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Users size={14} className="text-green-600" />
                    <span className="font-semibold text-green-700 text-sm">
                      {state.beneficiaries.toLocaleString()} beneficiaries
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
    </>
  );
}
