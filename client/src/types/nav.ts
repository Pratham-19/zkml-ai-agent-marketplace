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
