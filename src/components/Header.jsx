function Header({ playerName }) {
  return (
    <header className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between flex-wrap gap-3 px-6 py-4 bg-[#991B1B] rounded-t-lg text-[#FEF2F2]">
      <div className="text-sm opacity-85">Jogador: {playerName}</div>

      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FACC15] font-extrabold text-[#450A0A]">
          21
        </span>
        <h1 className="m-0 text-[1.6rem] tracking-wide text-[#FEF2F2]">BLACKJACK</h1>
      </div>

      <p className="w-full text-xs opacity-70">By Bianca Pereira</p>

      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-lg bg-[#450A0A] px-3 py-1.5 text-[0.7rem] font-bold tracking-wide">
          OBJETIVO DA RODADA: FAZER 21 PONTOS
        </span>
      </div>
    </header>
  );
}

export default Header;