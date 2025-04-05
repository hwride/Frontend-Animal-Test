import { AnimalData } from "../types/AnimalData.ts";
import { useNavigate } from "react-router";
import * as React from "react";
import { useState } from "react";
import { saveAnimal } from "../utils/animal-store.ts";
import { animalsTypes, statConfig } from "../config/config.ts";
import { Button } from "../components/Button.tsx";
import { Page } from "../components/Page.tsx";
import { Heading } from "../components/Heading.tsx";
import { FormattedMessage } from "react-intl";

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
      hunger: statConfig.hunger.defaultValue,
      happiness: statConfig.happiness.defaultValue,
      sleepiness: statConfig.sleepiness.defaultValue,
      id: crypto.randomUUID(),
      name,
      type: animalType,
      lastUpdated: new Date(),
    };

    saveAnimal(newAnimal);
    navigate(`/animal/${newAnimal.id}`);
  };

  return (
    <Page>
      <Heading level={1} className="pb-4">
        <FormattedMessage
          id="page-add-animalsheading"
          defaultMessage="Add Animal"
        />
      </Heading>
      <form
        onSubmit={handleSubmit}
        className="grid w-full max-w-lg grid-cols-[auto_1fr] items-center gap-2 gap-x-4"
      >
        <label htmlFor="type">
          <FormattedMessage id="animal-type" defaultMessage="Type" />
        </label>
        <select
          id="type"
          value={typeId}
          onChange={(e) => setTypeId(e.target.value)}
          className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
        >
          {animalsTypes.map((animal) => (
            <option value={animal.typeId}>
              <FormattedMessage
                id={animal.labelId}
                defaultMessage={animal.labelId}
              />
            </option>
          ))}
        </select>

        <label htmlFor="name">
          <FormattedMessage id="animal-name" defaultMessage="Name" />
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        />

        <Button type="submit" className="col-span-2">
          <FormattedMessage id="add-animal-btn" defaultMessage="Add Animal" />
        </Button>
      </form>
    </Page>
  );
}
