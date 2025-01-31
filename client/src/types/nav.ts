export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
}

export enum PriceChangePercentage {
  HOUR = "price_change_percentage_1h_in_currency",
  DAY = "price_change_percentage_24h_in_currency",
  WEEK = "price_change_percentage_7d_in_currency",
  MONTH = "price_change_percentage_30d_in_currency",
  YEAR = "price_change_percentage_1y_in_currency",
}

export type Circle = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  dragging: boolean;
  targetRadius: number;
  symbol: string;
  coinName: string;
  radius: number;
  [PriceChangePercentage.HOUR]: number;
  [PriceChangePercentage.DAY]: number;
  [PriceChangePercentage.WEEK]: number;
  [PriceChangePercentage.MONTH]: number;
  [PriceChangePercentage.YEAR]: number;
  image: string;
  text2: Text | null;
};

interface ROI {
  times: number;
  currency: string;
  percentage: number;
}

export interface CoingeckoCoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number | null;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: ROI | null;
  last_updated: string;
  sparkline_in_7d: SparklineData;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_1y_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_30d_in_currency: number;
  price_change_percentage_7d_in_currency: number;
}
export interface SparklineData {
  price: number[];
}
