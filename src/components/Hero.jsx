import { useEffect, useMemo, useState } from 'react';
import { SafeImage } from './SafeImage';

const HERO_DELAY = 2000;

export default function Hero({ slides }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const safeSlides = useMemo(() => (slides && slides.length > 0 ? slides : []), [slides]);

  useEffect(() => {
    setActiveIndex(0);
  }, [safeSlides.length]);

  useEffect(() => {
    if (safeSlides.length <= 1) return undefined;

    const id = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % safeSlides.length);
    }, HERO_DELAY);

    return () => window.clearTimeout(id);
  }, [activeIndex, safeSlides.length]);

  if (safeSlides.length === 0) {
    return (
      <section id="home" className="relative isolate min-h-[86vh] overflow-hidden border-b border-white/10 pt-24 bg-stone">
        <div className="relative mx-auto flex w-[min(100%-1.5rem,1160px)] min-h-[78vh] flex-col justify-end pb-14">
          <p className="mb-2 text-xs uppercase tracking-[0.32em] text-gold">Fotografia Premium</p>
          <h1 className="max-w-3xl font-display text-5xl leading-[0.95] text-white md:text-7xl">Fotógrafo - Valdir Silva.</h1>
          <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
            Ensaios com direção visual elegante para casais, gestantes, recém-nascidos e retratos profissionais.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#categoria-casal" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5">
              Ver portfólio
            </a>
            <a href="#contato" className="rounded-full border border-white/45 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white hover:text-white">
              Entrar em contato
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="relative isolate min-h-[86vh] overflow-hidden border-b border-white/10 pt-24">
      <div className="absolute inset-0">
        {safeSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 will-change-opacity transition-opacity duration-700 ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Camada de preenchimento para telas largas */}
            <SafeImage
              src={slide.src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover scale-110 blur-lg opacity-45"
              loading="eager"
            />
            {/* Imagem principal sem esticar demais */}
            <SafeImage
              src={slide.src}
              alt={slide.alt}
              className="absolute inset-0 h-full w-full object-contain"
              loading="eager"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-black/35" />
      </div>

      <div className="relative mx-auto flex w-[min(100%-1.5rem,1160px)] min-h-[78vh] flex-col justify-end pb-14" data-reveal>
        <p className="mb-2 text-xs uppercase tracking-[0.32em] text-gold">Fotografia Premium</p>
        <h1 className="max-w-3xl font-display text-5xl leading-[0.95] text-white md:text-7xl">Fotógrafo - Valdir Silva.</h1>
        <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">
          Ensaios com direção visual elegante para casais, gestantes, recém-nascidos e retratos profissionais.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#categoria-casal" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5">
            Ver portfólio
          </a>
          <a href="#contato" className="rounded-full border border-white/45 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white hover:text-white">
            Entrar em contato
          </a>
        </div>
      </div>
    </section>
  );
}

