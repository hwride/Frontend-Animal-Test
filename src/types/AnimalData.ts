export type StatName = "hunger" | "happiness" | "sleep";

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
  sleep: number;
  lastUpdated: Date;
};
