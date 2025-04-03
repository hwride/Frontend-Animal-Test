import { AnimalData } from "../types/AnimalData.ts";
import { useNavigate } from "react-router";
import { useState } from "react";
import { saveAnimal } from "../utils/animal-store.ts";
import { animalsTypes, defaultStats } from "../config/config.ts";
import * as React from "react";

export function AddAnimal() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [typeId, setTypeId] = useState(animalsTypes[0].typeId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const animalType = animalsTypes.find(
      (animalType) => animalType.typeId === typeId,
    );
    if (animalType == null) {
      throw new Error(
        `Trying to submit form with unknown animal type: ${typeId}`,
      );
    }
    const newAnimal: AnimalData = {
      ...defaultStats,
      id: crypto.randomUUID(),
      name,
      type: animalType,
    };

    saveAnimal(newAnimal);
    navigate(`/animal/${newAnimal.id}`);
  };

  return (
    <div>
      <h1>Add Animal</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="type">Type</label>
          <select
            id="type"
            value={typeId}
            onChange={(e) => setTypeId(e.target.value)}
          >
            {animalsTypes.map((animal) => (
              <option value={animal.typeId}>{animal.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <button type="submit">Add Animal</button>
      </form>
    </div>
  );
}
