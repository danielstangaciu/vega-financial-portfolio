// src/services/api.ts
export interface Asset {
  id: string;
  name: string;
  type: "stock" | "crypto" | "fiat";
}

export interface Price {
  id: string;
  asset: string;
  price: number;
}

export interface Position {
  id: number;
  asset: string;
  quantity: number;
  asOf: string;
  price: number;
}

export interface Portfolio {
  id: string;
  asOf: string;
  positions: Position[];
}

//setting up a JSON Server on port 3000 with a db containing the mock data received
const API_BASE_URL = "http://localhost:3000";


//return list of assets
export const fetchAssets = async (): Promise<Asset[]> => {
  const response = await fetch(`${API_BASE_URL}/assets`);
  if (!response.ok) throw new Error("Failed to fetch assets");
  return response.json();
};


//returns prices for requested asset
export const fetchPrices = async (assets: string[], asOf?: string): Promise<Price[]> => {
  const assetQuery = assets.join(",");
  const url = asOf ? `${API_BASE_URL}/prices?asset=${assetQuery}&asOf=${asOf}` : `${API_BASE_URL}/prices?asset=${assetQuery}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch prices");
  return response.json();
};


//return portfolio data based on asOf param
export const fetchPortfolio = async (asOf?: string): Promise<Portfolio> => {
  const url = asOf ? `${API_BASE_URL}/portfolios?asOf=${asOf}` : `${API_BASE_URL}/portfolios`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch portfolio");
  return response.json();
};
