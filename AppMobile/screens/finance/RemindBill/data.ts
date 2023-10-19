import { Images } from "assets/images";
import { BillFragment, FriendFragment,Category_Types_Enum,
  TransactionFragment,
  WalletFragment,
  SendRequestFragment, } from "constants/Type";


export const dataBill: BillFragment[] = [
  {
    id: "0",
    category: {
      name: "Ethereum",
      color: "#88D498",
      icon: { path: Images.eth },
    },
    amount: 5680,
    date: 1640413705000,
  },
];

export const dataFriend: FriendFragment[] = [
  {
    id: "0",
    image: { path: { uri: "https://api.dicebear.com/7.x/bottts-neutral/png?seed=0xbb6fF924Fe33b35eA8B2bE7923eDa2948a9E2c45" } },
  },
  {
    id: "1",
    image: { path: { uri: "https://api.dicebear.com/7.x/bottts-neutral/png?seed=0xa3CF9f02Ca76D32D54fbB7aa6cdd7395a3321d30" } },
  },
  {
    id: "2",
    image: { path: { uri: "https://api.dicebear.com/7.x/bottts-neutral/png?seed=0xbb6fF924Fe33b35eA8B2bE7923eDa2948aDE2c21" } },
  },
  {
    id: "3",
    image: { path: { uri: "https://api.dicebear.com/7.x/bottts-neutral/png?seed=0xa3CF9f02Ca7dD32D54fbB7aa6cd57395a3321d98" } },
  },
  {
    id: "4",
    image: { path: { uri: "https://api.dicebear.com/7.x/bottts-neutral/png?seed=0xbb6fF924Fe33b35eA8B2bE7923eDa2948a9E2c97" } },
  },
];

export const dataTransaction: TransactionFragment[] = [
  {
    id: "1",
    name: "John Doe",
    note: "",
    amount: 56,
    type_id: Category_Types_Enum.Expense,
    transaction_at: 1611574677000,
  },
  {
    id: "2",
    name: "French Coffee",
    note: "",
    amount: 8,
    type_id: Category_Types_Enum.Expense,
    transaction_at: 1611574677000,
  },
  {
    id: "3",
    name: "David Tran",
    note: "",
    amount: 13,
    type_id: Category_Types_Enum.Expense,
    transaction_at: 1611574677000,
  },
];

export const dataSendReq: SendRequestFragment[] = [
  {
    id: "0",
    category: {
      name: "Pay",
      color: "#FFFFFF",
    },
  },
  {
    id: "1",
    category: {
      name: "Request",
      color: "#FFFFFF",
    },
  },
];
