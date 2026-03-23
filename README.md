# 📸 Photographer Portfolio Web

Um portfólio web moderno e responsivo para fotógrafo, construído com **React 18**, **Vite** e **Tailwind CSS**. Apresenta galerias categorizadas, lightbox interativo, navegação fluida e integração com WhatsApp para contato direto.

**🔗 [Visite o site ao vivo](https://photographer-portfolio-web.netlify.app)**

---

## ⚡ Features

- **Hero com Slideshow**: Rotação automática de imagens em fade
- **Galerias Categorizadas**: Casal, Gestante, Profissional, Recém-nascido
- **Lightbox Interativo**: Navegação entre fotos com teclado (setas) e mouse
- **Navegação por Hash**: URLs limpas e SEO-friendly (#sobre, #contato, etc)
- **Formulário de Contato**: Integração direta ao WhatsApp
- **Reveal on Scroll**: Animações de entrada ao scroll
- **Mobile First**: 100% responsivo (mobile, tablet, desktop)
- **Dark Theme**: Design elegante com tema escuro
- **Carregamento Otimizado**: Imagens com lazy loading e SafeImage fallback

---

## 🛠️ Stack Técnico

| Tecnologia | Descrição |
|-----------|-----------|
| **React 18** | UI componentes funcionais com hooks |
| **Vite 5** | Build tool rápido e dev server otimizado |
| **Tailwind CSS 3** | Utility-first CSS framework |
| **PostCSS** | Processador de CSS com autoprefixer |
| **Netlify** | Deploy contínuo com GitHub integration |

---

## 📁 Arquitetura

```
src/
├── App.jsx                 # Orquestrador principal
├── components/             # Componentes React
│   ├── Hero.jsx           # Slideshow da home
│   ├── Navbar.jsx         # Navegação fixa
│   ├── GallerySection.jsx # Galeria por categoria
│   ├── Lightbox.jsx       # Modal de visualização
│   ├── ContactForm.jsx    # Formulário WhatsApp
│   ├── SafeImage.jsx      # Wrapper com fallback
│   └── ...
├── hooks/                  # Custom hooks
│   ├── useActiveSection.js # Detecta seção visível
│   ├── useHashNavigation.js # Scroll suave por hash
│   └── useRevealOnScroll.js # Trigger animações
├── utils/
│   └── galleryData.js     # Camada de dados (glob images)
└── index.css              # Estilos globais + Tailwind
```

---

## 🚀 Começando

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Instalação

```bash
git clone https://github.com/guioliveiraxd/photographer-portfolio-web.git
cd photographer-portfolio-web

npm install
npm run dev
```

Acesse `http://localhost:5173` no navegador.

---

## 📦 Build & Deploy

### Build de produção
```bash
npm run build    # Gera pasta /dist
npm run preview  # Testa build localmente
```

### Deploy no Netlify (automático)
O projeto está configurado para **deploy contínuo**:
1. Cada `git push` no `main` ativa build automático no Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

**Arquivo de configuração**: `netlify.toml`

---

## 🔧 Configuração

### Variáveis de ambiente
Crie `.env.local`:
```env
VITE_CONTACT_PHONE=+55 19 98175-1061
VITE_CONTACT_EMAIL=seu.email@gmail.com
VITE_SITE_TITLE=Fotógrafo - Valdir Silva.
```

### Adicionar novas categorias
Edite `src/utils/galleryData.js`:
```javascript
const CATEGORY_CONFIG = {
  'sua-pasta': { id: 'categoria-id', name: 'Nome Exibido', order: 1 },
};
```

---

## 📊 Performance

- ✅ **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices)
- ✅ **Bundle Size**: ~55KB gzipped (JavaScript)
- ✅ **Time to Interactive**: < 2s (conexão 4G)
- ✅ **Otimização de imagens**: Lazy loading + SafeImage fallback

---

## 🎨 Paleta de Cores

- **Primary**: `#D4A574` (Gold - acentos)
- **Background**: `#0a0a0b` (Dark)
- **Text**: `#f2f2f3` (Light gray)

---

## 🛣️ Roadmap

- [ ] Blog/Case Studies
- [ ] Dark/Light mode toggle
- [ ] Analytics (Plausible/Vercel Analytics)
- [ ] Testes unitários (Vitest + React Testing Library)
- [ ] ESLint + Prettier pré-commit
- [ ] API backend para CRUD real

---

## 📝 Licença

MIT © 2026 Valdir Silva

---

## 💬 Contato

- **WhatsApp**: [+55 19 98175-1061](https://wa.me/5519981751061)
- **Email**: valdirsilvafotografo511@gmail.com
- **GitHub**: [@guioliveiraxd](https://github.com/guioliveiraxd)
