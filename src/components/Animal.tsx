export function Animal() {
  return (
    <>
      <div className="animal-container">
        <h1>Poodle</h1>
        <div className="animal-animal">
          <img
            src="src/poodle.svg"
            alt="Your animal"
            className="animal-image"
          />
          <h2>Animal Name</h2>
        </div>
        <div className="animal-stats">
          <Stat label="Hunger" buttonLabel="Feed" value={60} />
          <Stat label="Happiness" buttonLabel="Play" value={80} />
          <Stat label="Sleep" buttonLabel="Rest" value={50} />
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
