import "./animal.css";
import { Animal } from "../components/Animal.tsx";
import { useNavigate, useParams } from "react-router";
import { loadAnimalById } from "../utils/storage-utils.ts";
import { useEffect, useState } from "react";
import { AnimalType } from "../types/AnimalType.ts";

export function AnimalPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState<AnimalType | null>(null);

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
    <div className="animal-page">
      <a href="/add-animal">Add Animal</a>

      <div className="animal-wrapper">
        <Animal {...animal} />
      </div>
    </div>
  );
}
