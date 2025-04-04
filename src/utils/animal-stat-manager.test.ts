import { vi, expect, test } from "vitest";
import { AnimalData } from "../types/AnimalData.ts";
import { boostAnimalStat } from "./animal-stat-manager.ts";

vi.mock("../config/config.ts", async () => {
  const actual = await vi.importActual("../config/config");
  return {
    ...actual,
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
        decayType: "reduce",
        boostValue: 20,
      },
    },
  };
});

test("boostAnimalStat should update stat value according to config - hunger", () => {
  const animal = mockAnimal({ hunger: 50 });
  expect(boostAnimalStat(animal, "hunger")).toEqual({
    ...animal,
    hunger: 50 - 5,
  });
});

test("boostAnimalStat should update stat value according to config - sleepiness", () => {
  const animal = mockAnimal({ sleepiness: 30 });
  expect(boostAnimalStat(animal, "sleepiness")).toEqual({
    ...animal,
    sleepiness: 30 + 20,
  });
});

test("boostAnimalStat should update stat value according to config - happiness", () => {
  const animal = mockAnimal({ happiness: 80 });
  expect(boostAnimalStat(animal, "happiness")).toEqual({
    ...animal,
    happiness: 80 + 5,
  });
});

function mockAnimal(overrides?: Partial<AnimalData>): AnimalData {
  return {
    id: "1234",
    name: "John",
    type: {
      typeId: "test-animal",
      label: "Test Animal",
      decayHungerRateMs: 500,
      decaySleepRateMs: 2000,
      decayHappinessRateMs: 1000,
      imgSrc: "/test-img.svg",
      imgAlt: "This is a test image",
    },
    lastUpdated: new Date(),
    hunger: 50,
    sleepiness: 50,
    happiness: 50,
    ...overrides,
  };
}
