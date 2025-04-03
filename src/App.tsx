import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Animals } from "./pages/animals.tsx";
import { AddAnimal } from "./pages/add-animal.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Animals />} />
        <Route path="/add-animal" element={<AddAnimal />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
