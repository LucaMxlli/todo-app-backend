import { ICoin, ICoinOverview } from '@/types/responses/coin';
import { lamportsToSol } from './wallet.lib';

export const getCoinOverview = (coin: any): ICoinOverview => {
  const type = coin.type;

  let presale = coin.Tokenomics.find((t: any) => t.tokenomicsType.name === 'Presale')?.value || 0;
  let price = 0;

  if (type === 'fair-launch') {
    price = (coin.totalSupply * presale) / lamportsToSol(coin.totalRaise);
  }

  return {
    id: coin.id,
    bannerImage: coin.bannerImage,
    symbolImage: coin.symbolImage,
    state: (coin.currentState[0] as any)?.state.name || '',
    name: coin.name,
    symbol: coin.symbolName,
    contractAddress: coin.contactAddress || '',
    target: coin.totalRaise,
    current: coin.current,
    supporters: coin.supporters,
    presale: presale * 100,
    price: price,
    unsold: coin.unsoldTokens || 'burn',
    opens: coin.opensAt,
    closes: coin.closesAt,
    holdDuration: coin.holdDuration,
  };
};

//TODO: needs to be finished -> please keep in mind that some values need to be calculated -> set them to zero by default

export const getCoinDetail = (coin: any): any => {
  const type = coin.type;

  let presale = coin.Tokenomics.find((t: any) => t.tokenomicsType.name === 'Presale')?.value || 0;
  let price = 0;

  if (type === 'fair-launch') {
    price = (coin.totalSupply * presale) / lamportsToSol(coin.totalRaise);
  }
  return {
    id: coin.id,
    symbolImage: coin.symbolImage,
    bannerImage: coin.bannerImage,
    state: coin.currentState[0].state.name,
    name: coin.name,
    symbol: coin.symbolName,
    description: coin.description,
    socials: coin.platformLinks.map((s: any) => {
      return {
        id: s.platformType.id,
        name: s.platformType?.name,
        value: s.link,
      };
    }),
    contractAddress: coin.contactAddress || '',
    decimals: coin.decimals,
    totalSupply: Number(coin.totalSupply),
    target: coin.totalRaise,
    current: coin.current,
    softcap: coin.softcap,
    price: price,
    opens: coin.opensAt,
    closes: coin.closesAt,
    minPurchase: coin.minPurchase,
    maxPurchase: coin.maxPurchase,
    currentRate: coin.currentRate,
    holdDuration: coin.holdDuration,
    tokenomics: coin.Tokenomics.map((t: any) => {
      return {
        type: t.tokenomicsType.name,
        value: Number(t.value * 100),
      };
    }),
  };
};

export const getCoinInvestment = (investment: any): IInvestment => {
  return {
    signature: investment.signature,
    date: investment.placedAt,
    isConfirmed: investment.isApproved,
    state: investment?.currentState[0]?.state.name || '',
    amount: investment.amount,
    type: {
      name: investment.investmentType.name,
      fee: investment.investmentType.fee.name,
    },
  };
};

// TODO: calc contribution
export const getCoinContribution = (coin: any): ICoinContribution => {
  return {
    deposit: coin.deposit,
    shares: coin.shares,
    allocation: coin.allocation,
    claimed: coin.claimed,
  };
};
