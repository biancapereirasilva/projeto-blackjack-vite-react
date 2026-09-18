import { useTheme } from "../context/ThemeContext";

function Header({ playerName }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between flex-wrap gap-3 px-6 py-4 bg-[var(--color-primary)] rounded-t-lg text-[var(--color-text)]">
      <div className="text-sm opacity-85">Jogador: {playerName}</div>

      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent)] font-extrabold text-[var(--color-accent-text)]">
          21
        </span>
        <h1 className="m-0 text-[1.6rem] tracking-wide text-[var(--color-text)]">BLACKJACK</h1>
      </div>

      <p className="w-full text-xs opacity-70">By Bianca Pereira</p>

      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-lg bg-[var(--color-background)] px-3 py-1.5 text-[0.7rem] font-bold tracking-wide">
          OBJETIVO DA RODADA: FAZER 21 PONTOS
        </span>
        <button
          onClick={toggleTheme}
          className="rounded-lg bg-[var(--color-accent)] px-3 py-1.5 text-[0.7rem] font-bold tracking-wide text-[var(--color-accent-text)]"
        >
          {theme === "normal" ? "Tema invertido" : "Tema normal"}
        </button>
      </div>
    </header>
  );
}

export default Header;