import { useEffect, useState } from "react";
import { fetchAssets, fetchPortfolio } from "../services/api";
import { Asset, Portfolio } from "../services/api";

const FinancialPortfolio = () => {
    const [assets, setAssets] = useState<Asset[]>([]);
    const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const assetsData = await fetchAssets();
                setAssets(assetsData);

                const portfoliosData = await fetchPortfolio();

                if (portfoliosData.length > 0) {
                    // Sort portfolios by date (latest first) and get the most recent one
                    const latestPortfolio = portfoliosData.sort(
                        (a, b) => new Date(b.asOf).getTime() - new Date(a.asOf).getTime()
                    )[0];

                    setPortfolio(latestPortfolio);
                } else {
                    setError("No portfolio data available.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Error fetching portfolio data.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) return <p>Loading portfolio...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Portfolio</h2>

            <h3 className="text-lg font-semibold">Assets</h3>
            <ul>
                {assets.map(asset => (
                    <li key={asset.id}>{asset.name} ({asset.type})</li>
                ))}
            </ul>

            {portfolio && (
                <>
                    <h3 className="text-lg font-semibold mt-4">Positions (as of {portfolio.asOf.split("T")[0]})</h3>
                    <ul>
                        {portfolio.positions.map(pos => (
                            <li key={pos.id}>
                                {pos.asset}: {pos.quantity} units @ ${pos.price}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default FinancialPortfolio;