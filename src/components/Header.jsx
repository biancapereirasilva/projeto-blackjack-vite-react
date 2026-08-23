import "./Header.css";
import Button from "./Button";

function Header({ playerName, theme, onToggleTheme, onExit }) {
  return (
    <header className="header">
      <div className="header__player">Jogador: {playerName}</div>

      <div className="header__title">
        <span className="header__badge">21</span>
        <h1>BLACKJACK</h1>
      </div>

      <p className="header__author">By Bianca Pereira</p>

      <div className="header__actions">
        <span className="header__goal">OBJETIVO DA RODADA: FAZER 21 PONTOS</span>
        <Button
          label={theme === "dark" ? "TROCAR PARA TEMA CLARO" : "TROCAR PARA TEMA ESCURO"}
          variant="secondary"
          onClick={onToggleTheme}
        />
        <Button label="Sair" variant="ghost" onClick={onExit} />
      </div>
    </header>
  );
}

export default Header;