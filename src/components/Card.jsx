function Card({ image, code, hidden = false }) {
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
    <div className="flex h-32.5 w-22.5 items-center justify-center overflow-hidden rounded-lg bg-[#FEF2F2] shadow-md max-[480px]:h-23 max-[480px]:w-16">
      <img className="h-full w-full object-contain" src={image} alt={code} />
    </div>
  );
}

export default Card;