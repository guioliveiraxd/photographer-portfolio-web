import { useEffect } from 'react';
import { SafeImage } from './SafeImage';

export default function Lightbox({ isOpen, image, onClose, onNext, onPrev }) {
  useEffect(() => {
    if (!isOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onNext();
      if (event.key === 'ArrowLeft') onPrev();
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !image) return null;

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center bg-black/88 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-label="Visualizacao em tela cheia"
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 rounded-full border border-white/40 px-4 py-2 text-sm text-white"
        onClick={onClose}
      >
        Fechar
      </button>

      <button
        type="button"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/40 px-3 py-2 text-xl text-white"
        onClick={(event) => {
          event.stopPropagation();
          onPrev();
        }}
      >
        ←
      </button>

      <button
        type="button"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-black/40 px-3 py-2 text-xl text-white"
        onClick={(event) => {
          event.stopPropagation();
          onNext();
        }}
      >
        →
      </button>

      <SafeImage
        src={image.src}
        alt={image.alt}
        className="max-h-[88vh] w-full max-w-6xl rounded-2xl border border-white/20 object-contain"
        onClick={(event) => event.stopPropagation()}
      />
    </div>
  );
}

