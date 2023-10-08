import { Images } from "assets/images";
import { BillFragment, FriendFragment } from "constants/Type";

export const dataTab = [
  {
    name: "house",
  },
  {
    name: "creditCard",
  },
  {
    image: Images.uiLogo,
  },
  {
    name: "star",
  },
  {
    name: "user",
  },
];

export const dataBill: BillFragment[] = [
  {
    id: "0",
    category: {
      name: "Water",
      color: "#F0DF67",
      icon: { path: Images.life },
    },
    amount: 5680,
    date: 1640413705000,
  },
  {
    id: "1",
    category: {
      name: "Water",
      color: "#4B9BAE",
      icon: { path: Images.life },
    },
    amount: 5680,
    date: 1640413705000,
  },
  {
    id: "2",
    category: {
      name: "Water",
      color: "#4B9BAE",
      icon: { path: Images.life },
    },
    amount: 5680,
    date: 1640413705000,
  },
];

export const dataFriend: FriendFragment[] = [
  {
    id: "0",
    image: { path: Images.avatar2 },
  },
  {
    id: "1",
    image: { path: Images.avatar3 },
  },
  {
    id: "2",
    image: { path: Images.avatar4 },
  },
  {
    id: "3",
    image: { path: Images.avatar0 },
  },
  {
    id: "4",
    image: { path: Images.avatar0 },
  },
];

export const dataChart: number[] = [
  1000000,
  3000000,
  4000000,
  6000000,
  7000000,
  8000000,
  10000000,
  11000000,
  13000000,
  14000000,
  16000000,
  17000000,
  19000000,
  20000000,
  22000000,
  23000000,
  24000000,
  25000000,
  26000000,
  27000000,
  28000000,
  29000000,
  30000000,
  29000000,
  28000000,
  27000000,
  26000000,
  25000000,
  30000000,
  31000000,
  35000000,
];
