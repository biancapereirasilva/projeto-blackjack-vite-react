import Card from "./Card";
import Button from "./Button";
import ScoreBoard from "./ScoreBoard";
import { useGame } from "../context/GameContext";

function GameTable() {
  const {
    playerHand,
    dealerHand,
    playerScore,
    dealerScore,
    statusMessage,
    isRoundOver,
    isLoading,
    error,
    handleHit,
    handleStand,
    handleNewRound,
  } = useGame();

  return (
    <section className="flex flex-col gap-4 rounded-b-lg bg-[var(--color-primary)] px-6 pb-6 pt-2 max-[480px]:px-3 max-[480px]:pb-4">
      <ScoreBoard playerScore={playerScore} dealerScore={dealerScore} />

      <div>
        <h2 className="mb-2 text-[0.8rem] tracking-wide text-[var(--color-text)] opacity-80">DEALER</h2>
        <div className="flex min-h-32.5 flex-wrap gap-3 rounded-lg bg-[var(--color-background)] p-4 max-[480px]:gap-2 max-[480px]:p-2.5">
          {dealerHand.map((card, index) => (
            <Card
              key={card.id ?? card.code}
              image={card.image}
              code={card.code}
              hidden={index === 1 && !isRoundOver}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-2 text-[0.8rem] tracking-wide text-[var(--color-text)] opacity-80">JOGADOR</h2>
        <div className="flex min-h-32.5 flex-wrap gap-3 rounded-lg bg-[var(--color-background)] p-4 max-[480px]:gap-2 max-[480px]:p-2.5">
          {playerHand.map((card) => (
            <Card key={card.id ?? card.code} image={card.image} code={card.code} />
          ))}
        </div>
      </div>

      <p className="rounded-lg bg-[var(--color-secondary)] px-4 py-2.5 text-center font-semibold text-[var(--color-background)]">
        {isLoading ? "Carregando..." : error ?? statusMessage}
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Button
          label="Hit"
          variant="primary"
          onClick={handleHit}
          disabled={isRoundOver || isLoading}
        />
        <Button
          label="Stand"
          variant="secondary"
          onClick={handleStand}
          disabled={isRoundOver || isLoading}
        />
        <Button
          label="Nova rodada"
          variant="ghost"
          onClick={handleNewRound}
          disabled={isLoading}
        />
      </div>
    </section>
  );
}

export default GameTable;