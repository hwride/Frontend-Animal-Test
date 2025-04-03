import { AnimalData } from "../types/AnimalData.ts";
import { Button } from "./Button.tsx";

export function Animal({
  type: { label, imgSrc, imgAlt },
  name,
  hunger,
  happiness,
  sleep,
}: AnimalData) {
  return (
    <>
      <div className="mx-auto my-5 w-[350px] rounded border border-gray-300 bg-gray-100 p-5 text-center text-blue-500">
        <h1>{name}</h1>
        <div className="mx-auto mb-5 w-fit">
          <img
            src={imgSrc}
            alt={imgAlt}
            className="h-[150px] w-[150px] rounded-full object-cover"
          />
          <h2>{label}</h2>
        </div>
        <div className="mt-5 flex">
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
    <div className="mb-5 flex-1 p-2.5">
      <strong>{label}</strong>
      <div className="mt-2.5 h-5 w-full overflow-hidden rounded bg-gray-300">
        <div
          className="h-full bg-green-500 transition-all duration-300 ease-in-out"
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <Button>{buttonLabel}</Button>
    </div>
  );
}
