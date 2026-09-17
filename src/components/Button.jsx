function Button({ label, onClick, variant = "primary", disabled = false }) {
  const variants = {
    primary: "bg-[#FACC15]",
    secondary: "bg-[#FEF2F2]",
    ghost: "bg-transparent text-[#FEF2F2] border border-[#FEF2F2]",
  };

  return (
    <button
      className={`rounded-lg px-7 py-3 text-[0.95rem] font-bold tracking-wide transition-transform duration-150 hover:enabled:-translate-y-0.5 active:enabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-40 max-[480px]:px-4 max-[480px]:py-2.5 max-[480px]:text-sm ${variants[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}

export default Button;