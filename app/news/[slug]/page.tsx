import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NEWS_ARTICLES } from "@/lib/data";
import { CalendarBlank, User, ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return NEWS_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = NEWS_ARTICLES.find((a) => a.slug === slug);
  return { title: article?.title ?? "Article" };
}

function ShareButton({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 rounded-btn border border-green-200 text-text-secondary text-sm font-medium hover:border-green-600 hover:text-green-700 transition-colors"
    >
      {label}
    </a>
  );
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = NEWS_ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = NEWS_ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <div className="pt-[72px]">
        <div className="relative aspect-[21/9] md:aspect-[21/7] bg-green-900 overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-950/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <span className="inline-block mb-4 px-3 py-1 rounded-pill bg-gold-500 text-green-900 text-xs font-bold">
                {article.category}
              </span>
              <h1 className="font-display font-bold text-white text-3xl md:text-5xl leading-tight">
                {article.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 mb-10 pb-6 border-b border-green-100 flex-wrap">
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <User size={16} />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <CalendarBlank size={16} />
              <span>{article.date}</span>
            </div>
          </div>

          <div className="prose prose-lg max-w-none space-y-6">
            {article.body.map((para, i) => (
              <p key={i} className="text-text-secondary text-lg leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-green-100">
            <p className="text-text-muted text-sm font-semibold mb-4">Share this article</p>
            <div className="flex flex-wrap gap-3">
              <ShareButton label="WhatsApp" href={`https://wa.me/?text=${encodeURIComponent(article.title)}`} />
              <ShareButton label="Twitter / X" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`} />
              <ShareButton label="Facebook" href={`https://facebook.com/sharer/sharer.php?u=#`} />
              <ShareButton label="LinkedIn" href={`https://linkedin.com/sharing/share-offsite/?url=#`} />
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-green-700 font-semibold text-sm hover:text-green-600 transition-colors"
            >
              <ArrowLeft size={16} weight="bold" />
              Back to all news
            </Link>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      <section className="py-16 bg-green-50 border-t border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display font-bold text-text-primary text-2xl tracking-tight mb-8">
            More from the field
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((a) => (
              <Link
                key={a.slug}
                href={`/news/${a.slug}`}
                className="group flex flex-col bg-white rounded-card border border-green-100 overflow-hidden hover:border-green-300 hover:shadow-md transition-all duration-200"
              >
                <div className="relative aspect-[16/9] bg-green-100 overflow-hidden">
                  <Image
                    src={a.image}
                    alt={a.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-400"
                    sizes="33vw"
                  />
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <p className="text-text-muted text-xs mb-2">{a.date}</p>
                  <h3 className="font-display font-bold text-text-primary text-base leading-snug mb-2 group-hover:text-green-700 transition-colors flex-1">
                    {a.title}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-green-700 text-xs font-semibold mt-2">
                    Read <ArrowRight size={12} weight="bold" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
