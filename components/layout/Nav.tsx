"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { List, X, CaretDown, House } from "@phosphor-icons/react";

type NavChild = { href: string; label: string };
type NavGroup = { label: string; href: string; children?: NavChild[] };

const NAV_GROUPS: NavGroup[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { href: "/about", label: "About Us" },
      { href: "/team", label: "Our Team" },
      { href: "/members", label: "Members" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    label: "Programmes",
    href: "/programmes",
    children: [
      { href: "/programmes", label: "All Programmes" },
      { href: "/presence", label: "Where We Work" },
    ],
  },
  { label: "Impact", href: "/impact" },
  {
    label: "News & Media",
    href: "/news",
    children: [
      { href: "/news", label: "News & Updates" },
      { href: "/gallery", label: "Media Gallery" },
      { href: "/publications", label: "Publications" },
    ],
  },
  { label: "Get Involved", href: "/get-involved" },
];

// Flat list for mobile menu
const MOBILE_LINKS: NavChild[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/team", label: "Our Team" },
  { href: "/members", label: "Members" },
  { href: "/programmes", label: "All Programmes" },
  { href: "/presence", label: "Where We Work" },
  { href: "/impact", label: "Impact & Results" },
  { href: "/news", label: "News & Updates" },
  { href: "/gallery", label: "Media Gallery" },
  { href: "/publications", label: "Publications" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/contact", label: "Contact Us" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close dropdown on route change
  useEffect(() => { setOpenGroup(null); setOpen(false); }, [pathname]);

  const navBase =
    isHome && !scrolled
      ? "bg-transparent"
      : "bg-green-700 shadow-lg shadow-green-950/20";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${navBase}`}
        style={{ height: 72 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Elite Club of Aagba - Home"
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white shadow-sm">
              <Image
                src="/logo.png"
                alt="Elite Club of Aagba logo"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-display font-bold text-white text-base hidden sm:block leading-tight">
              Elite Club<br />
              <span className="text-gold-400 text-xs font-semibold tracking-wide">of Aagba</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul ref={dropdownRef} className="hidden lg:flex items-center gap-0.5">
            {/* Home */}
            <li>
              <Link
                href="/"
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-btn text-sm font-medium transition-colors duration-150 ${
                  pathname === "/"
                    ? "bg-white/15 text-white"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                aria-label="Home"
              >
                <House size={16} weight={pathname === "/" ? "fill" : "regular"} />
                Home
              </Link>
            </li>

            {NAV_GROUPS.map((group) => {
              const isActive =
                pathname === group.href ||
                (group.children?.some((c) => pathname.startsWith(c.href) && c.href !== "/"));
              const isOpen = openGroup === group.label;

              if (!group.children) {
                return (
                  <li key={group.href}>
                    <Link
                      href={group.href}
                      className={`px-3.5 py-2 rounded-btn text-sm font-medium transition-colors duration-150 ${
                        isActive
                          ? "bg-white/15 text-white"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {group.label}
                    </Link>
                  </li>
                );
              }

              return (
                <li key={group.label} className="relative">
                  <button
                    onClick={() => setOpenGroup(isOpen ? null : group.label)}
                    className={`flex items-center gap-1 px-3.5 py-2 rounded-btn text-sm font-medium transition-colors duration-150 ${
                      isActive || isOpen
                        ? "bg-white/15 text-white"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                    aria-expanded={isOpen}
                  >
                    {group.label}
                    <CaretDown
                      size={12}
                      weight="bold"
                      className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        className="absolute top-full left-0 mt-1.5 w-48 bg-white rounded-card shadow-lg shadow-green-950/15 border border-green-100 overflow-hidden z-10"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.15 }}
                      >
                        {group.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpenGroup(null)}
                            className={`block px-4 py-3 text-sm transition-colors duration-100 ${
                              pathname === child.href
                                ? "bg-green-50 text-green-800 font-semibold"
                                : "text-text-secondary hover:bg-green-50 hover:text-green-800"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/donate"
              className="hidden sm:inline-flex items-center px-5 py-2 rounded-btn bg-gold-500 hover:bg-gold-400 text-green-900 font-semibold text-sm transition-colors duration-150 active:scale-[0.98]"
            >
              Donate
            </Link>
            <button
              className="lg:hidden text-white p-2 rounded-btn hover:bg-white/10 transition-colors"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <List size={24} weight="bold" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] bg-green-900 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <span className="font-display font-bold text-white text-lg">Menu</span>
              <button
                className="text-white p-2 rounded-btn hover:bg-white/10"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} weight="bold" />
              </button>
            </div>

            <ul className="flex flex-col px-4 py-4 gap-0.5 flex-1 overflow-y-auto">
              {MOBILE_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-btn font-medium text-base transition-colors ${
                        isActive
                          ? "bg-white/15 text-white"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {link.href === "/" && <House size={18} weight="fill" className="text-gold-400 flex-shrink-0" />}
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="px-4 pb-10 pt-2 border-t border-white/10">
              <Link
                href="/donate"
                onClick={() => setOpen(false)}
                className="block w-full text-center py-4 rounded-btn bg-gold-500 text-green-900 font-bold text-lg"
              >
                Donate Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
