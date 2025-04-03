import { Animal } from "../components/Animal.tsx";
import { useNavigate, useParams } from "react-router";
import { loadAnimalById, saveAnimal } from "../utils/animal-store.ts";
import { useEffect, useState } from "react";
import { AnimalData } from "../types/AnimalData.ts";
import { Page } from "../components/Page.tsx";

export function AnimalPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState<AnimalData | null>(null);

  useEffect(() => {
    if (id == null) {
      navigate("/");
    } else {
      const animal = loadAnimalById(id);
      if (animal == null) {
        navigate("/");
      } else {
        setAnimal(animal);
      }
    }
  }, [id, navigate]);

  const updateStat = (
    key: keyof Pick<AnimalData, "hunger" | "happiness" | "sleep">,
    delta: number,
  ) => {
    if (!animal) return;
    const updated = {
      ...animal,
      [key]: Math.max(0, Math.min(100, animal[key] + delta)),
    };
    saveAnimal(updated);
    setAnimal(updated);
  };

  if (!animal) return null;

  return (
    <Page>
      <div className="flex flex-wrap justify-center gap-5">
        <Animal {...animal} onStatChange={updateStat} />
      </div>
    </Page>
  );
}
