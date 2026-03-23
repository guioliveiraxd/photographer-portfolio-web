import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-ink">
          <div className="text-center px-4">
            <p className="text-gold text-sm uppercase tracking-widest mb-3">Erro</p>
            <h1 className="font-display text-4xl text-white mb-4">Algo deu errado</h1>
            <p className="text-white/70 mb-8 max-w-md">
              Desculpe, encontramos um problema. Tente recarregar a página.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:-translate-y-0.5"
            >
              Recarregar
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

