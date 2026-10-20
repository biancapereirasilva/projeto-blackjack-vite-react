import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

const BASE_URL = "https://deckofcardsapi.com/api/deck";

async function request(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro na requisição à API");
  const data = await res.json();
  if (!data.success) throw new Error(data.error || "A API retornou um erro");
  return data;
}

function createShuffledDeck() {
  return request(`${BASE_URL}/new/shuffle/?deck_count=1`);
}

function shuffleDeck(deckId) {
  return request(`${BASE_URL}/${deckId}/shuffle/`);
}

function drawCards(deckId, count = 1) {
  return request(`${BASE_URL}/${deckId}/draw/?count=${count}`);
}

const INITIAL_MESSAGE = "Sua vez: escolha Hit, Stand ou reinicie a rodada";

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

function withId(card) {
  return { ...card, id: `${card.code}-${Date.now()}-${Math.random()}` };
}

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [deckId, setDeckId] = useState(null);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [isRoundOver, setIsRoundOver] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusMessage, setStatusMessage] = useState(INITIAL_MESSAGE);

  const hasStarted = useRef(false);

  const playerScore = calculateScore(playerHand);
  const dealerScore = calculateScore(dealerHand);

  // Busca o baralho (ou embaralha o existente) e distribui 2 cartas para cada
  const startRound = useCallback(async (existingDeckId) => {
    setIsLoading(true);
    setError(null);
    try {
      let id = existingDeckId;
      if (id) {
        await shuffleDeck(id);
      } else {
        const deck = await createShuffledDeck();
        id = deck.deck_id;
        setDeckId(id);
      }

      const data = await drawCards(id, 4);
      const cards = data.cards.map(withId);
      setPlayerHand(cards.slice(0, 2));
      setDealerHand(cards.slice(2, 4));
      setIsRoundOver(false);
      setStatusMessage(INITIAL_MESSAGE);
    } catch {
      setError("Não foi possível carregar o baralho. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (hasStarted.current) return; // evita chamada dupla do StrictMode
    hasStarted.current = true;
    startRound();
  }, [startRound]);

  useEffect(() => {
    if (playerScore > 21 && !isRoundOver) {
      setIsRoundOver(true);
      setStatusMessage("Você estourou 21! Dealer venceu.");
    }
  }, [playerScore, isRoundOver]);

  const handleHit = useCallback(async () => {
    if (isRoundOver || isLoading || !deckId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await drawCards(deckId, 1);
      setPlayerHand((prev) => [...prev, ...data.cards.map(withId)]);
    } catch {
      setError("Erro ao comprar carta. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, [isRoundOver, isLoading, deckId]);

  const handleStand = useCallback(async () => {
    if (isRoundOver || isLoading || !deckId) return;
    setIsLoading(true);
    setError(null);
    try {
      let finalHand = [...dealerHand];
      while (calculateScore(finalHand) < 17) {
        const data = await drawCards(deckId, 1);
        finalHand = [...finalHand, ...data.cards.map(withId)];
      }
      setDealerHand(finalHand);
      setIsRoundOver(true);
    } catch {
      setError("Erro ao comprar carta do dealer. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }, [isRoundOver, isLoading, deckId, dealerHand]);

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
    if (isLoading) return;
    startRound(deckId);
  }, [isLoading, deckId, startRound]);

  return (
    <GameContext.Provider
      value={{
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
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}