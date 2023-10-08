import { Images } from "assets/images";
import {
  Category_Types_Enum,
  TransactionFragment,
  WalletFragment,
} from "constants/Type";

export const dataWallet: WalletFragment[] = [
  {
    id: "0",
    name: "Living",
    icon: { path: Images.life },
    color: "#215191",
    total_transactions: 795.2,
    amount: 5680,
  },
  {
    id: "1",
    name: "Entertainment",
    icon: { path: Images.entertainment },
    color: "#4B9BAE",
    total_transactions: 177.6,
    amount: 1480,
  },
  {
    id: "2",
    name: "Shopping",
    icon: { path: Images.shopping },
    color: "#949398",
    total_transactions: 511.2,
    amount: 5680,
  },
  {
    id: "3",
    name: "Food & Drink",
    icon: { path: Images.food },
    color: "#00D65B",
    total_transactions: 1306.4,
    amount: 5680,
  },
  {
    id: "4",
    name: "Travel",
    icon: { path: Images.travel },
    color: "#0EAD69",
    total_transactions: 624.8,
    amount: 5680,
  },
  {
    id: "5",
    name: "Health",
    icon: { path: Images.health },
    color: "#FA4169",
    total_transactions: 340.8,
    amount: 5680,
  },
  {
    id: "6",
    name: "Education",
    icon: { path: Images.education },
    color: "#FE9870",
    total_transactions: 170.4,
    amount: 5680,
  },
];

export const dataTransaction: TransactionFragment[] = [
  {
    id: "1",
    name: "Food & Drink",
    note: "",
    amount: 56,
    type_id: Category_Types_Enum.Expense,
    category: {
      id: "category_id1",
      icon: { path: Images.shopping },
    },
    transaction_at: 1611574677000,
  },
  {
    id: "2",
    name: "Entertainment",
    note: "",
    amount: 8,
    type_id: Category_Types_Enum.Expense,
    category: {
      id: "category_id1",
      icon: { path: Images.education },
    },
    transaction_at: 1611574677000,
  },
  {
    id: "3",
    name: "Shopping",
    note: "",
    amount: 13,
    type_id: Category_Types_Enum.Expense,
    category: {
      id: "category_id1",
      icon: { path: Images.life },
    },
    transaction_at: 1611574677000,
  },
];
