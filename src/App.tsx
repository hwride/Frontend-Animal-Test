import "./App.css";
import { Animal } from "./components/Animal.tsx";

function App() {
  return (
    <div className="animal-page">
      <button>Add Animal</button>

      <div className="animal-wrapper">
        <Animal />
      </div>
    </div>
  );
}

export default App;
