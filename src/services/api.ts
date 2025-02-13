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

// Setting up a JSON Server on port 3000 with a db containing the mock data received
const API_BASE_URL = "http://localhost:3000";

// Helper function to handle API requests
const fetchData = async <T>(url: string): Promise<T | null> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`API Error: ${error.message}`);
    return null; // Ensures that even if an error occurs, components don’t break
  }
};

// Return list of assets
export const fetchAssets = async (): Promise<Asset[]> => {
  const data = await fetchData<Asset[]>(`${API_BASE_URL}/assets`);
  return data || []; // Return empty array as fallback
};

// Returns prices for requested assets
export const fetchPrices = async (assets: string[], asOf?: string): Promise<Price[]> => {
  const assetQuery = assets.join(",");
  const url = asOf
    ? `${API_BASE_URL}/prices?asset=${assetQuery}&asOf=${asOf}`
    : `${API_BASE_URL}/prices?asset=${assetQuery}`;

  const data = await fetchData<Price[]>(url);
  return data || [];
};

// Return portfolio data based on asOf param
export const fetchPortfolio = async (asOf?: string): Promise<Portfolio | null> => {
  const url = asOf ? `${API_BASE_URL}/portfolios?asOf=${asOf}` : `${API_BASE_URL}/portfolios`;

  const data = await fetchData<Portfolio>(url);
  return data;
};
