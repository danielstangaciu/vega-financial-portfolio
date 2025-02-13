import { usePortfolioData } from "../hooks/usePortfolioData";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";

const PositionsTable: React.FC = () => {
    const { assets, positions, loading, error } = usePortfolioData();

    console.log("🔍 Positions Data:", positions);
    console.log("🔍 Assets Data:", assets);

    if (loading) return <p className="text-center text-gray-500">Loading positions...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!positions.length) return <p className="text-center text-gray-500">No positions available.</p>;

    return (
        <Container className="p-6">
            <Card className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg rounded-xl border border-gray-700 text-white">
                <h2 className="text-2xl font-semibold mb-4">Portfolio Positions</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                        <thead>
                            <tr className="bg-gray-700 text-gray-300 uppercase text-sm">
                                <th className="px-4 py-3">Asset</th>
                                <th className="px-4 py-3">Class</th>
                                <th className="px-4 py-3">Quantity</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Total Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {positions.map((pos, index) => {
                                const asset = assets.find((a) => a.id.toString() === pos.id.toString());
                                return (
                                    <tr key={pos.id} className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}>
                                        <td className="px-4 py-3 text-white font-medium">{asset ? asset.name : `⚠ Unknown (ID: ${pos.asset})`}</td>
                                        <td className="px-4 py-3 text-gray-300">{asset ? asset.type.charAt(0).toUpperCase() + asset.type.slice(1) : "N/A"}</td>
                                        <td className="px-4 py-3 text-gray-200">{pos.quantity}</td>
                                        <td className="px-4 py-3 text-green-400">${pos.price.toFixed(2)}</td>
                                        <td className="px-4 py-3 text-blue-400 font-semibold">${(pos.quantity * pos.price).toFixed(2)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>
        </Container>
    );
};

export default PositionsTable;
