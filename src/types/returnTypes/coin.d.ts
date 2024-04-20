export interface ICoinOverview {
  id: number;
  name: string;
  symbolName: string;
  bannerImage: string;
  currentTarget: number;
  targetAmount: number;
  investorCount: number;
  hardCap: number;
  softCap: number;
  currentState: {
    name: string;
    validFrom: Date;
    id: number;
  };
  fundingEnd?: Date;
}

export interface ICoinFeatured {
  id: number;
  name: string;
  symbolName: string;
  bannerImage: string;
  symbolImage: string;

  currentState: {
    validFrom: Date;
    name: string;
    id: number;
  };
}

export interface ISocialPlatform {
  link: string;
  platformType: string;
  id: number;
}

export interface ICoin extends ICoinOverview {
  description: string;
  buyLink?: string;
  watchLink?: string;
  userId: number;
  contactAddress?: string;
  symbolImage: string;
  maxInvestment: number;
  minInvestment: number;
  decimals: number;
  totalSupply: number;
  links: ISocialPlatform[];
}

export interface ICoinSupporter {
  supporter: string;
  profilePicture: string;
}
