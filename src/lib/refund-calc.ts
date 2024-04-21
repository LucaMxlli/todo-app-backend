export const getRefundHistory = (refund: any): IRefund => {
  return {
    id: refund.id,
    amount: Number(refund.value),
    type: refund.type.name,
    date: refund.transacted_at,
    approved: refund.approved,
  };
};

export const getBalances = (wallet: number, platformBalance: number): IBalance => {
  return {
    walletBalance: wallet,
    platformBalance: platformBalance,
  };
};
