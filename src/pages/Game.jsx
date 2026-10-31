import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import GameTable from "../components/GameTable";

export default function Game() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)] p-6">
      <div className="w-full max-w-155 overflow-hidden rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
        <Header playerName="Bianca Pereira" />
        <GameTable />

        <div className="flex justify-end bg-[var(--color-background)] p-4">
          <button
            onClick={handleLogout}
            className="rounded-lg bg-[var(--color-primary)] px-4 py-2 text-[var(--color-text)] hover:opacity-90"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}