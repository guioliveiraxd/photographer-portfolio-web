import { useState } from 'react';
import { SafeImage } from './SafeImage';

export default function Navbar({ categories, activeSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { id: 'home', label: 'Principal' },
    ...categories.map((category) => ({
      id: `categoria-${category.id}`,
      label: category.name,
    })),
    { id: 'sobre', label: 'Sobre' },
    { id: 'contato', label: 'Contato' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/55 backdrop-blur-md">
      <nav className="mx-auto flex w-[min(100%-1.5rem,1160px)] items-center justify-between gap-3 py-3">
        <a href="#home" className="inline-flex items-center gap-3" aria-label="Ir para o inicio">
          <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-full border border-white/20 bg-neutral-900">
            <SafeImage src="/imgs/valdir/hero-05.jpg" alt="Fotógrafo - Valdir Silva." className="h-14 w-14 rounded-full object-cover" loading="eager" />
          </span>
          <span className="font-display text-2xl tracking-wide text-white">Fotógrafo - Valdir Silva.</span>
        </a>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 text-white lg:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="main-menu"
          onClick={() => setIsMenuOpen((state) => !state)}
        >
          <span className="sr-only">Abrir menu</span>
          <span className="text-lg">☰</span>
        </button>

        <ul
          id="main-menu"
          className={`absolute right-3 top-[4.2rem] min-w-64 rounded-2xl border border-white/15 bg-black/90 p-2 shadow-soft transition lg:static lg:flex lg:min-w-0 lg:items-center lg:gap-1 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none ${
            isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0 lg:pointer-events-auto lg:opacity-100'
          }`}
        >
          {links.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`inline-flex w-full rounded-full px-3 py-2 text-sm transition ${
                    isActive ? 'bg-white text-black' : 'text-white/80 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

