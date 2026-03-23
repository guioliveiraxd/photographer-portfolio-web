const IMAGE_MODULES = import.meta.glob('/imgs/**/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
});

const CATEGORY_CONFIG = {
  casais: { id: 'casal', name: 'Casal', order: 0 },
  gravidas: { id: 'gravida', name: 'Gestante', order: 1 },
  'profissional-solo': { id: 'profissional', name: 'Profissional', order: 2 },
  'recem-nascidos': { id: 'recem-nascido', name: 'Recém-Nascido', order: 3 },
  valdir: { id: 'valdir', name: 'Imagens Especiais', order: 99 },
};


const HERO_LOOP_IMAGE_FILES = ['casamento-11.jpg', 'principal.jpg', 'casamento-19.jpg', 'casamento-25.jpg'];

function slugify(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function getCategoryConfig(rawName) {
  const key = slugify(rawName);
  const config = CATEGORY_CONFIG[key];

  if (config) {
    return config;
  }

  return {
    id: key,
    name: rawName,
    order: 50,
  };
}

function sortCategories(a, b) {
  if (a.order !== b.order) {
    return a.order - b.order;
  }

  return a.name.localeCompare(b.name, 'pt-BR');
}

export function getPortfolioData() {
  const grouped = new Map();
  const imagesByFileName = new Map();

  Object.entries(IMAGE_MODULES).forEach(([path, src]) => {
    const cleanPath = path.replace(/^\/imgs\//, '');
    const parts = cleanPath.split('/');

    if (parts.length < 2) return;

    const folderName = parts[0];
    const fileName = parts[parts.length - 1];
    const { id: categoryId, name: categoryName, order } = getCategoryConfig(folderName);

    if (!imagesByFileName.has(fileName)) {
      imagesByFileName.set(fileName, {
        src,
        fileName,
        alt: `${categoryName} - destaque`,
      });
    }

    if (!grouped.has(categoryId)) {
      grouped.set(categoryId, {
        id: categoryId,
        name: categoryName,
        order,
        rawName: folderName,
        images: [],
      });
    }

    const entry = grouped.get(categoryId);

    entry.images.push({
      id: `${categoryId}-${entry.images.length + 1}`,
      src,
      fileName,
      alt: `${categoryName} - ${entry.images.length + 1}`,
    });
  });

  const categories = Array.from(grouped.values())
    .map((category) => ({
      ...category,
      images: category.images.sort((a, b) => a.fileName.localeCompare(b.fileName, 'pt-BR', { numeric: true })),
    }))
    .sort(sortCategories)
    .filter((category) => category.id !== 'valdir');

  const allImages = categories.flatMap((category) => category.images.map((image) => ({ ...image, categoryId: category.id })));

  const heroSlides = HERO_LOOP_IMAGE_FILES.map((fileName, index) => {
    const image = imagesByFileName.get(fileName);
    if (!image) return null;
    return {
      ...image,
      id: `hero-custom-${index}`,
    };
  }).filter(Boolean);

  if (heroSlides.length === 0 && allImages.length > 0) {
    heroSlides.push(...allImages.slice(0, 2).map((image, index) => ({ ...image, id: `hero-fallback-${index}` })));
  }

  const aboutImages = Object.entries(IMAGE_MODULES)
    .filter(([path]) => path.includes('/imgs/valdir/'))
    .map(([, src]) => src);

  return {
    categories,
    heroSlides,
    totalImages: allImages.length,
    aboutImages,
  };
}

