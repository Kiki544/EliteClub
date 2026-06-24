"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import {
  Handshake,
  UsersThree,
  MapPin,
  Laptop,
  Wrench,
  CheckCircle,
  IdentificationCard,
  Star,
  UserCirclePlus,
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react";

const VOLUNTEER_NEEDS = [
  { type: "Field", icon: MapPin, title: "Field Programme Volunteer", location: "Various states", duration: "3-6 months", description: "Support WASH or Education programme delivery directly in communities. Must be available to travel." },
  { type: "Remote", icon: Laptop, title: "Communications and Media Volunteer", location: "Remote", duration: "Flexible", description: "Support social media, content writing, newsletter production, and media monitoring from anywhere." },
  { type: "Skills", icon: Wrench, title: "MEAL Specialist (short-term)", location: "Remote / Field", duration: "4-8 weeks", description: "Help design or review our monitoring and evaluation frameworks. Requires MEAL experience in the development sector." },
  { type: "Skills", icon: UsersThree, title: "HR and Safeguarding Advisor", location: "Remote", duration: "Flexible", description: "Advise on HR policies, safeguarding frameworks, and staff wellbeing programmes on a voluntary basis." },
];

const MEMBERSHIP_TYPES = [
  { name: "Full Member", fee: "₦5,000/year", description: "For Nigerian citizens aged 18 and above who fully subscribe to the Club's constitution and mission." },
  { name: "Associate Member", fee: "₦2,500/year", description: "For individuals who support the Club's work but are not yet resident in Nigeria, or diaspora members." },
  { name: "Youth Member", fee: "₦1,000/year", description: "For Nigerians aged 16–25 who wish to contribute through the Club's youth action programmes." },
];

const REQUIREMENTS = [
  "Nigerian citizen or legal resident (associate membership open to diaspora)",
  "Aged 16 years or above (youth membership from 16; full membership from 18)",
  "Agreement to abide by the Club's constitution and code of conduct",
  "Payment of applicable annual membership subscription",
  "Provision of two passport photographs",
  "Valid government-issued ID (National ID, international passport, or driver's licence)",
  "One guarantor who is an existing Club member in good standing, or a respected community figure",
  "Completed guarantor declaration form (Section B below)",
];

type MemForm = {
  fullName: string; dob: string; gender: string; stateOfOrigin: string; stateOfResidence: string;
  address: string; phone: string; email: string; occupation: string; employer: string;
  membershipType: string; motivation: string; declaration: boolean;
};

type GuarantorForm = {
  gName: string; gRelationship: string; gPhone: string; gEmail: string;
  gOccupation: string; gYearsKnown: string; gStatement: string; gDeclaration: boolean;
};

const emptyMem: MemForm = {
  fullName: "", dob: "", gender: "", stateOfOrigin: "", stateOfResidence: "",
  address: "", phone: "", email: "", occupation: "", employer: "",
  membershipType: "", motivation: "", declaration: false,
};

const emptyGuarantor: GuarantorForm = {
  gName: "", gRelationship: "", gPhone: "", gEmail: "",
  gOccupation: "", gYearsKnown: "", gStatement: "", gDeclaration: false,
};

function saveApplication(mem: MemForm) {
  try {
    const existing = JSON.parse(localStorage.getItem("eca_member_applications") || "[]");
    existing.push({
      id: Date.now().toString(),
      name: mem.fullName,
      email: mem.email,
      type: mem.membershipType,
      submittedAt: new Date().toISOString(),
    });
    localStorage.setItem("eca_member_applications", JSON.stringify(existing));
  } catch {}
}

