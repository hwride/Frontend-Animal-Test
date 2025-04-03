import { Animal } from "../components/Animal.tsx";
import { useNavigate, useParams } from "react-router";
import { loadAnimalById } from "../utils/animal-store.ts";
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

  if (!animal) return null;

  return (
    <Page>
      <div className="flex flex-wrap justify-center gap-5">
        <Animal {...animal} />
      </div>
    </Page>
  );
}
