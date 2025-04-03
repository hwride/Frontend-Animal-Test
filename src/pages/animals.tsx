import "./animals.css";
import { Animal } from "../components/Animal.tsx";

export function Animals() {
  return (
    <div className="animal-page">
      <a href="/add-animal">Add Animal</a>

      <div className="animal-wrapper">
        <Animal />
      </div>
    </div>
  );
}
