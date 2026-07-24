export enum AssetCategory {
  US_STOCK = 'US Stock',
  SG_STOCK = 'SG Stock',
  ETF = 'ETF',
  REIT = 'REIT',
  CRYPTOCURRENCY = 'Cryptocurrency',
}

export const CATEGORIES = ['US Stock', 'SG Stock', 'ETF', 'REIT', 'Cryptocurrency'];
export const DISPLAYED_COLUMNS = ['assetName', 'symbol', 'category', 'quantity', 'averageCost', 'currentPrice', 'marketValue', 'profitLoss'];
export const PAGE_SIZE = [5, 10, 15];