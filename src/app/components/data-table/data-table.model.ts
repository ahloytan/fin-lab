export interface PortfolioAsset {
  id: number;
  assetName: string;
  symbol: string;
  category: string;
  quantity: number;
  averageCost: number;
  currentPrice: number;
  purchaseDate: string;
}