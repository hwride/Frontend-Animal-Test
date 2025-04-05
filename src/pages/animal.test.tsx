import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { cleanup, render, screen, within, act } from "@testing-library/react";
import { AnimalPage } from "./animal.tsx";
import { saveAnimal } from "../utils/animal-store.ts";
import { mockAnimal } from "../test/util/mock-utils.ts";
import { MemoryRouter, Route, Routes } from "react-router";
import { StatName } from "../types/AnimalData.ts";
import { userEvent, type UserEvent } from "@testing-library/user-event";
import { IntlProvider } from "react-intl";

vi.mock("../config/config.ts", async () => {
  const actual = await vi.importActual("../config/config");
  return {
    ...actual,
    // Set this high so stats don't update every time userEvent.click advances timers.
    // Makes for clearer testing.
    statUpdateIntervalMs: 5000,
    animalsTypes: [
      {
        typeId: "test-animal",
        labelId: "animal-type-test-animal",
        decayHungerRateMs: 500,
        decaySleepinessRateMs: 2000,
        decayHappinessRateMs: 1000,
        imgSrc: "/test-animal.svg",
        imgAltMessageId: "animal-type-test-animal-img-alt",
      },
      {
        typeId: "test-animal 2",
        labelId: "animal-type-test-animal-2",
        decayHungerRateMs: 500,
        decaySleepinessRateMs: 500,
        decayHappinessRateMs: 500,
        imgSrc: "/test-animal2.svg",
        imgAltMessageId: "animal-type-test-animal-2-img-alt",
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
        defaultValue: 50,
        decayType: "increase",
        boostValue: -10,
      },
    },
  };
});

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.useRealTimers();
  cleanup();
});

test("it should render animal correctly initially", () => {
  const animal = mockAnimal({
    id: "1000",
    name: "Scruffy",
    hunger: 60,
    sleepiness: 50,
    happiness: 70,
  });
  saveAnimal(animal);

  renderAnimalPage({ animalId: "1000" });

  expect(screen.getByText("Scruffy")).toBeInTheDocument(); // Check animal's name is there.
  expect(screen.getByText("Test Animal")).toBeInTheDocument(); // Check animal's type is there.

  // Check stats have expected initial value.
  assertStatValue("hunger", 60);
  assertStatValue("sleepiness", 50);
  assertStatValue("happiness", 70);
});

test("it should increase stats when clicking on stat buttons", async () => {
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  const animal = mockAnimal({
    id: "1000",
    name: "Scruffy",
    hunger: 60,
    sleepiness: 50,
    happiness: 70,
  });
  saveAnimal(animal);

  renderAnimalPage({ animalId: "1000" });

  // Check stats have expected initial values.
  assertStatValue("hunger", 60);
  assertStatValue("sleepiness", 50);
  assertStatValue("happiness", 70);

  // Click feed button and check only hunger changes.
  await clickBoostStat(user, "hunger");
  assertStatValue("hunger", 55);
  assertStatValue("sleepiness", 50);
  assertStatValue("happiness", 70);

  // Click the other two stat boost buttons and check they change.
  await clickBoostStat(user, "sleepiness");
  await clickBoostStat(user, "happiness");
  assertStatValue("hunger", 55);
  assertStatValue("sleepiness", 40);
  assertStatValue("happiness", 75);

  // Boost hunger a couple more times.
  await clickBoostStat(user, "hunger");
  await clickBoostStat(user, "hunger");
  assertStatValue("hunger", 45);
  assertStatValue("sleepiness", 40);
  assertStatValue("happiness", 75);
});

test("it should decay stats live over time", async () => {
  const animal = mockAnimal({
    id: "1000",
    name: "Scruffy",
    hunger: 50,
    sleepiness: 50,
    happiness: 50,
  });
  saveAnimal(animal);

  renderAnimalPage({ animalId: "1000" });

  // Check stats have expected initial value.
  assertStatValue("hunger", 50);
  assertStatValue("sleepiness", 50);
  assertStatValue("happiness", 50);

  // Advance timers past the stat update interval.
  await act(async () => {
    vi.advanceTimersByTime(5000);
  });

  // Check stats have decayed based on decay rate.
  assertStatValue("hunger", 60);
  assertStatValue("sleepiness", 52.5);
  assertStatValue("happiness", 45);

  // Check again after longer.
  await act(async () => {
    vi.advanceTimersByTime(10000);
  });
  assertStatValue("hunger", 80);
  assertStatValue("sleepiness", 57.5);
  assertStatValue("happiness", 35);
});

test("should allow different types of animals with different decay rates", async () => {
  const animal = mockAnimal({
    id: "2000",
    name: "Jane",
    type: {
      typeId: "test-animal 2",
      labelId: "animal-type-test-animal-2",
      decayHungerRateMs: 500,
      decaySleepinessRateMs: 500,
      decayHappinessRateMs: 500,
      imgSrc: "/test-animal2.svg",
      imgAltMessageId: "animal-type-test-animal-2-img-alt",
    },
    hunger: 50,
    sleepiness: 50,
    happiness: 50,
  });
  saveAnimal(animal);

  renderAnimalPage({ animalId: "2000" });

  expect(screen.getByText("Jane")).toBeInTheDocument(); // Check animal's name is there.
  expect(screen.getByText("Test Animal 2")).toBeInTheDocument(); // Check animal's type is there.

  // Check stats have expected initial value.
  assertStatValue("hunger", 50);
  assertStatValue("sleepiness", 50);
  assertStatValue("happiness", 50);

  // Test these stats decay at a different rate to test animal 1.
  await act(async () => {
    vi.advanceTimersByTime(5000);
  });
  assertStatValue("hunger", 60);
  assertStatValue("sleepiness", 60);
  assertStatValue("happiness", 40);
});

function renderAnimalPage({ animalId }: { animalId: string }) {
  render(
    <IntlProvider
      messages={{
        "animal-type-test-animal": "Test Animal",
        "animal-type-test-animal-img-alt": "A cartoon test animal",
        "animal-type-test-animal-2": "Test Animal 2",
        "animal-type-test-animal-2-img-alt": "A cartoon test animal 2",
      }}
      locale="en"
      defaultLocale="en"
    >
      <MemoryRouter initialEntries={[`/animal/${animalId}`]}>
        <Routes>
          <Route path="/animal/:id" element={<AnimalPage />} />
        </Routes>
      </MemoryRouter>
    </IntlProvider>,
  );
}

function assertStatValue(statName: StatName, expectedValue: number) {
  const hungerStat = getStatEl(statName);
  expect(within(hungerStat!).getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    String(expectedValue),
  );
}

async function clickBoostStat(user: UserEvent, statName: StatName) {
  const button = within(getStatEl(statName)!).getByRole("button");
  await user.click(button);
}

function getStatEl(statName: StatName) {
  return screen
    .getAllByTestId("stat")
    .find((el) => within(el).queryByText(new RegExp(statName, "i")));
}
