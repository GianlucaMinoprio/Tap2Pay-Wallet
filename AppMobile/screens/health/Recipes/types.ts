import { ImageSourcePropType } from "react-native";

export interface MealRecipesProps {
  id: number;
  name: string;
  image: ImageSourcePropType;
  cals: number;
}
