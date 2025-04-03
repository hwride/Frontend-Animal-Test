import { loadAnimals } from "../utils/animal-store.ts";

export function Animals() {
  const animals = loadAnimals();

  return (
    <div className="animal-page">
      <h1>Your Animals</h1>
      <ul>
        {animals.map((animal) => (
          <li key={animal.id}>
            <a href={`/animal/${animal.id}`}>
              {animal.name} (a {animal.type.label})
            </a>
          </li>
        ))}
      </ul>
      <a href="/add-animal">Add Animal</a>
    </div>
  );
}