export default function GetInvolvedPage() {
  const [volForm, setVolForm] = useState({ name: "", email: "", phone: "", role: "", message: "" });
  const [partForm, setPartForm] = useState({ org: "", country: "", contact: "", email: "", collaboration: "" });
  const [volSent, setVolSent] = useState(false);
  const [partSent, setPartSent] = useState(false);

  // Membership
  const [memForm, setMemForm] = useState<MemForm>(emptyMem);
  const [guarantorForm, setGuarantorForm] = useState<GuarantorForm>(emptyGuarantor);
  const [memSent, setMemSent] = useState(false);
  const [showGuarantor, setShowGuarantor] = useState(false);
  const [memStep, setMemStep] = useState<1 | 2>(1); // 1 = personal, 2 = guarantor

  const submitMembership = (e: React.FormEvent) => {
    e.preventDefault();
    if (!memForm.declaration) return;
    if (!guarantorForm.gDeclaration) return;
    saveApplication(memForm);
    setMemSent(true);
  };

  return (
    <>
      <div className="pt-[72px] bg-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl md:text-6xl tracking-tight mb-4">
            Get Involved
          </h1>
          <p className="text-green-100 text-lg max-w-[52ch]">
            Join us as a member, volunteer, or partner organisation. Every skill and every connection helps us reach further.
          </p>
          {/* Jump links */}
          <div className="flex flex-wrap gap-3 mt-8">
            {["#membership", "#volunteer", "#partnership"].map((href) => (
              <a
                key={href}
                href={href}
                className="px-5 py-2 rounded-btn border border-white/30 text-white text-sm font-semibold hover:border-white/60 transition-colors"
              >
                {href.replace("#", "").charAt(0).toUpperCase() + href.slice(2)}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ───────────────── MEMBERSHIP ───────────────── */}
      <section id="membership" className="py-24 bg-surface scroll-mt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mb-12">
              <div className="w-14 h-14 rounded-card bg-gold-100 flex items-center justify-center mb-5">
                <Star size={28} className="text-gold-600" weight="fill" />
              </div>
              <h2 className="font-display font-bold text-text-primary text-2xl sm:text-3xl md:text-4xl tracking-tight mb-3">
                Become a Member
              </h2>
              <p className="text-text-secondary text-lg max-w-[56ch]">
                Membership gives you a voice in shaping our programmes, access to our network, and the satisfaction of being part of lasting change in Nigeria.
              </p>
            </div>
          </RevealOnScroll>

          {/* Membership tiers */}
          <div className="grid md:grid-cols-3 gap-5 mb-14">
            {MEMBERSHIP_TYPES.map((m, i) => (
              <RevealOnScroll key={m.name} delay={i * 0.07}>
                <div className="p-6 bg-white rounded-card border border-green-100 hover:border-green-300 transition-colors h-full flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display font-bold text-text-primary text-lg">{m.name}</h3>
                    <span className="px-3 py-1 rounded-pill bg-gold-100 text-gold-700 text-xs font-bold">{m.fee}</span>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">{m.description}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          {/* Requirements */}
          <RevealOnScroll>
            <div className="bg-green-700 rounded-card p-5 sm:p-8 mb-14">
              <h3 className="font-display font-bold text-white text-2xl tracking-tight mb-6 flex items-center gap-3">
                <IdentificationCard size={26} weight="fill" className="text-gold-400" />
                Membership Requirements
              </h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {REQUIREMENTS.map((req) => (
                  <li key={req} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-gold-400 flex-shrink-0 mt-0.5" weight="fill" />
                    <span className="text-green-100 text-sm leading-relaxed">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>

          {/* Application form */}
          <RevealOnScroll>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-7">
                <UserCirclePlus size={28} className="text-green-700" weight="fill" />
                <div>
                  <h3 className="font-display font-bold text-text-primary text-2xl tracking-tight">
                    Membership Application Form
                  </h3>
                  <p className="text-text-muted text-sm mt-0.5">Sections A (Personal) + B (Guarantor)</p>
                </div>
              </div>

              {memSent ? (
                <div className="p-8 rounded-card bg-green-50 border border-green-300">
                  <CheckCircle size={36} className="text-green-600 mb-4" weight="fill" />
                  <p className="font-display font-bold text-green-800 text-2xl mb-2">Application received.</p>
                  <p className="text-green-700 text-sm leading-relaxed">
                    Thank you for applying to join Elite Club of Aagba. Our membership secretary will review your application and contact you within 10 working days. Please keep an eye on your email inbox, including your spam folder.
                  </p>
                </div>
              ) : (
                <form onSubmit={submitMembership} className="space-y-10">
                  {/* ── Section A: Personal Details ── */}
                  <div>
                    <div
                      className="flex items-center justify-between cursor-pointer mb-6"
                      onClick={() => setMemStep(memStep === 1 ? 2 : 1)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-green-700 text-white text-sm font-bold flex items-center justify-center">A</span>
                        <h4 className="font-display font-bold text-text-primary text-lg">Personal Details</h4>
                      </div>
                      {memStep === 1 ? <CaretUp size={18} className="text-text-muted" /> : <CaretDown size={18} className="text-text-muted" />}
                    </div>

                    {memStep === 1 && (
                      <div className="space-y-5 pl-11">
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text-primary">Full Legal Name *</label>
                            <input required value={memForm.fullName} onChange={(e) => setMemForm({ ...memForm, fullName: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white" placeholder="As on your ID" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text-primary">Date of Birth *</label>
                            <input required type="date" value={memForm.dob} onChange={(e) => setMemForm({ ...memForm, dob: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text-primary">Gender *</label>
                            <select required value={memForm.gender} onChange={(e) => setMemForm({ ...memForm, gender: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 bg-white">
                              <option value="">Select</option>
                              {["Male", "Female", "Prefer not to say"].map((g) => <option key={g}>{g}</option>)}
                            </select>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text-primary">Membership Type *</label>
                            <select required value={memForm.membershipType} onChange={(e) => setMemForm({ ...memForm, membershipType: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 bg-white">
                              <option value="">Select type</option>
                              {MEMBERSHIP_TYPES.map((m) => <option key={m.name}>{m.name}</option>)}
                            </select>
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text-primary">State of Origin *</label>
                            <input required value={memForm.stateOfOrigin} onChange={(e) => setMemForm({ ...memForm, stateOfOrigin: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white" placeholder="e.g. Ogun" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text-primary">State of Residence *</label>
                            <input required value={memForm.stateOfResidence} onChange={(e) => setMemForm({ ...memForm, stateOfResidence: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white" placeholder="e.g. Lagos" />
                          </div>
                          <div className="sm:col-span-2 flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text-primary">Residential Address *</label>
                            <input required value={memForm.address} onChange={(e) => setMemForm({ ...memForm, address: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white" placeholder="Street, City, State" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text-primary">Phone Number *</label>
                            <input required type="tel" value={memForm.phone} onChange={(e) => setMemForm({ ...memForm, phone: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white" placeholder="+234 ..." />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text-primary">Email Address *</label>
                            <input required type="email" value={memForm.email} onChange={(e) => setMemForm({ ...memForm, email: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white" placeholder="you@example.com" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text-primary">Occupation</label>
                            <input value={memForm.occupation} onChange={(e) => setMemForm({ ...memForm, occupation: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white" placeholder="e.g. Teacher" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text-primary">Employer / Organisation</label>
                            <input value={memForm.employer} onChange={(e) => setMemForm({ ...memForm, employer: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white" placeholder="Organisation name" />
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-medium text-text-primary">Why do you want to join Elite Club of Aagba? *</label>
                          <textarea required rows={4} value={memForm.motivation} onChange={(e) => setMemForm({ ...memForm, motivation: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white resize-none" placeholder="Tell us about your interest and what you hope to contribute..." />
                        </div>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            required
                            checked={memForm.declaration}
                            onChange={(e) => setMemForm({ ...memForm, declaration: e.target.checked })}
                            className="mt-0.5 w-4 h-4 rounded accent-green-700 flex-shrink-0"
                          />
                          <span className="text-sm text-text-secondary leading-relaxed">
                            I declare that all information provided is true and accurate. I agree to abide by the constitution and code of conduct of Elite Club of Aagba and understand that providing false information will result in disqualification.
                          </span>
                        </label>
                        <button
                          type="button"
                          onClick={() => setMemStep(2)}
                          className="px-7 py-3 rounded-btn bg-green-700 text-white font-semibold text-sm hover:bg-green-600 transition-colors active:scale-[0.98]"
                        >
                          Continue to Guarantor Form →
                        </button>
                      </div>
                    )}
                  </div>

                  {/* ── Section B: Guarantor ── */}
                  <div>
                    <div
                      className="flex items-center justify-between cursor-pointer mb-6"
                      onClick={() => setMemStep(memStep === 2 ? 1 : 2)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-gold-500 text-green-900 text-sm font-bold flex items-center justify-center">B</span>
                        <h4 className="font-display font-bold text-text-primary text-lg">Guarantor Declaration</h4>
                      </div>
                      {memStep === 2 ? <CaretUp size={18} className="text-text-muted" /> : <CaretDown size={18} className="text-text-muted" />}
                    </div>

                    {memStep === 2 && (
                      <div className="space-y-5 pl-11">
                        <div className="p-4 rounded-btn bg-amber-50 border border-amber-200 text-amber-800 text-sm">
                          The guarantor must be an existing Club member in good standing, or a respected community figure known to the Club. By completing this section, the guarantor vouches for the applicant&apos;s character and suitability for membership.
                        </div>
                        <div className="grid sm:grid-cols-2 gap-5">
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text-primary">Guarantor Full Name *</label>
                            <input required value={guarantorForm.gName} onChange={(e) => setGuarantorForm({ ...guarantorForm, gName: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white" placeholder="Full name" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text-primary">Relationship to Applicant *</label>
                            <input required value={guarantorForm.gRelationship} onChange={(e) => setGuarantorForm({ ...guarantorForm, gRelationship: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white" placeholder="e.g. Club member, Community leader" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text-primary">Guarantor Phone *</label>
                            <input required type="tel" value={guarantorForm.gPhone} onChange={(e) => setGuarantorForm({ ...guarantorForm, gPhone: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white" placeholder="+234 ..." />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text-primary">Guarantor Email</label>
                            <input type="email" value={guarantorForm.gEmail} onChange={(e) => setGuarantorForm({ ...guarantorForm, gEmail: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white" placeholder="guarantor@example.com" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text-primary">Guarantor Occupation</label>
                            <input value={guarantorForm.gOccupation} onChange={(e) => setGuarantorForm({ ...guarantorForm, gOccupation: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white" placeholder="e.g. Business owner" />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text-primary">How long have you known the applicant? *</label>
                            <select required value={guarantorForm.gYearsKnown} onChange={(e) => setGuarantorForm({ ...guarantorForm, gYearsKnown: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 bg-white">
                              <option value="">Select</option>
                              {["Less than 1 year", "1–2 years", "3–5 years", "More than 5 years"].map((y) => <option key={y}>{y}</option>)}
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-sm font-medium text-text-primary">Guarantor&apos;s statement *</label>
                          <textarea required rows={4} value={guarantorForm.gStatement} onChange={(e) => setGuarantorForm({ ...guarantorForm, gStatement: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white resize-none" placeholder="Briefly describe why you are vouching for this applicant and their suitability for membership..." />
                        </div>
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            required
                            checked={guarantorForm.gDeclaration}
                            onChange={(e) => setGuarantorForm({ ...guarantorForm, gDeclaration: e.target.checked })}
                            className="mt-0.5 w-4 h-4 rounded accent-green-700 flex-shrink-0"
                          />
                          <span className="text-sm text-text-secondary leading-relaxed">
                            I, the guarantor, confirm that the information I have provided is true and accurate. I vouch for the character and suitability of the above-named applicant and understand that this guarantee may be revoked if the applicant is found to have misrepresented themselves.
                          </span>
                        </label>
                        <div className="flex flex-wrap gap-3">
                          <button
                            type="button"
                            onClick={() => setMemStep(1)}
                            className="px-6 py-3 rounded-btn border border-green-300 text-green-700 font-semibold text-sm hover:bg-green-50 transition-colors"
                          >
                            ← Back to Personal Details
                          </button>
                          <button
                            type="submit"
                            className="px-7 py-3 rounded-btn bg-green-700 text-white font-semibold text-sm hover:bg-green-600 transition-colors active:scale-[0.98]"
                          >
                            Submit Application
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ───────────────── VOLUNTEERING ───────────────── */}
      <section id="volunteer" className="py-24 bg-green-50 scroll-mt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <div className="mb-12">
              <div className="w-14 h-14 rounded-card bg-green-100 flex items-center justify-center mb-5">
                <UsersThree size={28} className="text-green-700" weight="fill" />
              </div>
              <h2 className="font-display font-bold text-text-primary text-2xl sm:text-3xl md:text-4xl tracking-tight mb-3">
                Volunteer with us
              </h2>
              <p className="text-text-secondary text-lg max-w-[52ch]">
                We have field, remote, and skills-based opportunities for individuals who want to contribute their time.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 gap-5 mb-16">
            {VOLUNTEER_NEEDS.map((role, i) => {
              const Icon = role.icon;
              return (
                <RevealOnScroll key={role.title} delay={i * 0.07}>
                  <div className="p-6 bg-white rounded-card border border-green-100 hover:border-green-300 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-btn bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Icon size={20} className="text-green-700" weight="fill" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                          <h3 className="font-display font-bold text-text-primary text-lg">{role.title}</h3>
                          <span className="px-2.5 py-0.5 rounded-pill bg-green-100 text-green-700 text-xs font-semibold">
                            {role.type}
                          </span>
                        </div>
                        <div className="flex gap-4 mb-3 text-text-muted text-xs">
                          <span>{role.location}</span>
                          <span>{role.duration}</span>
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed">{role.description}</p>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>

          {/* Volunteer Form */}
          <RevealOnScroll>
            <div className="max-w-2xl">
              <h3 className="font-display font-bold text-text-primary text-2xl tracking-tight mb-6">
                Register your interest
              </h3>
              {volSent ? (
                <div className="p-6 rounded-card bg-green-50 border border-green-300 text-green-800">
                  <p className="font-semibold text-lg mb-1">Thank you for registering.</p>
                  <p className="text-sm">Our HR team will review your details and be in touch within 5 working days.</p>
                </div>
              ) : (
                <form
                  className="space-y-5"
                  onSubmit={(e) => { e.preventDefault(); setVolSent(true); }}
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-text-primary">Full Name</label>
                      <input required value={volForm.name} onChange={(e) => setVolForm({ ...volForm, name: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white" placeholder="Your name" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-text-primary">Email Address</label>
                      <input required type="email" value={volForm.email} onChange={(e) => setVolForm({ ...volForm, email: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white" placeholder="you@example.com" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-text-primary">Phone Number</label>
                    <input type="tel" value={volForm.phone} onChange={(e) => setVolForm({ ...volForm, phone: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white" placeholder="+234 ..." />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-text-primary">Which role interests you?</label>
                    <select value={volForm.role} onChange={(e) => setVolForm({ ...volForm, role: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm text-text-primary focus:outline-none focus:border-green-600 bg-white">
                      <option value="">Select a role</option>
                      {VOLUNTEER_NEEDS.map((r) => <option key={r.title}>{r.title}</option>)}
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-text-primary">Tell us about yourself (optional)</label>
                    <textarea rows={4} value={volForm.message} onChange={(e) => setVolForm({ ...volForm, message: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white resize-none" placeholder="Relevant experience, availability, anything you'd like us to know..." />
                  </div>
                  <button type="submit" className="px-7 py-3 rounded-btn bg-green-700 text-white font-semibold text-sm hover:bg-green-600 transition-colors active:scale-[0.98]">
                    Submit Application
                  </button>
                </form>
              )}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ───────────────── PARTNERSHIP ───────────────── */}
      <section id="partnership" className="py-24 bg-surface scroll-mt-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <RevealOnScroll>
              <div className="w-14 h-14 rounded-card bg-green-700 flex items-center justify-center mb-5">
                <Handshake size={28} className="text-white" weight="fill" />
              </div>
              <h2 className="font-display font-bold text-text-primary text-2xl sm:text-3xl md:text-4xl tracking-tight mb-4">
                Partner with us
              </h2>
              <p className="text-text-secondary text-base leading-relaxed mb-6 max-w-[50ch]">
                We welcome formal partnerships with NGOs, government agencies, corporate foundations, and international development organisations who share our commitment to education and WASH in Nigeria.
              </p>
              <div className="space-y-4">
                {[
                  { title: "Co-funding partnerships", desc: "Joint funding bids to institutional donors" },
                  { title: "Technical partnerships", desc: "Specialist expertise in design, delivery, or evaluation" },
                  { title: "Referral partnerships", desc: "Coordinated beneficiary pathways across organisations" },
                  { title: "Corporate CSR partnerships", desc: "Employee volunteering and direct programme funding" },
                ].map(({ title, desc }) => (
                  <div key={title} className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-gold-500 mt-2 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-text-primary text-sm">{title}</p>
                      <p className="text-text-muted text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <div className="bg-white rounded-card border border-green-200 p-8">
                <h3 className="font-display font-bold text-text-primary text-2xl tracking-tight mb-6">
                  Partnership enquiry
                </h3>
                {partSent ? (
                  <div className="p-5 rounded-card bg-green-50 border border-green-300 text-green-800">
                    <p className="font-semibold mb-1">Enquiry received.</p>
                    <p className="text-sm">Our partnerships team will contact you within 5 working days.</p>
                  </div>
                ) : (
                  <form
                    className="space-y-5"
                    onSubmit={(e) => { e.preventDefault(); setPartSent(true); }}
                  >
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-text-primary">Organisation Name</label>
                      <input required value={partForm.org} onChange={(e) => setPartForm({ ...partForm, org: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white" placeholder="Your organisation" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-text-primary">Country</label>
                        <input required value={partForm.country} onChange={(e) => setPartForm({ ...partForm, country: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white" placeholder="Nigeria" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-text-primary">Contact Email</label>
                        <input required type="email" value={partForm.email} onChange={(e) => setPartForm({ ...partForm, email: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white" placeholder="you@org.com" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-text-primary">Proposed collaboration</label>
                      <textarea required rows={5} value={partForm.collaboration} onChange={(e) => setPartForm({ ...partForm, collaboration: e.target.value })} className="px-4 py-2.5 rounded-btn border border-green-200 text-sm focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white resize-none" placeholder="Describe what you have in mind..." />
                    </div>
                    <button type="submit" className="w-full py-3 rounded-btn bg-green-700 text-white font-semibold text-sm hover:bg-green-600 transition-colors active:scale-[0.98]">
                      Send Enquiry
                    </button>
                  </form>
                )}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
