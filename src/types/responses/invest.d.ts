interface IActivationInvestment {
  fee: number;
  feeType: string;
}

interface IInvestment {
  signature: string;
  date: Date;
  isConfirmed: boolean;
  state: string;
  amount: number;
  type: {
    name: string;
    fee?: number;
  };
}

interface ICoinContribution {
  deposit: number;
  shares: number;
  allocation: number;
  claimed: ?boolean;
}
