import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--color-background)] p-6 text-center text-[#FEF2F2]">
      <h1 className="text-6xl font-bold" style={{ color: "#FACC15" }}>
        404
      </h1>
      <p>Página não encontrada.</p>
      <Link
        to="/"
        className="rounded-lg bg-[#991B1B] px-6 py-3 font-semibold hover:bg-[#F87171]"
      >
        Voltar ao início
      </Link>
    </div>
  );
}