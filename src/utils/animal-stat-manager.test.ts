import { vi, expect, test, beforeEach, afterEach } from "vitest";
import { AnimalData } from "../types/AnimalData.ts";
import { boostAnimalStat, decayAnimalStats } from "./animal-stat-manager.ts";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

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
        decayType: "increase",
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

test("boostAnimalStat should not go above mix or below max", () => {
  const animal = mockAnimal({ hunger: 0, happiness: 100 });
  const animalHappinessBoosted = boostAnimalStat(animal, "happiness");
  expect(animalHappinessBoosted).toEqual({
    ...animal,
    hunger: 0,
    happiness: 100,
  });

  const animalHungerBoosted = boostAnimalStat(animalHappinessBoosted, "hunger");
  expect(animalHungerBoosted).toEqual({
    ...animal,
    hunger: 0,
    happiness: 100,
  });
});

test("decayAnimalStats should decay stat values according to config", () => {
  const now = new Date("2025-04-01T12:00:00Z");
  vi.setSystemTime(now);

  const lastUpdated = new Date(now);
  lastUpdated.setTime(now.getTime() - 2000); // Set the last updated time to be 2000ms before now.
  const animal = mockAnimal({
    lastUpdated,
    hunger: 50,
    sleepiness: 50,
    happiness: 50,
  });
  animal.type.decayHungerRateMs = 500;
  animal.type.decaySleepinessRateMs = 4000;
  animal.type.decayHappinessRateMs = 1000;
  expect(decayAnimalStats(animal)).toEqual({
    ...animal,
    hunger: 54, // Hunger should have decayed by 4, as decay is 1 per 500ms and 2000ms has elapsed. Hunger increases for its decay.
    sleepiness: 50.5, // Sleepiness should have decayed by 0.5, as decay is 1 per 4000ms and 2000ms has elapsed. Sleepiness increases for its decay.
    happiness: 48, // Happiness should have decayed by 2, as decay is 1 per 1000ms and 2000ms has elapsed. Happiness decreases for its decay.
  });
});

test("decayAnimalStats should not go above mix or below max", () => {
  const now = new Date("2025-04-01T12:00:00Z");
  vi.setSystemTime(now);

  const lastUpdated = new Date(now);
  lastUpdated.setTime(now.getTime() - 2000); // Set the last updated time to be 2000ms before now.
  const animal = mockAnimal({
    lastUpdated,
    hunger: 100,
    sleepiness: 100,
    happiness: 0,
  });
  animal.type.decayHungerRateMs = 500;
  animal.type.decaySleepinessRateMs = 500;
  animal.type.decayHappinessRateMs = 500;
  expect(decayAnimalStats(animal)).toEqual({
    ...animal,
    hunger: 100,
    sleepiness: 100,
    happiness: 0,
  });
});

test("decayAnimalStats - happiness should decay faster when hungry", () => {
  const now = new Date("2025-04-01T12:00:00Z");
  vi.setSystemTime(now);

  const lastUpdated = new Date(now);
  lastUpdated.setTime(now.getTime() - 2000); // Set the last updated time to be 2000ms before now.
  const animal = mockAnimal({
    lastUpdated,
    hunger: 100,
    sleepiness: 50,
    happiness: 50,
  });
  animal.type.decayHungerRateMs = 2000;
  animal.type.decaySleepinessRateMs = 2000;
  animal.type.decayHappinessRateMs = 2000;
  expect(decayAnimalStats(animal)).toEqual({
    ...animal,
    hunger: 100,
    sleepiness: 51,
    happiness: 48, // Note happiness decreased by 2x because the animal is hungry.
  });
});

test("decayAnimalStats - happiness should decay faster when sleepy", () => {
  const now = new Date("2025-04-01T12:00:00Z");
  vi.setSystemTime(now);

  const lastUpdated = new Date(now);
  lastUpdated.setTime(now.getTime() - 2000); // Set the last updated time to be 2000ms before now.
  const animal = mockAnimal({
    lastUpdated,
    hunger: 50,
    sleepiness: 100,
    happiness: 50,
  });
  animal.type.decayHungerRateMs = 2000;
  animal.type.decaySleepinessRateMs = 2000;
  animal.type.decayHappinessRateMs = 2000;
  expect(decayAnimalStats(animal)).toEqual({
    ...animal,
    hunger: 51,
    sleepiness: 100,
    happiness: 48, // Note happiness decreased by 2x because the animal is sleepy.
  });
});

test("decayAnimalStats - happiness should decay even faster when hungry and sleepy", () => {
  const now = new Date("2025-04-01T12:00:00Z");
  vi.setSystemTime(now);

  const lastUpdated = new Date(now);
  lastUpdated.setTime(now.getTime() - 2000); // Set the last updated time to be 2000ms before now.
  const animal = mockAnimal({
    lastUpdated,
    hunger: 100,
    sleepiness: 100,
    happiness: 50,
  });
  animal.type.decayHungerRateMs = 2000;
  animal.type.decaySleepinessRateMs = 2000;
  animal.type.decayHappinessRateMs = 2000;
  expect(decayAnimalStats(animal)).toEqual({
    ...animal,
    hunger: 100,
    sleepiness: 100,
    happiness: 46, // Note happiness decreased by 4x because the animal is hungry and sleepy.
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
      decaySleepinessRateMs: 2000,
      decayHappinessRateMs: 1000,
      imgSrc: "/test-animal.svg",
      imgAlt: "A test animal",
    },
    lastUpdated: new Date(),
    hunger: 50,
    sleepiness: 50,
    happiness: 50,
    ...overrides,
  };
}
