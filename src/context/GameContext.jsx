import { createContext, useContext, useState, useEffect, useCallback } from "react";
import cardsData from "../data/cardsMock.json";

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
  return {
    ...cardsPool[randomIndex],
    id: `${cardsPool[randomIndex].code}-${Date.now()}-${Math.random()}`,
  };
}

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [playerHand, setPlayerHand] = useState([drawCard(), drawCard()]);
  const [dealerHand, setDealerHand] = useState([drawCard(), drawCard()]);
  const [isRoundOver, setIsRoundOver] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    "Sua vez: escolha Hit, Stand ou reinicie a rodada"
  );

  const playerScore = calculateScore(playerHand);
  const dealerScore = calculateScore(dealerHand);

  useEffect(() => {
    if (playerScore > 21 && !isRoundOver) {
      setIsRoundOver(true);
      setStatusMessage("Você estourou 21! Dealer venceu.");
    }
  }, [playerScore, isRoundOver]);

  const handleHit = useCallback(() => {
    if (isRoundOver) return;
    setPlayerHand((prevHand) => [...prevHand, drawCard()]);
  }, [isRoundOver]);

  const handleStand = useCallback(() => {
    if (isRoundOver) return;

    setDealerHand((prevDealerHand) => {
      let finalHand = [...prevDealerHand];
      while (calculateScore(finalHand) < 17) {
        finalHand = [...finalHand, drawCard()];
      }
      return finalHand;
    });
    setIsRoundOver(true);
  }, [isRoundOver]);

  useEffect(() => {
    if (isRoundOver && dealerScore > 0) {
      const finalPlayerScore = calculateScore(playerHand);
      if (finalPlayerScore <= 21) {
        if (dealerScore > 21 || finalPlayerScore > dealerScore) {
          setStatusMessage("Você venceu esta rodada!");
        } else if (finalPlayerScore < dealerScore) {
          setStatusMessage("Dealer venceu esta rodada.");
        } else {
          setStatusMessage("Empate!");
        }
      }
    }
  }, [isRoundOver, dealerScore, playerHand]);

  const handleNewRound = useCallback(() => {
    setPlayerHand([drawCard(), drawCard()]);
    setDealerHand([drawCard(), drawCard()]);
    setIsRoundOver(false);
    setStatusMessage("Sua vez: escolha Hit, Stand ou reinicie a rodada");
  }, []);

  return (
    <GameContext.Provider
      value={{
        playerHand,
        dealerHand,
        playerScore,
        dealerScore,
        statusMessage,
        isRoundOver,
        handleHit,
        handleStand,
        handleNewRound,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}