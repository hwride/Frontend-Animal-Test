import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Animals } from "./pages/animals.tsx";
import { AddAnimal } from "./pages/add-animal.tsx";
import { AnimalPage } from "./pages/animal.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Animals />} />
        <Route path="/animal/:id" element={<AnimalPage />} />
        <Route path="/add-animal" element={<AddAnimal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
