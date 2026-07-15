export interface WalletBalance {
  address: string;
  nativeBalance: string;
  source: "alchemy" | "moralis";
}

export interface WalletSummary {
  address: string;
  alchemy: WalletBalance | null;
  moralis: WalletBalance | null;
  fetchedAt: string;
}