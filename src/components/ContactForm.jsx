import { useState } from 'react';

export default function ContactForm({ phone = '+55 19 98175-1061' }) {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const services = [
    { id: 'casais', label: 'Sessão de Casais' },
    { id: 'casamento', label: 'Casamento' },
    { id: 'gestantes', label: 'Sessão de Gestantes' },
    { id: 'recem-nascidos', label: 'Recém-nascidos' },
    { id: 'aniversario', label: 'Aniversário' },
    { id: 'ensaio-profissional', label: 'Ensaio Profissional' },
    { id: 'retratos', label: 'Retratos Profissionais' },
    { id: 'outro', label: 'Outro' },
  ];

  // Formatar número sem caracteres especiais
  const cleanPhone = phone.replace(/[^\d+]/g, '');

  // Construir mensagem do WhatsApp
  const buildWhatsAppMessage = () => {
    let content = `Olá! Meu nome é ${name}.\n\n`;
    if (selectedService) {
      content += `Tenho interesse em: ${services.find((s) => s.id === selectedService)?.label}\n\n`;
    }
    if (email) {
      content += `Email para contato: ${email}\n\n`;
    }
    content += `Mensagem: ${message}`;
    return encodeURIComponent(content);
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      alert('Por favor, preencha ao menos seu nome e a mensagem!');
      return;
    }

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${buildWhatsAppMessage()}`;
    window.open(whatsappUrl, '_blank');

    // Limpar formulário
    setName('');
    setEmail('');
    setMessage('');
    setSelectedService('');
  };

  return (
    <form onSubmit={handleSendWhatsApp} className="mx-auto w-[min(100%-1.5rem,600px)] space-y-4">
      {/* Nome */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
          Seu Nome *
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome completo"
          className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/50 transition focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
          Seu Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu.email@exemplo.com"
          className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/50 transition focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
        />
      </div>

      {/* Serviço */}
      <div>
        <label htmlFor="service" className="block text-sm font-semibold text-white mb-2">
          Tipo de Serviço
        </label>
        <div className="relative group">
          <select
            id="service"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full rounded-xl border-2 border-white/20 bg-gradient-to-r from-white/5 to-white/10 px-4 py-3 pr-10 text-white transition appearance-none cursor-pointer hover:border-white/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 group-hover:border-gold/50"
          >
            <option value="" className="bg-ink text-white">Selecione uma opção...</option>
            {services.map((service) => (
              <option key={service.id} value={service.id} className="bg-ink text-white">
                {service.label}
              </option>
            ))}
          </select>
          {/* Ícone de dropdown */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gold/60 group-hover:text-gold transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Mensagem */}
      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
          Sua Mensagem *
        </label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Conte-nos sobre sua necessidade e preferências para a sessão..."
          rows="5"
          className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/50 transition focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold resize-none"
          required
        />
      </div>

      {/* Info */}
      <div className="rounded-lg border border-gold/30 bg-gold/5 p-3">
        <p className="text-xs text-white/70">
          Clique abaixo para abrir o WhatsApp com sua mensagem já preenchida
        </p>
      </div>

      {/* Botão */}
      <button
        type="submit"
        className="w-full rounded-full bg-gradient-to-r from-green-500 to-green-600 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
      >
        Enviar via WhatsApp
      </button>

      {/* Alternativa Email */}
      <div className="pt-2 text-center">
        <p className="text-xs text-white/60">
          Prefere enviar um email?{' '}
          <a href="mailto:valdirsilvafotografo511@gmail.com" className="text-gold hover:underline">
            clique aqui
          </a>
        </p>
      </div>
    </form>
  );
}

