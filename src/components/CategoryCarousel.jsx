export default function CategoryCarousel({ categories, onOpenLightbox }) {
  return (
    <section className="relative w-full py-8 md:py-12">
      <div className="mx-auto w-[min(100%-1.5rem,1160px)] mb-6">
        <p className="text-xs uppercase tracking-[0.28em] text-gold">Galerias</p>
        <h2 className="mt-2 font-display text-4xl text-white md:text-5xl">Nossas Categorias</h2>
      </div>

      <div className="mx-auto w-[min(100%-1.5rem,1160px)] px-4 md:px-0">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {categories.map((category, index) => (
            <CategoryCard key={`${category.id}-${index}`} category={category} onOpenLightbox={onOpenLightbox} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category, onOpenLightbox }) {
  return (
    <div className="w-full group" role="group" aria-label={`Categoria: ${category.name}`}>
      <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 transition-all duration-300 hover:border-gold/50 h-full flex flex-col">
        <div className="relative h-56 md:h-72 overflow-hidden">
          <img
            src={category.images[0]?.src}
            alt={category.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute top-3 right-3 rounded-full bg-gold/90 px-3 py-1 backdrop-blur-sm">
            <span className="text-sm font-semibold text-black">{category.images.length}</span>
          </div>
        </div>

        <div className="p-4 md:p-6 flex flex-col flex-1">
          <h3 className="font-display text-2xl md:text-3xl text-white mb-2 group-hover:text-gold transition">
            {category.name}
          </h3>
          <p className="text-sm text-white/70 mb-4 flex-1">
            {category.images.length} foto{category.images.length !== 1 ? 's' : ''} neste portfólio
          </p>

          <div className="mb-4 grid grid-cols-4 gap-2 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
            {category.images.slice(0, 4).map((img, idx) => (
              <img
                key={idx}
                src={img.src}
                alt={`Preview ${idx + 1}`}
                loading="lazy"
                className="w-full h-12 object-cover rounded cursor-pointer hover:scale-110 transition"
                onClick={() => onOpenLightbox(category.id, img.id)}
                title="Clique para ver em tela cheia"
              />
            ))}
          </div>

          <button
            onClick={() => document.getElementById(`categoria-${category.id}`)?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full rounded-lg bg-gold/20 hover:bg-gold/30 border border-gold/50 px-4 py-2 text-sm font-semibold text-gold transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-gold"
          >
            Ver Galeria Completa →
          </button>
        </div>
      </div>
    </div>
  );
}

