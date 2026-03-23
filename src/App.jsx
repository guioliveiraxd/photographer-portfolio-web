import { useEffect, useMemo, useState } from 'react';
import Footer from './components/Footer';
import GallerySection from './components/GallerySection';
import Hero from './components/Hero';
import Lightbox from './components/Lightbox';
import Navbar from './components/Navbar';
import { SafeImage } from './components/SafeImage';
import ContactForm from './components/ContactForm';
import CategoryCarousel from './components/CategoryCarousel';
import { useActiveSection } from './hooks/useActiveSection';
import { useHashNavigation } from './hooks/useHashNavigation';
import { useRevealOnScroll } from './hooks/useRevealOnScroll';
import { getPortfolioData } from './utils/galleryData';

const portfolio = getPortfolioData();
const contactPhone = import.meta.env.VITE_CONTACT_PHONE || '+55 19 98175-1061';
const ABOUT_DELAY = 3000;

export default function App() {
  const { categories, heroSlides, totalImages, aboutImages } = portfolio;
  const aboutSlides = useMemo(
    () => (aboutImages.length > 0 ? aboutImages : heroSlides.map((slide) => slide.src)),
    [aboutImages, heroSlides]
  );

  const sectionIds = useMemo(
    () => ['home', ...categories.map((category) => `categoria-${category.id}`), 'sobre', 'contato'],
    [categories]
  );

  const activeSection = useActiveSection(sectionIds);
  useHashNavigation();
  useRevealOnScroll();

  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    categoryId: null,
    imageIndex: 0,
  });
  const [aboutActiveIndex, setAboutActiveIndex] = useState(0);

  useEffect(() => {
    setAboutActiveIndex(0);
  }, [aboutSlides.length]);

  useEffect(() => {
    if (aboutSlides.length <= 1) return undefined;

    const id = window.setTimeout(() => {
      setAboutActiveIndex((current) => (current + 1) % aboutSlides.length);
    }, ABOUT_DELAY);

    return () => window.clearTimeout(id);
  }, [aboutActiveIndex, aboutSlides.length]);

  const currentCategory = categories.find((category) => category.id === lightboxState.categoryId) || null;
  const currentImage = currentCategory?.images[lightboxState.imageIndex] || null;

  function openLightbox(categoryId, imageId) {
    const category = categories.find((item) => item.id === categoryId);
    if (!category) return;

    const imageIndex = category.images.findIndex((image) => image.id === imageId);
    if (imageIndex === -1) return;

    setLightboxState({
      isOpen: true,
      categoryId,
      imageIndex,
    });
  }

  function closeLightbox() {
    setLightboxState((state) => ({ ...state, isOpen: false }));
  }

  function goNext() {
    if (!currentCategory) return;
    setLightboxState((state) => ({
      ...state,
      imageIndex: (state.imageIndex + 1) % currentCategory.images.length,
    }));
  }

  function goPrev() {
    if (!currentCategory) return;
    setLightboxState((state) => ({
      ...state,
      imageIndex: (state.imageIndex - 1 + currentCategory.images.length) % currentCategory.images.length,
    }));
  }

  return (
    <div className="min-h-screen bg-ink text-white">
      <Navbar categories={categories} activeSection={activeSection} />

      <main>
        <Hero slides={heroSlides} />

        {/* Carrossel de Categorias */}
        <CategoryCarousel categories={categories} onOpenLightbox={openLightbox} />

        {/* Galerias completas por categoria */}
        {categories.map((category) => (
          <GallerySection key={category.id} category={category} onOpenLightbox={openLightbox} />
        ))}

        {/* Seção Sobre com looping de imagens */}
        <section id="sobre" className="scroll-mt-28 relative overflow-hidden py-24 md:py-32" data-reveal>
          {/* Background em loop com fade */}
          <div className="absolute inset-0 -z-10">
            {aboutSlides.map((src, index) => (
              <SafeImage
                key={`about-slide-${index}`}
                src={src}
                alt="Sobre - Fotografia"
                loading="eager"
                decoding="async"
                className={`absolute inset-0 will-change-opacity transition-opacity duration-700 ${
                  index === aboutActiveIndex ? 'opacity-100' : 'opacity-0'
                } w-full h-full object-cover blur-[1.5px]`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-r from-white/18 via-zinc-300/14 to-zinc-600/20" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/52 via-black/34 to-black/60" />
          </div>

          {/* Conteúdo */}
          <div className="relative mx-auto w-[min(100%-1.5rem,1160px)]">
            <div className="max-w-2xl [text-shadow:0_2px_12px_rgba(0,0,0,0.8)]">
              <p className="text-xs uppercase tracking-[0.28em] text-gold mb-4 font-semibold">Sobre</p>
              
              <h2 className="font-display text-4xl md:text-6xl leading-tight mb-8 font-semibold">
                Cada clique conta 
                <span className="text-gold"> uma história</span>
              </h2>
              
              <div className="space-y-6 text-white/95 font-semibold">
                <p className="text-lg md:text-xl leading-relaxed">
                  Não é apenas fotografia. É sobre capturar aquele olhar, aquele sorriso genuíno, a emoção que não pode ser encenada.
                </p>

                <p className="text-base md:text-lg leading-relaxed">
                  Trabalho com a premissa de que <span className="text-gold font-semibold">momentos autênticos são efêmeros</span>. Eles passam em frações de segundo.
                  Meu compromisso é estar atento àqueles segundos, àqueles detalhes que definem o caráter de uma sessão -
                  um toque de mão, a luz natural caindo no rosto, aquela risada que não foi forçada.
                </p>

                <p className="text-base md:text-lg leading-relaxed">
                  Direcionamento estético, luz natural e composição cuidadosa não são fins em si.
                  São meios para <span className="font-semibold">honrar os sentimentos reais</span> do casal, da gestante, do profissional diante da câmera.
                </p>

                <p className="text-sm md:text-base leading-relaxed text-white/90 italic mt-8">
                  "A melhor câmera é aquela que está com você." Mas a melhor fotografia é aquela que faz você lembrar
                  <span className="text-gold font-semibold"> exatamente</span> o que sentiu naquele exato momento.
                </p>
              </div>

              {/* CTA */}
              <div className="mt-12 flex flex-wrap gap-4">
                <a 
                  href="#categoria-casal" 
                  className="rounded-full bg-gold px-8 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Ver Portfólio Completo
                </a>
                <a 
                  href="#contato" 
                  className="rounded-full border border-gold/50 px-8 py-3 text-sm font-semibold text-white transition hover:border-gold hover:bg-gold/10"
                >
                  Conversar sobre sua sessão
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className="scroll-mt-28 py-16" data-reveal>
          <div className="mx-auto flex w-[min(100%-1.5rem,800px)] flex-col items-center text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-gold">Contato</p>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Vamos criar algo memorável.</h2>
            <p className="mt-5 text-white/75 mb-10">Disponível para ensaios, coberturas e projetos visuais personalizados.</p>
            
            <ContactForm phone={contactPhone} />
          </div>
        </section>
      </main>

      <Footer totalImages={totalImages} />

      <Lightbox isOpen={lightboxState.isOpen} image={currentImage} onClose={closeLightbox} onNext={goNext} onPrev={goPrev} />
    </div>
  );
}

