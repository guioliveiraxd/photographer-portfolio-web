import { useState } from 'react';

/**
 * Placeholder SVG para imagens que falharem ao carregar
 */
const PLACEHOLDER_SVG = (
  <svg
    viewBox="0 0 400 500"
    className="h-full w-full object-cover bg-neutral-800"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="400" height="500" fill="#262626" />
    <text x="50%" y="50%" textAnchor="middle" dy=".3em" fill="#666666" fontSize="18" fontFamily="sans-serif">
      Imagem não disponível
    </text>
  </svg>
);

export function SafeImage({ src, alt, ...props }) {
  const [hasError, setHasError] = useState(false);
  const { className = '', ...restProps } = props;

  if (hasError) {
    return (
      <div className="grid place-items-center bg-neutral-800">
        {PLACEHOLDER_SVG}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={className}
      {...restProps}
    />
  );
}

