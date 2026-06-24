import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RevealOnScroll from "@/components/ui/RevealOnScroll";
import { NEWS_ARTICLES } from "@/lib/data";
import { CalendarBlank, ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = { title: "News and Updates" };

const CATEGORIES = ["All", "Field Update", "Press Release", "Campaign Report"];

export default function NewsPage() {
  const featured = NEWS_ARTICLES.find((a) => a.featured);
  const rest = NEWS_ARTICLES.filter((a) => !a.featured);

  return (
    <>
      <div className="pt-[72px] bg-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl md:text-6xl tracking-tight mb-4">
            News and Updates
          </h1>
          <p className="text-green-100 text-lg">Field reports, press releases, and campaign updates.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-green-100 sticky top-[72px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex gap-2 overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`flex-shrink-0 px-4 py-1.5 rounded-pill text-sm font-semibold transition-colors ${
                cat === "All"
                  ? "bg-green-700 text-white"
                  : "bg-green-50 text-text-secondary hover:bg-green-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured */}
          {featured && (
            <RevealOnScroll>
              <Link
                href={`/news/${featured.slug}`}
                className="group grid lg:grid-cols-2 gap-8 mb-16 bg-white rounded-card border border-green-100 overflow-hidden hover:border-green-300 hover:shadow-lg hover:shadow-green-100 transition-all duration-300"
              >
                <div className="relative aspect-[16/9] lg:aspect-auto min-h-[280px] bg-green-100 overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-pill bg-gold-500 text-green-900 text-xs font-bold">
                    Featured
                  </span>
                </div>
                <div className="p-8 lg:p-10 flex flex-col justify-center">
                  <span className="inline-block mb-3 px-3 py-1 rounded-pill bg-green-100 text-green-700 text-xs font-semibold w-fit">
                    {featured.category}
                  </span>
                  <div className="flex items-center gap-2 text-text-muted text-xs mb-4">
                    <CalendarBlank size={13} />
                    {featured.date}
                  </div>
                  <h2 className="font-display font-bold text-text-primary text-2xl md:text-3xl leading-snug mb-4 group-hover:text-green-700 transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-text-secondary text-base leading-relaxed mb-6">{featured.excerpt}</p>
                  <span className="inline-flex items-center gap-1.5 text-green-700 font-semibold text-sm group-hover:gap-3 transition-all">
                    Read article <ArrowRight size={15} weight="bold" />
                  </span>
                </div>
              </Link>
            </RevealOnScroll>
          )}

          {/* Article Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((article, i) => (
              <RevealOnScroll key={article.slug} delay={i * 0.07}>
                <Link
                  href={`/news/${article.slug}`}
                  className="group flex flex-col bg-white rounded-card border border-green-100 overflow-hidden hover:border-green-300 hover:shadow-lg hover:shadow-green-100 transition-all duration-300"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-green-100">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-pill bg-green-700 text-white text-xs font-semibold">
                      {article.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-text-muted text-xs mb-3">
                      <CalendarBlank size={13} />
                      {article.date}
                    </div>
                    <h3 className="font-display font-bold text-text-primary text-lg leading-snug mb-3 group-hover:text-green-700 transition-colors flex-1">
                      {article.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">{article.excerpt}</p>
                    <span className="inline-flex items-center gap-1.5 text-green-700 text-sm font-semibold group-hover:gap-2.5 transition-all">
                      Read more <ArrowRight size={14} weight="bold" />
                    </span>
                  </div>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
