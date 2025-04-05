import { expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { AnimalPage } from "./animal.tsx";
import { saveAnimal } from "../utils/animal-store.ts";
import { mockAnimal } from "../test/util/mock-utils.ts";
import { MemoryRouter, Route, Routes } from "react-router";

vi.mock("../config/config.ts", async () => {
  const actual = await vi.importActual("../config/config");
  return {
    ...actual,
    animalsTypes: [
      {
        typeId: "test-animal",
        label: "Test Animal",
        decayHungerRateMs: 500,
        decaySleepinessRateMs: 2000,
        decayHappinessRateMs: 1000,
        imgSrc: "/test-animal.svg",
        imgAlt: "A test animal",
      },
    ],
    statConfig: {
      happiness: {
        defaultValue: 50,
        decayType: "reduce",
        boostValue: 5,
      },
      hunger: {
        defaultValue: 50,
        decayType: "increase",
        boostValue: -5,
      },
      sleepiness: {
        defaultValue: 0,
        decayType: "increase",
        boostValue: 20,
      },
    },
  };
});

test("render", () => {
  const animal = mockAnimal({
    id: "1234",
    name: "Scruffy",
  });
  saveAnimal(animal);

  render(
    <MemoryRouter initialEntries={["/animal/1234"]}>
      <Routes>
        <Route path="/animal/:id" element={<AnimalPage />} />
      </Routes>
    </MemoryRouter>,
  );

  expect(screen.getByText("Scruffy")).toBeInTheDocument();
});
