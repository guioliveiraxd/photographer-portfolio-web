import { SafeImage } from './SafeImage';

export default function GallerySection({ category, onOpenLightbox }) {
  const isVideoCategory = category.id === 'videos';

  return (
    <section id={`categoria-${category.id}`} className="scroll-mt-32 py-14 md:py-20" data-reveal>
      <div className="mx-auto w-[min(100%-1.5rem,1160px)]">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-gold">Categoria</p>
            <h2 className="mt-2 font-display text-4xl text-white md:text-5xl">{category.name}</h2>
          </div>
          <p className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/70">
            {category.images.length} {isVideoCategory ? `vídeo${category.images.length !== 1 ? 's' : ''}` : `foto${category.images.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {category.images.map((image) => (
            <button
              key={image.id}
              type="button"
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-soft"
              onClick={() => onOpenLightbox(category.id, image.id)}
            >
              {image.mediaType === 'video' ? (
                <>
                  <video
                    src={image.src}
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="metadata"
                    className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/55 px-2 py-1 text-xs font-semibold text-white ring-1 ring-white/30">
                    ▶ Vídeo
                  </span>
                </>
              ) : (
                <SafeImage
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
                />
              )}
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 to-transparent opacity-0 transition group-hover:opacity-100" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

