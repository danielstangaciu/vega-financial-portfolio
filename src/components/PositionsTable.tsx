import { usePortfolioData } from "../hooks/usePortfolioData";

const PositionsTable: React.FC = () => {
    const { assets, positions, loading, error } = usePortfolioData();

    console.log("🔍 Positions Data:", positions);
    console.log("🔍 Assets Data:", assets);

    if (loading) return <p className="text-center text-gray-500">Loading positions...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!positions.length) return <p className="text-center text-gray-500">No positions available.</p>;

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Portfolio Positions</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Asset</th>
                        <th className="border border-gray-300 px-4 py-2">Class</th>
                        <th className="border border-gray-300 px-4 py-2">Quantity</th>
                        <th className="border border-gray-300 px-4 py-2">Price</th>
                        <th className="border border-gray-300 px-4 py-2">Total Value</th>
                    </tr>
                </thead>
                <tbody>
                    {positions.map((pos) => {
                        const asset = assets.find((a) => a.id.toString() === pos.id.toString());
                        return (
                            <tr key={pos.id} className="border-t">
                                <td className="border border-gray-300 px-4 py-2">
                                    {asset ? asset.name : `⚠ Unknown Asset (ID: ${pos.asset})`}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {asset ? asset.type.charAt(0).toUpperCase() + asset.type.slice(1) : "N/A"}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{pos.quantity}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    ${pos.price.toFixed(2)}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    ${(pos.quantity * pos.price).toFixed(2)}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default PositionsTable;
