import type { Metadata } from "next";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import MembersGrid from "@/components/ui/MembersGrid";
import { MEMBERS, STATES } from "@/lib/data";

export const metadata: Metadata = { title: "Our Members" };

export default function MembersPage() {
  return (
    <>
      <div className="pt-[72px] bg-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl md:text-6xl tracking-tight mb-4">
            Our Members
          </h1>
          <p className="text-green-100 text-lg max-w-[52ch]">
            The Elite Club of Aagba is built on the commitment of members across{" "}
            {STATES.length} states. Each member is an active ambassador for community
            development in their home state.
          </p>
        </div>
      </div>

      {/* Summary bar */}
      <section className="py-10 bg-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="text-center">
              <p className="font-display font-bold text-white text-4xl mb-1">
                {MEMBERS.length}
              </p>
              <p className="text-green-200 text-sm">Registered Members</p>
            </div>
            <div className="text-center">
              <p className="font-display font-bold text-white text-4xl mb-1">
                {STATES.length}
              </p>
              <p className="text-green-200 text-sm">States Represented</p>
            </div>
            <div className="text-center col-span-2 md:col-span-1">
              <p className="font-display font-bold text-white text-4xl mb-1">
                {new Date().getFullYear() - 2010}
              </p>
              <p className="text-green-200 text-sm">Years of Fellowship</p>
            </div>
          </div>
        </div>
      </section>

      {/* Members grid */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <MembersGrid />
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
