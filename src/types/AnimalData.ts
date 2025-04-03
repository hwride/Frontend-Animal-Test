export type AnimalType = {
  typeId: string;
  label: string;
  imgSrc: string;
  imgAlt: string;
};

export type AnimalData = {
  id: string;
  type: AnimalType;
  name: string;
  hunger: number;
  happiness: number;
  sleep: number;
};
