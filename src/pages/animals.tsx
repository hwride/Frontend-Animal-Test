import { loadAnimals } from "../utils/animal-store.ts";
import { Anchor } from "../components/Anchor.tsx";

export function Animals() {
  const animals = loadAnimals();

  return (
    <div className="animal-page">
      <h1>Your Animals</h1>
      <ul className="mb-2 list-disc">
        {animals.map((animal) => (
          <li key={animal.id} className="ml-5 text-blue-600">
            <Anchor href={`/animal/${animal.id}`}>
              {animal.name} (a {animal.type.label})
            </Anchor>
          </li>
        ))}
      </ul>
      <Anchor href="/add-animal" variant="button">
        Add Animal
      </Anchor>
    </div>
  );
}
