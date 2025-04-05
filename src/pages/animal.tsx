import { Animal } from "../components/Animal.tsx";
import { useNavigate, useParams } from "react-router";
import { loadAnimalById, saveAnimal } from "../utils/animal-store.ts";
import { useEffect, useState } from "react";
import { AnimalData, StatName } from "../types/AnimalData.ts";
import { Page } from "../components/Page.tsx";
import {
  boostAnimalStat,
  decayAnimalStats,
} from "../utils/animal-stat-manager.ts";
import { statUpdateIntervalMs } from "../config/config.ts";

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
        // Update stat decay on the animal after load.
        const updatedAnimal = decayAnimalStats(animal);
        const savedAnimal = saveAnimal(updatedAnimal);
        setAnimal(savedAnimal);

        // Setup timer to update stat decay live.
        let timeoutId: ReturnType<typeof setTimeout>;
        const scheduleDecay = () => {
          timeoutId = setTimeout(() => {
            setAnimal((animal) => {
              if (!animal) return animal;
              const updatedAnimal = decayAnimalStats(animal);
              const savedAnimal = saveAnimal(updatedAnimal);
              return savedAnimal;
            });
            scheduleDecay();
          }, statUpdateIntervalMs);
        };
        scheduleDecay();
        return () => clearTimeout(timeoutId);
      }
    }
  }, [id, navigate]);

  const boostStat = (statName: StatName) => {
    if (!animal) return;
    const boostedAnimal = boostAnimalStat(animal, statName);
    const savedAnimal = saveAnimal(boostedAnimal);
    setAnimal(savedAnimal);
  };

  if (!animal) return null;

  return (
    <Page>
      <div className="flex flex-wrap justify-center gap-5">
        <Animal {...animal} onBoostStat={boostStat} />
      </div>
    </Page>
  );
}
