import { ImageRequireSource, ImageSourcePropType } from "react-native";
import { ImageSource } from "react-native-fb-collage/built/fb-collage.type";

export interface AccountProps {
  gender: string;
  birthday: string | number;
  location: string;
  name: string;
  phoneNumber: string;
}
interface StatusProps {
  title: string;
  date: number;
  liked: number | 0;
  image: ImageSource[];
}
export interface PersonProps {
  id: number;
  name: string;
  avatar: ImageSourcePropType;
  status: StatusProps;
  unRead?: number;
}

export interface ImageFragment {
  path?: ImageRequireSource;
}

export interface CategoryFragment {
  id?: string;
  name?: string;
  color?: string;
  emoji?: string;
  description?: string;
  icon?: ImageFragment;
  type?: {
    id?: Category_Types_Enum;
  };
}

export interface WalletFragment {
  id?: string;
  name?: string;
  color?: string;
  icon?: ImageFragment;
  total_transactions?: number;
  amount?: number;
}

export interface TransactionFragment {
  id?: string;
  name?: string;
  amount?: number;
  note?: string;
  type_id?: Category_Types_Enum;
  category?: CategoryFragment;
  transaction_at?: number;
}

export interface StatisticFragment {
  id?: string;
  name?: string;
  percent?: number;
  amount?: number;
  type_id?: Category_Types_Enum;
}

export interface AssetFragment {
  id?: string;
  name?: string;
  percent?: number;
  amount?: number;
  type_id?: Category_Types_Enum;
  description?: number;
  point?: string;
}

export interface BillFragment {
  id?: string;
  amount?: number;
  category?: CategoryFragment;
  date?: number;
  name?: string;
}

export interface FriendFragment {
  id?: string;
  image?: ImageFragment;
}

export enum Category_Types_Enum {
  Income = "income",
  Expense = "expense",
}
export enum Crypto_Types_Enum {
  Grow = "grow",
  Down = "down",
}

export enum View_Types_Enum {
  Full = "full",
  Left = "left",
  Right = "right",
  Middle = "middle",
  Half = "Half",
}

export enum Format_Types_Enum {
  Limit = "limit",
  Saving = "saving",
  Inky = "inky",
  Default = "default",
  Secure = "secure",
}

export enum Animation_Types_Enum {
  SlideTop,
  SlideBottom,
  SlideInRight,
  SlideInLeft,
}
export enum Food_Types_Enum {
  Favorites = "Favorites",
  Recent = "Recent",
}
export enum EKeyAsyncStorage {
  theme = "theme",
  intro = "intro",
}
