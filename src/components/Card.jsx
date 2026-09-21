import { useState } from "react";

function Card({ image, code, hidden = false }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (hidden) {
    return (
      <div
        className="flex h-32.5 w-22.5 items-center justify-center overflow-hidden rounded-lg shadow-md max-[480px]:h-23 max-[480px]:w-16"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--color-background), var(--color-background) 6px, var(--color-primary) 6px, var(--color-primary) 12px)",
        }}
        aria-label="Carta oculta"
      >
        <span className="text-3xl font-black text-[var(--color-accent)]">?</span>
      </div>
    );
  }

  return (
    <div className="relative flex h-32.5 w-22.5 items-center justify-center overflow-hidden rounded-lg bg-[var(--color-text)] shadow-md max-[480px]:h-23 max-[480px]:w-16">
      {!loaded && !failed && (
        <span className="absolute text-[0.65rem] text-[var(--color-primary)] animate-pulse">
          carregando...
        </span>
      )}
      {failed && (
        <span className="absolute text-[0.65rem] text-[var(--color-primary)]">{code}</span>
      )}
      <img
        className={`h-full w-full object-contain transition-opacity duration-200 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        src={image}
        alt={code}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export default Card;