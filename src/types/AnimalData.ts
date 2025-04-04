export type StatName = "hunger" | "happiness" | "sleepiness";

export type AnimalType = {
  typeId: string;
  label: string;
  imgSrc: string;
  imgAlt: string;
  decayHungerRateMs: number;
  decayHappinessRateMs: number;
  decaySleepRateMs: number;
};

export type AnimalData = {
  id: string;
  type: AnimalType;
  name: string;
  hunger: number;
  happiness: number;
  sleepiness: number;
  lastUpdated: Date;
};
