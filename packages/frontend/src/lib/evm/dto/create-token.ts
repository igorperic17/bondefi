export interface CreateTokenProps {
  targetRaise: string;
  purchaseToken: string;
  saleStart: Date;
  saleEnd: Date;
  purchaseFormula: string;
  reserveRatio: number;
  name: string;
  symbol: string;
  description: string;
  iconUrl: string;
}
