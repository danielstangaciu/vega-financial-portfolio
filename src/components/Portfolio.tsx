import { useEffect, useState } from "react";
import { fetchAssets, fetchPortfolio } from "../services/api";
import { Asset, Portfolio } from "../services/api";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";

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

    if (loading) return <p className="text-gray-300 text-center">Loading portfolio...</p>;
    if (error) return <p className="text-red-400 text-center">{error}</p>;

    return (
        <Container className="p-6">
            <Card className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20">
                <h2 className="text-2xl font-bold mb-6">Portfolio Overview</h2>

                <div className="mb-6">
                    <h3 className="text-lg font-semibold">Assets</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {assets.map(asset => (
                            <span
                                key={asset.id}
                                className="px-3 py-1 bg-white/30 rounded-md text-sm font-medium"
                            >
                                {asset.name} ({asset.type})
                            </span>
                        ))}
                    </div>
                </div>

                {portfolio && (
                    <div>
                        <h3 className="text-lg font-semibold">
                            Positions (as of <span className="font-bold">{portfolio.asOf.split("T")[0]}</span>)
                        </h3>
                        <div className="overflow-x-auto mt-3">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-white/30 text-left bg-white/10">
                                        <th className="p-3 font-semibold">Asset</th>
                                        <th className="p-3 font-semibold">Quantity</th>
                                        <th className="p-3 font-semibold">Price</th>
                                        <th className="p-3 font-semibold">Total Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {portfolio.positions.map(pos => {
                                        const asset = assets.find(a => a.id.toString() === pos.id.toString());
                                        return (
                                            <tr key={pos.id} className="border-b border-white/10">
                                                <td className="p-2">{asset ? asset.name : "Unknown"}</td>
                                                <td className="p-2">{pos.quantity}</td>
                                                <td className="p-2">${pos.price.toFixed(2)}</td>
                                                <td className="p-2 font-semibold">${(pos.quantity * pos.price).toFixed(2)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </Card>
        </Container>
    );
};

export default FinancialPortfolio;
