import "./GameTable.css";
import Card from "./Card";
import Button from "./Button";
import ScoreBoard from "./ScoreBoard";

function GameTable({
  playerHand,
  dealerHand,
  playerScore,
  dealerScore,
  statusMessage,
  onHit = () => {},
  onStand = () => {},
  onNewRound = () => {},
}) {
  return (
    <section className="game-table">
      <ScoreBoard playerScore={playerScore} dealerScore={dealerScore} />

      <div className="game-table__hand">
        <h2 className="game-table__hand-label">DEALER</h2>
        <div className="game-table__cards">
          {dealerHand.map((card) => (
            <Card key={card.code} image={card.image} code={card.code} />
          ))}
        </div>
      </div>

      <div className="game-table__hand">
        <h2 className="game-table__hand-label">JOGADOR</h2>
        <div className="game-table__cards">
          {playerHand.map((card) => (
            <Card key={card.code} image={card.image} code={card.code} />
          ))}
        </div>
      </div>

      <p className="game-table__status">{statusMessage}</p>

      <div className="game-table__actions">
        <Button label="Hit" variant="primary" onClick={onHit} />
        <Button label="Stand" variant="secondary" onClick={onStand} />
        <Button label="Nova rodada" variant="ghost" onClick={onNewRound} />
      </div>
    </section>
  );
}

export default GameTable;