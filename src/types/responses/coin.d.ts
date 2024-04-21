export interface ICoinOverview {
  id: number;
  bannerImage: string;
  symboldImage: string;
  state: string;
  name: string;
  symbol: string;
  contractAddress?: string;
  target: number;
  current: number;
  supporters: number;
  presale: number;
  price: number;
  unsold: 'burn' | 'refund' | string;
  opens: Date;
  closes: Date;
  holdDuration: number;
}

export interface ICoin {
  id: number;
  symboldImage: string;
  bannerImage: string;
  state: string;
  name: string;
  symbol: string;
  description: string;
  socials: ISocial[];
  contractAddress?: string;
  decimals: number;
  totalSupply: number;
  target: number;
  current: number;
  softcap: number;
  price: number;
  opens: Date;
  closes: Date;
  minPurchase: number;
  maxPurchase: number;
  currentRate: number;
  holdDuration: number;
  tokenomics: ITokenomics[];
}

export interface ISocial {
  id: number;
  name: string;
  value: string;
}

export interface ITokenomics {
  type: string;
  value: number;
}
