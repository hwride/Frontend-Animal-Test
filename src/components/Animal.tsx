import "./Animal.css";
import { AnimalType } from "../types/AnimalType.ts";

export function Animal({
  type,
  name,
  imgSrc,
  imgAlt,
  hunger,
  happiness,
  sleep,
}: AnimalType) {
  return (
    <>
      <div className="animal-container">
        <h1>{type}</h1>
        <div className="animal-animal">
          <img src={imgSrc} alt={imgAlt} className="animal-image" />
          <h2>{name}</h2>
        </div>
        <div className="animal-stats">
          <Stat label="Hunger" buttonLabel="Feed" value={hunger} />
          <Stat label="Happiness" buttonLabel="Play" value={happiness} />
          <Stat label="Sleep" buttonLabel="Rest" value={sleep} />
        </div>
      </div>
    </>
  );
}

function Stat({
  label,
  buttonLabel,
  value,
}: {
  label: string;
  buttonLabel: string;
  value: number;
}) {
  return (
    <div className="stat">
      <strong>{label}</strong>
      <div className="meter">
        <div className="meter-fill" style={{ width: `${value}%` }}></div>
      </div>
      <button className="action-button">{buttonLabel}</button>
    </div>
  );
}
