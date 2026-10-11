import Header from "../components/Header";
import GameTable from "../components/GameTable";

export default function Game() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)] p-6">
      <div className="w-full max-w-155 overflow-hidden rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
        <Header playerName="Bianca Pereira" />
        <GameTable />
      </div>
    </div>
  );
}