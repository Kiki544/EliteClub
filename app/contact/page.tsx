"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import {
  EnvelopeSimple,
  Phone,
  WhatsappLogo,
  FacebookLogo,
  TwitterLogo,
  InstagramLogo,
  LinkedinLogo,
  Warning,
} from "@phosphor-icons/react";

const ENQUIRY_TYPES = [
  "General Enquiry",
  "Donation and Giving",
  "Media and Press",
  "Volunteering",
  "Partnership",
  "Safeguarding Concern",
  "Complaint",
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <>
      <div className="pt-[72px] bg-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl md:text-6xl tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-green-100 text-lg max-w-[50ch]">
            We read every message and respond within three working days.
          </p>
        </div>
      </div>

      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-16">
            {/* Form */}
            <div>
              <RevealOnScroll>
                <h2 className="font-display font-bold text-text-primary text-3xl tracking-tight mb-8">
                  Send us a message
                </h2>
              </RevealOnScroll>
              {sent ? (
                <div className="p-8 rounded-card bg-green-50 border border-green-300">
                  <p className="font-display font-bold text-green-800 text-2xl mb-2">Message received.</p>
                  <p className="text-green-700 text-base">
                    Thank you for getting in touch. We will respond within three working days. If your matter is urgent, please call or WhatsApp us directly.
                  </p>
                </div>
              ) : (
                <form
                  className="space-y-6"
                  onSubmit={(e) => { e.preventDefault(); setSent(true); }}
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-text-primary">Full Name</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="px-4 py-3 rounded-btn border border-green-200 text-sm text-text-primary focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-text-primary">Email Address</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="px-4 py-3 rounded-btn border border-green-200 text-sm text-text-primary focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-text-primary">What is your enquiry about?</label>
                    <select
                      required
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="px-4 py-3 rounded-btn border border-green-200 text-sm text-text-primary focus:outline-none focus:border-green-600 bg-white"
                    >
                      <option value="">Select an enquiry type</option>
                      {ENQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-text-primary">Your message</label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="px-4 py-3 rounded-btn border border-green-200 text-sm text-text-primary focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-btn bg-green-700 text-white font-semibold text-sm hover:bg-green-600 transition-colors active:scale-[0.98]"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <RevealOnScroll delay={0.1}>
                <div className="p-6 bg-white rounded-card border border-green-200 space-y-5">
                  <h3 className="font-display font-semibold text-text-primary text-lg mb-1">Direct contacts</h3>
                  <div className="flex gap-3 items-start">
                    <EnvelopeSimple size={20} className="text-green-600 mt-0.5 flex-shrink-0" weight="fill" />
                    <div>
                      <p className="text-xs text-text-muted mb-0.5">General enquiries</p>
                      <a href="mailto:info@eliteclubaagba.org" className="text-sm font-medium text-green-700 hover:text-green-600 transition-colors">
                        info@eliteclubaagba.org
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <EnvelopeSimple size={20} className="text-green-600 mt-0.5 flex-shrink-0" weight="fill" />
                    <div>
                      <p className="text-xs text-text-muted mb-0.5">Donations</p>
                      <a href="mailto:donations@eliteclubaagba.org" className="text-sm font-medium text-green-700 hover:text-green-600 transition-colors">
                        donations@eliteclubaagba.org
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <EnvelopeSimple size={20} className="text-green-600 mt-0.5 flex-shrink-0" weight="fill" />
                    <div>
                      <p className="text-xs text-text-muted mb-0.5">Media and press</p>
                      <a href="mailto:media@eliteclubaagba.org" className="text-sm font-medium text-green-700 hover:text-green-600 transition-colors">
                        media@eliteclubaagba.org
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <Phone size={20} className="text-green-600 mt-0.5 flex-shrink-0" weight="fill" />
                    <div>
                      <p className="text-xs text-text-muted mb-0.5">Office phone</p>
                      <a href="tel:+2348000000000" className="text-sm font-medium text-green-700 hover:text-green-600 transition-colors">
                        +234 (0) 800 000 0000
                      </a>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-green-100">
                    <a
                      href="https://wa.me/2348000000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-3 rounded-btn bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1ebe5d] transition-colors"
                    >
                      <WhatsappLogo size={20} weight="fill" />
                      Chat on WhatsApp Business
                    </a>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.15}>
                <div className="p-6 bg-white rounded-card border border-green-200">
                  <h3 className="font-display font-semibold text-text-primary text-lg mb-4">Follow us</h3>
                  <div className="space-y-3">
                    {[
                      { icon: FacebookLogo, label: "Facebook", handle: "@EliteClubAagba" },
                      { icon: TwitterLogo, label: "Twitter / X", handle: "@EliteClubAagba" },
                      { icon: InstagramLogo, label: "Instagram", handle: "@EliteClubAagba" },
                      { icon: LinkedinLogo, label: "LinkedIn", handle: "Elite Club of Aagba" },
                    ].map(({ icon: Icon, label, handle }) => (
                      <a
                        key={label}
                        href="#"
                        className="flex items-center gap-3 text-text-secondary hover:text-green-700 transition-colors"
                      >
                        <Icon size={20} className="text-green-600 flex-shrink-0" />
                        <div>
                          <span className="text-xs text-text-muted">{label}</span>
                          <span className="block text-sm font-medium">{handle}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </RevealOnScroll>

              {/* Safeguarding */}
              <RevealOnScroll delay={0.2}>
                <div className="p-6 rounded-card bg-red-50 border border-red-200">
                  <div className="flex items-start gap-3">
                    <Warning size={22} className="text-red-600 flex-shrink-0 mt-0.5" weight="fill" />
                    <div>
                      <p className="font-display font-bold text-red-800 text-base mb-2">
                        Safeguarding and Complaints
                      </p>
                      <p className="text-red-700 text-xs leading-relaxed mb-3">
                        For confidential safeguarding concerns, allegations of misconduct, or formal complaints, contact our dedicated safeguarding channel. All reports are treated in strict confidence.
                      </p>
                      <a
                        href="mailto:safeguarding@eliteclubaagba.org"
                        className="text-sm font-semibold text-red-700 hover:text-red-600 underline transition-colors"
                      >
                        safeguarding@eliteclubaagba.org
                      </a>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
