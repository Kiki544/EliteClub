"use client";

import { useState } from "react";
import Image from "next/image";
import { MEMBERS, STATES } from "@/lib/data";
import { MapPin } from "@phosphor-icons/react";

const STATE_NAMES = ["All", ...STATES.map((s) => s.name)];

const ROLE_COLOURS: Record<string, string> = {
  "Club President":    "bg-gold-100 text-gold-600 border-gold-400",
  "State Coordinator": "bg-green-100 text-green-700 border-green-300",
  "Vice Coordinator":  "bg-green-50  text-green-600 border-green-200",
  "Secretary":         "bg-green-50  text-green-600 border-green-200",
  "Treasurer":         "bg-green-50  text-green-600 border-green-200",
  "Member":            "bg-surface   text-text-muted border-green-100",
};

function roleColour(role: string) {
  return ROLE_COLOURS[role] ?? "bg-surface text-text-muted border-green-100";
}

export default function MembersGrid() {
  const [active, setActive] = useState("All");

  const visible =
    active === "All" ? MEMBERS : MEMBERS.filter((m) => m.state === active);

  // Group by state for the "All" view
  const grouped: Record<string, typeof MEMBERS> = {};
  for (const m of visible) {
    (grouped[m.state] ??= []).push(m);
  }
  const stateOrder = STATES.map((s) => s.name).filter((s) => grouped[s]);

  return (
    <>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {STATE_NAMES.map((s) => (
          <button
            key={s}
            onClick={() => setActive(s)}
            className={`px-4 py-1.5 rounded-pill text-sm font-semibold border transition-colors ${
              active === s
                ? "bg-green-700 text-white border-green-700"
                : "bg-white text-text-secondary border-green-200 hover:border-green-500 hover:text-green-700"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Grouped sections */}
      <div className="space-y-14">
        {stateOrder.map((state) => (
          <section key={state}>
            <div className="flex items-center gap-2 mb-6">
              <MapPin size={18} className="text-green-600" weight="fill" />
              <h2 className="font-display font-bold text-text-primary text-2xl tracking-tight">
                {state} State
              </h2>
              <span className="ml-2 px-2.5 py-0.5 rounded-pill bg-green-100 text-green-700 text-xs font-semibold">
                {grouped[state].length} {grouped[state].length === 1 ? "member" : "members"}
              </span>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {grouped[state].map((member, i) => (
                <div
                  key={`${state}-${i}`}
                  className="bg-white rounded-card border border-green-100 p-5 flex flex-col items-center text-center hover:border-green-300 hover:shadow-sm transition-all duration-200"
                >
                  <div className="relative w-20 h-20 rounded-full overflow-hidden bg-green-100 mb-4 flex-shrink-0 ring-2 ring-green-200">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <p className="font-display font-bold text-text-primary text-base leading-tight mb-1">
                    {member.name}
                  </p>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-pill border text-xs font-semibold mb-3 ${roleColour(member.role)}`}
                  >
                    {member.role}
                  </span>
                  <p className="text-text-muted text-xs">
                    Member since {member.yearJoined}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
