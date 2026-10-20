import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[var(--color-background)] p-6 text-center text-[#FEF2F2]">
      <h1 className="text-4xl font-bold" style={{ color: "#FACC15" }}>
        Blackjack Lounge
      </h1>
      <p className="max-w-md">
        Faça login e teste sua sorte contra a banca. Chegue o mais perto de 21 sem estourar!
      </p>
      <Link
        to="/login"
        className="rounded-lg bg-[#991B1B] px-6 py-3 font-semibold hover:bg-[#F87171]"
      >
        Entrar
      </Link>
    </div>
  );
}