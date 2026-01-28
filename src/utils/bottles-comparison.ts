import { BottleType } from "@/types";

export const bottlesComparison = (
  objectData: BottleType,
  oldObjectData: BottleType,
) => {
  const newBottle = { ...objectData };
  const oldBottle = { ...oldObjectData };

  const newBottleKeys = Object.keys(newBottle);
  const oldBottleKeys = Object.keys(oldBottle);

};
