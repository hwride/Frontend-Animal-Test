import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Animals } from "./pages/animals.tsx";
import { AddAnimal } from "./pages/add-animal.tsx";
import { AnimalPage } from "./pages/animal.tsx";
import { IntlProvider } from "react-intl";
import messagesEn from "../lang/en.json";

function App() {
  return (
    <IntlProvider
      messages={messagesEn as Record<string, string>}
      locale="en"
      defaultLocale="en"
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Animals />} />
          <Route path="/animal/:id" element={<AnimalPage />} />
          <Route path="/add-animal" element={<AddAnimal />} />
        </Routes>
      </BrowserRouter>
    </IntlProvider>
  );
}

export default App;
