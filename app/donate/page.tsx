"use client";

import { useState } from "react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { ShieldCheck, Lock, Bank, CreditCard, ArrowRight } from "@phosphor-icons/react";

const PRESETS = [
  { amount: 2000, label: "N2,000", impact: "Provides school supplies for one child for a term" },
  { amount: 5000, label: "N5,000", impact: "Vaccinates 10 children against preventable disease" },
  { amount: 10000, label: "N10,000", impact: "Funds one borehole pump repair in a rural community" },
];

export default function DonatePage() {
  const [selected, setSelected] = useState<number>(5000);
  const [custom, setCustom] = useState("");
  const [recurring, setRecurring] = useState(false);

  const effectiveAmount = custom ? Number(custom) : selected;

  return (
    <>
      <div className="pt-[72px] bg-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl md:text-6xl tracking-tight mb-4">
            Donate
          </h1>
          <p className="text-green-100 text-lg max-w-[48ch]">
            Your contribution funds real, measurable change in Education and WASH across Nigeria. Every naira counts.
          </p>
        </div>
      </div>

      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-start">
            <div>
              {/* One-time / Monthly toggle */}
              <div className="mb-8">
                <p className="font-display font-semibold text-text-primary text-lg mb-4">Donation frequency</p>
                <div className="flex rounded-btn border border-green-200 overflow-hidden w-full sm:w-fit">
                  <button
                    onClick={() => setRecurring(false)}
                    className={`flex-1 sm:flex-none px-6 py-2.5 text-sm font-semibold transition-colors ${
                      !recurring ? "bg-green-700 text-white" : "text-text-secondary hover:bg-green-50"
                    }`}
                  >
                    One-time
                  </button>
                  <button
                    onClick={() => setRecurring(true)}
                    className={`flex-1 sm:flex-none px-6 py-2.5 text-sm font-semibold transition-colors ${
                      recurring ? "bg-green-700 text-white" : "text-text-secondary hover:bg-green-50"
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Preset Amounts */}
              <div className="mb-6">
                <p className="font-display font-semibold text-text-primary text-lg mb-4">Choose an amount</p>
                <div className="grid sm:grid-cols-3 gap-4">
                  {PRESETS.map((p) => (
                    <button
                      key={p.amount}
                      onClick={() => { setSelected(p.amount); setCustom(""); }}
                      className={`p-5 rounded-card border-2 text-left transition-all duration-150 ${
                        selected === p.amount && !custom
                          ? "border-green-700 bg-green-50"
                          : "border-green-200 bg-white hover:border-green-400"
                      }`}
                    >
                      <p className={`font-display font-bold text-2xl mb-2 ${selected === p.amount && !custom ? "text-green-700" : "text-text-primary"}`}>
                        {p.label}
                      </p>
                      <p className="text-text-muted text-xs leading-snug">{p.impact}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div className="mb-10">
                <label className="block font-medium text-text-primary text-sm mb-2">
                  Or enter a custom amount (Naira)
                </label>
                <div className="relative w-full sm:max-w-xs">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted font-semibold">N</span>
                  <input
                    type="number"
                    min="100"
                    value={custom}
                    onChange={(e) => { setCustom(e.target.value); setSelected(0); }}
                    placeholder="e.g. 7500"
                    className="w-full pl-8 pr-4 py-3 rounded-btn border border-green-200 text-sm text-text-primary focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 bg-white"
                  />
                </div>
              </div>

              {/* Paystack CTA */}
              <div className="p-6 rounded-card bg-green-700 text-white mb-6">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <div>
                    <p className="text-green-200 text-sm">You are donating</p>
                    <p className="font-display font-bold text-3xl">
                      N{effectiveAmount ? effectiveAmount.toLocaleString() : "0"}
                    </p>
                    {recurring && <p className="text-green-200 text-sm mt-0.5">per month</p>}
                  </div>
                  <CreditCard size={36} className="text-gold-400" weight="duotone" />
                </div>
                <button className="w-full py-4 rounded-btn bg-gold-500 hover:bg-gold-400 text-green-900 font-bold text-base transition-colors active:scale-[0.99] flex items-center justify-center gap-2">
                  Pay with Paystack <ArrowRight size={18} weight="bold" />
                </button>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Lock size={14} className="text-green-300" />
                  <p className="text-green-300 text-xs">Secured and encrypted by Paystack. We never store your card details.</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-green-200" />
                <span className="text-text-muted text-xs">or pay by bank transfer</span>
                <div className="flex-1 h-px bg-green-200" />
              </div>

              {/* Bank Transfer */}
              <div className="p-6 rounded-card bg-white border border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <Bank size={22} className="text-green-700" weight="duotone" />
                  <p className="font-display font-semibold text-text-primary">Bank Transfer Details</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: "Bank", value: "[Bank Name]" },
                    { label: "Account Name", value: "Elite Club of Aagba" },
                    { label: "Account Number", value: "[0000000000]" },
                    { label: "Reference", value: "DONATION-[Your Name]" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-text-muted text-xs mb-0.5">{label}</p>
                      <p className="font-medium text-text-primary text-sm">{value}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-text-muted text-xs">
                  After transferring, please send your payment confirmation to donations@eliteclubaagba.org so we can send your receipt.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="p-6 rounded-card bg-green-50 border border-green-200">
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck size={22} className="text-green-700" weight="fill" />
                  <p className="font-display font-semibold text-text-primary">Your gift is safe</p>
                </div>
                <ul className="space-y-3">
                  {[
                    "Payments processed by Paystack - PCI DSS compliant",
                    "SSL-encrypted connection for all transactions",
                    "CAC-registered NGO with independently audited accounts",
                    "Receipts issued within 24 hours",
                  ].map((item) => (
                    <li key={item} className="flex gap-2.5 items-start text-text-secondary text-sm">
                      <ShieldCheck size={15} className="text-green-600 mt-0.5 flex-shrink-0" weight="fill" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 rounded-card bg-white border border-green-200">
                <p className="font-display font-semibold text-text-primary mb-4">What your gift funds</p>
                <div className="space-y-4">
                  {PRESETS.map((p) => (
                    <div key={p.amount} className="flex gap-3">
                      <span className="font-bold text-green-700 text-sm w-16 flex-shrink-0">{p.label}</span>
                      <span className="text-text-secondary text-sm">{p.impact}</span>
                    </div>
                  ))}
                  <div className="flex gap-3">
                    <span className="font-bold text-green-700 text-sm w-16 flex-shrink-0">N50,000</span>
                    <span className="text-text-secondary text-sm">Funds a full borehole for a remote community</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
