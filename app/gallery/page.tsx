"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { X, ArrowLeft, ArrowRight, VideoCamera, Phone } from "@phosphor-icons/react";
import { GALLERY_CAMPAIGNS, VIDEOS } from "@/lib/data";

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<{ campaign: number; photo: number } | null>(null);
  const reduce = useReducedMotion();

  const openLightbox = (campaign: number, photo: number) => setLightbox({ campaign, photo });
  const closeLightbox = () => setLightbox(null);
  const prev = () => {
    if (!lightbox) return;
    const photos = GALLERY_CAMPAIGNS[lightbox.campaign].photos;
    setLightbox({ ...lightbox, photo: (lightbox.photo - 1 + photos.length) % photos.length });
  };
  const next = () => {
    if (!lightbox) return;
    const photos = GALLERY_CAMPAIGNS[lightbox.campaign].photos;
    setLightbox({ ...lightbox, photo: (lightbox.photo + 1) % photos.length });
  };

  const currentPhoto =
    lightbox ? GALLERY_CAMPAIGNS[lightbox.campaign].photos[lightbox.photo] : null;

  return (
    <>
      <div className="pt-[72px] bg-green-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl md:text-6xl tracking-tight mb-4">
            Media Gallery
          </h1>
          <p className="text-green-100 text-lg">Photos and videos from our programmes across Nigeria.</p>
        </div>
      </div>

      {/* Photo Galleries */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {GALLERY_CAMPAIGNS.map((campaign, ci) => (
            <div key={campaign.title} className="mb-16">
              <h2 className="font-display font-bold text-text-primary text-2xl tracking-tight mb-6">
                {campaign.title}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {campaign.photos.map((photo, pi) => (
                  <button
                    key={photo.seed}
                    className="relative aspect-square rounded-btn overflow-hidden bg-green-100 group cursor-zoom-in"
                    onClick={() => openLightbox(ci, pi)}
                    aria-label={`View photo: ${photo.caption}`}
                  >
                    <Image
                      src={`https://picsum.photos/seed/${photo.seed}/400/400`}
                      alt={photo.caption}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-400"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-green-900/0 group-hover:bg-green-900/30 transition-colors duration-200 flex items-end p-3">
                      <p className="text-white text-xs leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-left">
                        {photo.caption}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && currentPhoto && (
          <motion.div
            className="fixed inset-0 z-[80] bg-green-950/95 flex items-center justify-center p-4"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              onClick={closeLightbox}
              aria-label="Close"
            >
              <X size={24} weight="bold" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous"
            >
              <ArrowLeft size={22} weight="bold" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next"
            >
              <ArrowRight size={22} weight="bold" />
            </button>
            <div
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] rounded-card overflow-hidden bg-green-900">
                <Image
                  src={`https://picsum.photos/seed/${currentPhoto.seed}/1200/900`}
                  alt={currentPhoto.caption}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
              <p className="text-green-200 text-sm mt-4 text-center">{currentPhoto.caption}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Library */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10">
            <VideoCamera size={28} className="text-green-700" weight="fill" />
            <h2 className="font-display font-bold text-text-primary text-3xl tracking-tight">
              Video Library
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {VIDEOS.map((video) => (
              <div key={video.title} className="bg-white rounded-card border border-green-100 overflow-hidden">
                <div className="relative aspect-video bg-green-900">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
                <div className="p-5">
                  <span className="px-2 py-0.5 rounded-pill bg-green-100 text-green-700 text-xs font-semibold mb-2 inline-block">
                    {video.theme}
                  </span>
                  <p className="font-display font-bold text-text-primary text-base">{video.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Officer */}
      <section className="py-16 bg-surface border-t border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 flex-wrap">
            <div>
              <p className="text-text-muted text-sm font-semibold mb-1">Media enquiries</p>
              <p className="font-display font-bold text-text-primary text-xl">[Media Officer Name]</p>
              <p className="text-text-secondary text-sm">Communications and Partnerships Lead</p>
            </div>
            <div className="flex gap-4 flex-wrap">
              <a
                href="mailto:media@eliteclubaagba.org"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-btn border border-green-300 text-green-700 font-semibold text-sm hover:bg-green-700 hover:text-white hover:border-green-700 transition-colors"
              >
                media@eliteclubaagba.org
              </a>
              <a
                href="tel:+2348000000001"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-btn border border-green-300 text-green-700 font-semibold text-sm hover:bg-green-700 hover:text-white hover:border-green-700 transition-colors"
              >
                <Phone size={16} weight="bold" />
                Direct line
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
