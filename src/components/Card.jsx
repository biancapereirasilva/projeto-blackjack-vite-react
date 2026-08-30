import "./Card.css";

function Card({ image, code, hidden = false }) {
  if (hidden) {
    return (
      <div className="card card--hidden" aria-label="Carta oculta">
        <span className="card__back">?</span>
      </div>
    );
  }

  return (
    <div className="card">
      <img className="card__image" src={image} alt={code} />
    </div>
  );
}

export default Card;