"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { X, WarningCircle } from "@phosphor-icons/react";

export default function Hero() {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [bannerText, setBannerText] = useState(
    "Emergency Appeal: Flooding in Benue State has displaced 800 families. Support our emergency response."
  );
  const reduce = useReducedMotion();

  useEffect(() => {
    const adminHidden = localStorage.getItem("eca_banner_hidden") === "true";
    const userDismissed = sessionStorage.getItem("eca_banner_dismissed") === "true";
    const savedText = localStorage.getItem("eca_banner_text");
    if (savedText) setBannerText(savedText);
    if (!adminHidden && !userDismissed) setBannerVisible(true);
  }, []);

  const dismiss = () => {
    setBannerVisible(false);
    sessionStorage.setItem("eca_banner_dismissed", "true");
  };

  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <>
      {bannerVisible && (
        <div className="fixed top-[72px] left-0 right-0 z-40 bg-gold-500 text-green-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center gap-3">
            <WarningCircle size={18} weight="fill" className="flex-shrink-0" />
            <p className="text-sm font-medium flex-1">
              {bannerText}{" "}
              <Link href="/donate" className="underline font-semibold hover:no-underline">
                Donate now
              </Link>
            </p>
            <button
              onClick={dismiss}
              className="p-1 rounded hover:bg-green-900/10 transition-colors"
              aria-label="Dismiss emergency banner"
            >
              <X size={18} weight="bold" />
            </button>
          </div>
        </div>
      )}

      <section
        className="relative min-h-[100dvh] flex items-center bg-green-800 overflow-hidden"
        style={{ paddingTop: bannerVisible ? 112 : 72 }}
      >
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/seed/nigeria-community-gathering-education/1400/900"
            alt="Community members gathering at an Elite Club of Aagba programme site"
            fill
            priority
            className="object-cover opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 via-green-800/80 to-green-800/20" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center py-14 sm:py-20">
            <div>
              <motion.p
                className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-6"
                {...fadeUp(0.1)}
              >
                Education and WASH in Nigeria
              </motion.p>

              <motion.h1
                className="font-display font-bold text-white text-3xl sm:text-4xl md:text-6xl leading-[1.05] tracking-tight mb-6"
                {...fadeUp(0.2)}
              >
                Building futures,
                <br />
                one community
                <br />
                <span className="text-gold-400">at a time.</span>
              </motion.h1>

              <motion.p
                className="text-green-100 text-lg leading-relaxed max-w-[46ch] mb-10"
                {...fadeUp(0.3)}
              >
                We reach underserved Nigerians with quality education and clean water, creating lasting change across eight states.
              </motion.p>

              <motion.div className="flex flex-wrap gap-4" {...fadeUp(0.4)}>
                <Link
                  href="/programmes"
                  className="inline-flex items-center px-7 py-3.5 rounded-btn bg-gold-500 hover:bg-gold-400 text-green-900 font-bold text-sm transition-colors duration-150 active:scale-[0.98]"
                >
                  Our Programmes
                </Link>
                <Link
                  href="/impact"
                  className="inline-flex items-center px-7 py-3.5 rounded-btn border border-white/30 hover:border-white/60 text-white font-semibold text-sm transition-colors duration-150 active:scale-[0.98]"
                >
                  See Our Impact
                </Link>
              </motion.div>
            </div>

            <motion.div
              className="hidden lg:block"
              {...(reduce
                ? {}
                : {
                    initial: { opacity: 0, scale: 0.96 },
                    animate: { opacity: 1, scale: 1 },
                    transition: { duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] },
                  })}
            >
              <div className="relative rounded-card overflow-hidden aspect-[4/5] max-h-[520px]">
                <Image
                  src="https://picsum.photos/seed/children-learning-nigeria-school/700/880"
                  alt="Children in a classroom supported by Elite Club of Aagba"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 0px, 50vw"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-green-900/90 to-transparent">
                  <p className="text-white font-display font-semibold text-lg">12,450+</p>
                  <p className="text-green-200 text-sm">beneficiaries reached since 2010</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
