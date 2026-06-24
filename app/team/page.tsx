import type { Metadata } from "next";
import Image from "next/image";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { TEAM_MEMBERS, TRUSTEES } from "@/lib/data";

export const metadata: Metadata = { title: "Our Team" };

function TeamCard({ member }: { member: (typeof TEAM_MEMBERS)[0] }) {
  return (
    <div className="bg-white rounded-card border border-green-100 overflow-hidden hover:shadow-lg hover:shadow-green-100 transition-shadow duration-300">
      <div className="relative aspect-square bg-green-100 overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-5">
        <p className="font-display font-bold text-text-primary text-lg mb-0.5">{member.name}</p>
        <p className="text-green-700 text-sm font-semibold mb-3">{member.title}</p>
        <p className="text-text-secondary text-sm leading-relaxed">{member.bio}</p>
      </div>
    </div>
  );
}

export default function TeamPage() {
  const leadership = TEAM_MEMBERS.filter((m) => m.department === "Leadership");
  const operations = TEAM_MEMBERS.filter((m) => m.department === "Operations");
  const programmes = TEAM_MEMBERS.filter((m) => m.department === "Programmes");

  return (
    <>
      <div className="pt-[72px] bg-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl md:text-6xl tracking-tight mb-4">
            Our Team
          </h1>
          <p className="text-green-100 text-lg max-w-[50ch]">
            Dedicated professionals and community leaders working to deliver change across Nigeria.
          </p>
        </div>
      </div>

      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="font-display font-bold text-text-primary text-3xl tracking-tight mb-10">
              Senior Leadership
            </h2>
          </RevealOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {leadership.map((m, i) => (
              <RevealOnScroll key={m.name} delay={i * 0.08}>
                <TeamCard member={m} />
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll>
            <h2 className="font-display font-bold text-text-primary text-3xl tracking-tight mb-10">
              Programmes Team
            </h2>
          </RevealOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {programmes.map((m, i) => (
              <RevealOnScroll key={m.name} delay={i * 0.08}>
                <TeamCard member={m} />
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll>
            <h2 className="font-display font-bold text-text-primary text-3xl tracking-tight mb-10">
              Operations Team
            </h2>
          </RevealOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {operations.map((m, i) => (
              <RevealOnScroll key={m.name} delay={i * 0.08}>
                <TeamCard member={m} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="font-display font-bold text-text-primary text-3xl tracking-tight mb-10">
              Board of Trustees
            </h2>
          </RevealOnScroll>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRUSTEES.map((t, i) => (
              <RevealOnScroll key={t.name} delay={i * 0.08}>
                <div className="bg-white rounded-card border border-green-100 p-6 flex gap-5 items-start">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-green-100 flex-shrink-0">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <p className="font-display font-bold text-text-primary text-base mb-0.5">{t.name}</p>
                    <p className="text-green-700 text-sm font-semibold mb-2">{t.title}</p>
                    <p className="text-text-secondary text-sm leading-relaxed">{t.bio}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
