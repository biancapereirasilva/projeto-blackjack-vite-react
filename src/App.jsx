import "./App.css";
import Header from "./components/Header";
import GameTable from "./components/GameTable";
import cardsData from "./data/cardsMock.json";

const playerHand = [cardsData.cards[0], cardsData.cards[1]];
const dealerHand = [cardsData.cards[2], cardsData.cards[3]];

const playerScore = 11;
const dealerScore = 5;

function App() {
  return (
    <div className="app">
      <div className="app__card-wrapper">
        <Header playerName="Bianca Pereira" />
        <GameTable
          playerHand={playerHand}
          dealerHand={dealerHand}
          playerScore={playerScore}
          dealerScore={dealerScore}
          statusMessage="Sua vez: escolha Hit, Stand ou reinicie a rodada"
        />
      </div>
    </div>
  );
}

export default App;
