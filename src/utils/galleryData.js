const MEDIA_MODULES = import.meta.glob('../../imgs/**/*.{jpg,jpeg,png,webp,avif,gif,mp4,webm,mov,m4v}', {
  eager: true,
  import: 'default',
});

const VIDEO_EXTENSIONS = new Set(['mp4', 'webm', 'mov', 'm4v']);

const CATEGORY_CONFIG = {
  casais: { id: 'casal', name: 'Casal', order: 0 },
  gravidas: { id: 'gravida', name: 'Gestante', order: 1 },
  'profissional-solo': { id: 'profissional', name: 'Profissional', order: 2 },
  'recem-nascidos': { id: 'recem-nascido', name: 'Recém-Nascido', order: 3 },
  videos: { id: 'videos', name: 'Vídeos', order: 4 },
  valdir: { id: 'valdir', name: 'Imagens Especiais', order: 99 },
};


const HERO_LOOP_IMAGE_FILES = [
  'Casais/casamento-11.jpg',
  'valdir/principal.jpg',
  'Casais/casamento-19.jpg',
  'Casais/casamento-25.jpg',
];
const HERO_SPLIT_GIF_FILES = {
  left: 'valdir/hero-left.gif',
  right: 'valdir/hero-right.gif',
  durationMs: 5500,
};

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
  const mediaByRelativePath = new Map();

  Object.entries(MEDIA_MODULES).forEach(([path, src]) => {
    if (!src) return;

    const match = path.replace(/\\/g, '/').match(/(?:^|\/)imgs\/(.+)$/);
    if (!match) return;

    const cleanPath = match[1];
    const parts = cleanPath.split('/');

    if (parts.length < 2) return;

    const folderName = parts[0];
    const fileName = parts[parts.length - 1];
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    const mediaType = VIDEO_EXTENSIONS.has(extension) ? 'video' : 'image';
    const { id: categoryId, name: categoryName, order } = getCategoryConfig(folderName);

    if (!mediaByRelativePath.has(cleanPath)) {
      mediaByRelativePath.set(cleanPath, {
        src,
        relativePath: cleanPath,
        fileName,
        mediaType,
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
      mediaType,
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

  const heroSlides = HERO_LOOP_IMAGE_FILES.map((relativePath, index) => {
    const image = mediaByRelativePath.get(relativePath) || null;
    if (!image) return null;
    return {
      ...image,
      id: `hero-custom-${index}`,
      kind: 'single',
    };
  }).filter(Boolean);

  const leftGif = mediaByRelativePath.get(HERO_SPLIT_GIF_FILES.left);
  const rightGif = mediaByRelativePath.get(HERO_SPLIT_GIF_FILES.right);

  if (leftGif && rightGif) {
    heroSlides.splice(1, 0, {
      id: 'hero-split-gifs',
      kind: 'split',
      durationMs: HERO_SPLIT_GIF_FILES.durationMs,
      alt: 'Destaques em GIF',
      left: {
        src: leftGif.src,
        alt: 'GIF esquerdo',
      },
      right: {
        src: rightGif.src,
        alt: 'GIF direito',
      },
    });
  }

  if (heroSlides.length === 0 && allImages.length > 0) {
    heroSlides.push(
      ...allImages.slice(0, 2).map((image, index) => ({
        ...image,
        id: `hero-fallback-${index}`,
        kind: 'single',
      }))
    );
  }

  const aboutImages = Object.entries(MEDIA_MODULES)
    .filter(([path]) => path.includes('/imgs/valdir/') && !VIDEO_EXTENSIONS.has(path.split('.').pop()?.toLowerCase() || ''))
    .map(([, src]) => src);

  return {
    categories,
    heroSlides,
    totalImages: allImages.length,
    aboutImages,
  };
}

