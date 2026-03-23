export default function Footer({ totalImages }) {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex w-[min(100%-1.5rem,1160px)] flex-col gap-2 text-sm text-white/70 md:flex-row md:items-center md:justify-between">
        <p>Fotógrafo - Valdir Silva.</p>
        <p>{totalImages} imagens no portfólio</p>
      </div>
    </footer>
  );
}

