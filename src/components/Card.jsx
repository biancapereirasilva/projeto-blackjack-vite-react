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
            "repeating-linear-gradient(45deg, #450A0A, #450A0A 6px, #991B1B 6px, #991B1B 12px)",
        }}
        aria-label="Carta oculta"
      >
        <span className="text-3xl font-black text-[#FACC15]">?</span>
      </div>
    );
  }

  return (
    <div className="relative flex h-32.5 w-22.5 items-center justify-center overflow-hidden rounded-lg bg-[#FEF2F2] shadow-md max-[480px]:h-23 max-[480px]:w-16">
      {!loaded && !failed && (
        <span className="absolute text-[0.65rem] text-[#991B1B] animate-pulse">
          carregando...
        </span>
      )}
      {failed && (
        <span className="absolute text-[0.65rem] text-[#991B1B]">{code}</span>
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