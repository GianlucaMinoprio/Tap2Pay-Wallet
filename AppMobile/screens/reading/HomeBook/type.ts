import { ImageSourcePropType } from "react-native";

export interface BookProps {
  id: number;
  title: string;
  author: string;
  time: number;
  image: ImageSourcePropType;
  isBookMark: boolean;
}
