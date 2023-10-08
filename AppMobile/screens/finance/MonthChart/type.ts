export type Spend = {
  category_id: string;
  category_name: string;
  amount: number;
  color: string;
  emoji: string;
};

export type Earn = {
  category_id: string;
  category_name: string;
  amount: number;
  color: string;
};

export type ExpensesStat = {
  totalExpenses: number;
  spends: Spend[];
};

export type IncomeStat = {
  totalIncomes: number;
  earns: Earn[];
};
