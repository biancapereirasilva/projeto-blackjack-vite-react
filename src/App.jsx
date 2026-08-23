import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import GameTable from "./components/GameTable";
import cardsData from "./data/cardsMock.json";

const cardsPool = cardsData.cards;

function cardValue(value) {
  if (value === "ACE") return 11;
  if (value === "JACK" || value === "QUEEN" || value === "KING") return 10;
  return parseInt(value, 10);
}

function calculateScore(hand) {
  let score = hand.reduce((total, card) => total + cardValue(card.value), 0);
  let aces = hand.filter((card) => card.value === "ACE").length;

  while (score > 21 && aces > 0) {
    score -= 10;
    aces -= 1;
  }
  return score;
}

function drawCard() {
  const randomIndex = Math.floor(Math.random() * cardsPool.length);
  return { ...cardsPool[randomIndex], id: `${cardsPool[randomIndex].code}-${Date.now()}-${Math.random()}` };
}

function App() {
  const [theme, setTheme] = useState("dark");
  const [playerHand, setPlayerHand] = useState([drawCard(), drawCard()]);
  const [dealerHand, setDealerHand] = useState([drawCard(), drawCard()]);
  const [isRoundOver, setIsRoundOver] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    "Sua vez: escolha Hit, Stand ou reinicie a rodada"
  );

  const playerScore = calculateScore(playerHand);
  const dealerScore = calculateScore(dealerHand);

  function handleHit() {
    if (isRoundOver) return;
    const newHand = [...playerHand, drawCard()];
    setPlayerHand(newHand);

    const newScore = calculateScore(newHand);
    if (newScore > 21) {
      setIsRoundOver(true);
      setStatusMessage("Você estourou 21! Dealer venceu.");
    }
  }

  function handleStand() {
    if (isRoundOver) return;

    let finalDealerHand = [...dealerHand];
    while (calculateScore(finalDealerHand) < 17) {
      finalDealerHand = [...finalDealerHand, drawCard()];
    }
    setDealerHand(finalDealerHand);

    const finalDealerScore = calculateScore(finalDealerHand);
    const finalPlayerScore = calculateScore(playerHand);
    setIsRoundOver(true);

    if (finalDealerScore > 21 || finalPlayerScore > finalDealerScore) {
      setStatusMessage("Você venceu esta rodada!");
    } else if (finalPlayerScore < finalDealerScore) {
      setStatusMessage("Dealer venceu esta rodada.");
    } else {
      setStatusMessage("Empate!");
    }
  }

  function handleNewRound() {
    setPlayerHand([drawCard(), drawCard()]);
    setDealerHand([drawCard(), drawCard()]);
    setIsRoundOver(false);
    setStatusMessage("Sua vez: escolha Hit, Stand ou reinicie a rodada");
  }

  function handleToggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  function handleExit() {
    setStatusMessage("Obrigado por jogar!");
  }

  return (
    <div className={`app app--${theme}`}>
      <div className="app__card-wrapper">
        <Header
          playerName="Bianca Pereira"
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onExit={handleExit}
        />
        <GameTable
          playerHand={playerHand}
          dealerHand={dealerHand}
          playerScore={playerScore}
          dealerScore={dealerScore}
          statusMessage={statusMessage}
          isRoundOver={isRoundOver}
          onHit={handleHit}
          onStand={handleStand}
          onNewRound={handleNewRound}
        />
      </div>
    </div>
  );
}

export default App;
