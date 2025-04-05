import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { AnimalPage } from "./animal.tsx";
import { saveAnimal } from "../utils/animal-store.ts";
import { mockAnimal } from "../test/util/mock-utils.ts";
import { MemoryRouter, Route, Routes } from "react-router";
import { StatName } from "../types/AnimalData.ts";
import { userEvent, type UserEvent } from "@testing-library/user-event";

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
});

test("it should render animal correctly initially", () => {
  const animal = mockAnimal({
    id: "1234",
    name: "Scruffy",
    hunger: 60,
    sleepiness: 50,
    happiness: 70,
  });
  saveAnimal(animal);

  render(
    <MemoryRouter initialEntries={["/animal/1234"]}>
      <Routes>
        <Route path="/animal/:id" element={<AnimalPage />} />
      </Routes>
    </MemoryRouter>,
  );

  // Check the animal's name is there.
  expect(screen.getByText("Scruffy")).toBeInTheDocument();

  // Check stats have expected initial value.
  assertStatValue("hunger", 60);
  assertStatValue("sleepiness", 50);
  assertStatValue("happiness", 70);
});

test("it should increase stats when clicking on stat buttons", async () => {
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  const animal = mockAnimal({
    id: "1234",
    name: "Scruffy",
    hunger: 60,
    sleepiness: 50,
    happiness: 70,
  });
  saveAnimal(animal);

  render(
    <MemoryRouter initialEntries={["/animal/1234"]}>
      <Routes>
        <Route path="/animal/:id" element={<AnimalPage />} />
      </Routes>
    </MemoryRouter>,
  );

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
