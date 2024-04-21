interface IRefunds {
  id: number;
  amount: number;
  type: string;
  date: Date;
  approved: boolean;
}

interface IBalance {
  walletBalance: number;
  platformBalance: number;
}
