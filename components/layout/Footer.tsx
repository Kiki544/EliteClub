import Image from "next/image";
import Link from "next/link";
import {
  FacebookLogo,
  TwitterLogo,
  InstagramLogo,
  LinkedinLogo,
  WhatsappLogo,
  EnvelopeSimple,
  Phone,
} from "@phosphor-icons/react/dist/ssr";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white shadow-sm">
                <Image
                  src="/logo.png"
                  alt="Elite Club of Aagba logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-display font-bold text-white leading-tight">Elite Club of Aagba</p>
                <p className="text-green-200 text-xs">Empowering Communities</p>
              </div>
            </div>
            <p className="text-green-200 text-sm leading-relaxed mt-4 max-w-[260px]">
              A Nigerian NGO delivering Education and WASH programmes to underserved communities across eight states.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { Icon: FacebookLogo, label: "Facebook", href: "#" },
                { Icon: TwitterLogo, label: "Twitter", href: "#" },
                { Icon: InstagramLogo, label: "Instagram", href: "#" },
                { Icon: LinkedinLogo, label: "LinkedIn", href: "#" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-gold-500 hover:text-green-900 flex items-center justify-center transition-colors duration-150"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-display font-semibold text-white mb-5">Quick Links</p>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/team", label: "Our Team" },
                { href: "/impact", label: "Impact and Results" },
                { href: "/publications", label: "Publications" },
                { href: "/gallery", label: "Media Gallery" },
                { href: "/contact", label: "Contact Us" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-green-200 hover:text-gold-400 text-sm transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display font-semibold text-white mb-5">Our Programmes</p>
            <ul className="space-y-3">
              {[
                { href: "/programmes/education", label: "Education" },
                { href: "/programmes/wash", label: "WASH" },
                { href: "/presence", label: "Where We Work" },
                { href: "/get-involved", label: "Volunteer" },
                { href: "/get-involved#partnership", label: "Partner With Us" },
                { href: "/donate", label: "Donate" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-green-200 hover:text-gold-400 text-sm transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display font-semibold text-white mb-5">Contact</p>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <EnvelopeSimple size={18} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:info@eliteclubaagba.org"
                  className="text-green-200 hover:text-white text-sm transition-colors"
                >
                  info@eliteclubaagba.org
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <Phone size={18} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <a
                  href="tel:+2348000000000"
                  className="text-green-200 hover:text-white text-sm transition-colors"
                >
                  +234 (0) 800 000 0000
                </a>
              </li>
              <li className="flex gap-3 items-start">
                <WhatsappLogo size={18} className="text-gold-400 mt-0.5 flex-shrink-0" />
                <a
                  href="https://wa.me/2348000000000"
                  className="text-green-200 hover:text-white text-sm transition-colors"
                >
                  WhatsApp Business
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-card bg-white/5 border border-white/10">
              <p className="text-xs text-green-200 leading-relaxed">
                <span className="text-gold-400 font-semibold">Safeguarding:</span> For confidential complaints and concerns, contact{" "}
                <a href="mailto:safeguarding@eliteclubaagba.org" className="underline hover:text-white">
                  safeguarding@eliteclubaagba.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-green-300 text-xs">
            &copy; {new Date().getFullYear()} Elite Club of Aagba. Registered NGO [Reg. No. CAC/IT/XXXXX].
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-green-300 hover:text-white text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-green-300 hover:text-white text-xs transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
