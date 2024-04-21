import { ICoin, ICoinOverview } from '@/types/responses/coin';

export const getCoinOverview = (coin: any): ICoinOverview => {
  const type = coin.type;
  let presale = coin.Tokenomics.find((t: any) => t.tokenomicsType.name === 'Presale')?.value || 0;
  let price = 0;

  if (type === 'fair-launch') {
    price = (coin.totalSupply * presale) / coin.totalRaise;
  }

  return {
    id: coin.id,
    bannerImage: coin.bannerImage,
    symboldImage: coin.symbolImage,
    state: coin.currentState[0].state.name,
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

export const getCoinDetail = (coin: any): ICoin => {
  return {
    id: coin.id,
    symboldImage: coin.symbolImage,
    bannerImage: coin.bannerImage,
    state: coin.currentState[0].state.name,
    name: coin.name,
    symbol: coin.symbolName,
    description: coin.description,
    socials: coin.platformLinks.map((s: any) => {
      return {
        id: s.id,
        name: s.socialType.name,
        value: s.value,
      };
    }),
    contractAddress: coin.contactAddress || '',
    decimals: coin.decimals,
    totalSupply: coin.totalSupply,
    target: coin.totalRaise,
    current: coin.current,
    softcap: coin.softcap,
    price: coin.price,
    opens: coin.opensAt,
    closes: coin.closesAt,
    minPurchase: coin.minPurchase,
    maxPurchase: coin.maxPurchase,
    currentRate: coin.currentRate,
    holdDuration: coin.holdDuration,
    tokenomics: coin.Tokenomics.map((t: any) => {
      return {
        type: t.tokenomicsType.name,
        value: t.value,
      };
    }),
  };
};
