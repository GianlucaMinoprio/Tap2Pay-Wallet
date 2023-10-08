import {
  AssetFragment,
  Category_Types_Enum,
  StatisticFragment,
} from "constants/Type";

export const dataStatistic: StatisticFragment[] = [
  {
    id: "0",
    name: "1Month",
    percent: 12,
    amount: 32.68,
    type_id: Category_Types_Enum.Expense,
  },
  {
    id: "1",
    name: "3Month",
    percent: 27,
    amount: 82.68,
    type_id: Category_Types_Enum.Expense,
  },
  {
    id: "2",
    name: "6Month",
    percent: 9,
    amount: 46.68,
    type_id: Category_Types_Enum.Income,
  },
  {
    id: "3",
    name: "1Year",
    percent: 12,
    amount: 32.68,
    type_id: Category_Types_Enum.Expense,
  },
  {
    id: "4",
    name: "3Year",
    percent: 27,
    amount: 82.68,
    type_id: Category_Types_Enum.Expense,
  },
  {
    id: "5",
    name: "All",
    percent: 9,
    amount: 46.68,
    type_id: Category_Types_Enum.Income,
  },
];

export const dataAsset: AssetFragment[] = [
  {
    id: "0",
    name: "APPLE",
    amount: 215.5,
    percent: 12,
    type_id: Category_Types_Enum.Expense,
    description: 55,
    point: "12,468APP",
  },
  {
    id: "1",
    name: "AMAZON",
    amount: 215.5,
    percent: 2.1,
    type_id: Category_Types_Enum.Income,
    description: 23,
    point: "3,579AMZ",
  },
  {
    id: "2",
    name: "GOOGLE",
    amount: 215.5,
    percent: 12,
    type_id: Category_Types_Enum.Expense,
    description: 12,
    point: "801GOO",
  },
  {
    id: "3",
    name: "FACEBOOK",
    amount: 215.5,
    percent: 12,
    type_id: Category_Types_Enum.Expense,
    description: 8,
    point: "467FBS",
  },
];
