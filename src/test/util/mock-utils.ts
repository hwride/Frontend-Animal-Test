import { AnimalData } from "../../types/AnimalData.ts";

export function mockAnimal(overrides?: Partial<AnimalData>): AnimalData {
  return {
    id: "1234",
    name: "John",
    type: {
      typeId: "test-animal",
      labelId: "test-animal",
      decayHungerRateMs: 500,
      decaySleepinessRateMs: 2000,
      decayHappinessRateMs: 1000,
      imgSrc: "/test-animal.svg",
      imgAltMessageId: "test-animal-img-alt",
    },
    lastUpdated: new Date(),
    hunger: 50,
    sleepiness: 50,
    happiness: 50,
    ...overrides,
  };
}
