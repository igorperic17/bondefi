export interface CreateTokenProps {
  name: string;
  symbol: string;
  targetRaise: string;
  purchaseToken: string;
  saleStart: Date;
  saleEnd: Date;
  purchaseFormula: string;
  reserveRatio: number;
}
