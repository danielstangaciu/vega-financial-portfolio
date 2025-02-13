import { useEffect, useState } from "react";
import { fetchAssets, fetchPortfolio } from "../services/api";
import { Asset, Portfolio, Position } from "../services/api";

export function usePortfolioData() {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [positions, setPositions] = useState<Position[]>([]);
    const [historicalPortfolios, setHistoricalPortfolios] = useState<{ asOf: string; value: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const assetsData = await fetchAssets();
                const portfoliosData = await fetchPortfolio();

                console.log("Fetched Assets:", assetsData);
                console.log("Fetched Portfolios:", portfoliosData);

                setAssets(assetsData);

                if (portfoliosData.length > 0) {
                    // Sort portfolios by date (oldest first)
                    const sortedPortfolios = portfoliosData.sort(
                        (a, b) => new Date(a.asOf).getTime() - new Date(b.asOf).getTime()
                    );

                    // Extract ALL positions across all portfolios
                    const allPositions: Position[] = sortedPortfolios.flatMap(portfolio => portfolio.positions);
                    console.log("Extracted All Positions:", allPositions);

                    setPositions(allPositions);

                    // Validate positions against assets
                    allPositions.forEach((pos) => {
                        const matchedAsset = assetsData.find((a) => a.id.toString() === pos.asset.toString());
                        if (!matchedAsset) {
                            console.warn(`Missing asset for position: ${pos.asset}`);
                        }
                    });

                    // Transform historical data for chart
                    const portfolioValues = sortedPortfolios.map(portfolio => {
                        const totalValue = portfolio.positions.reduce((sum, pos) => sum + pos.quantity * pos.price, 0);
                        return { asOf: portfolio.asOf, value: totalValue };
                    });

                    setHistoricalPortfolios(portfolioValues);
                }
            } catch (err) {
                console.error("Error fetching portfolio data:", err);
                setError("Error fetching portfolio data.");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return { assets, positions, historicalPortfolios, loading, error };
}
