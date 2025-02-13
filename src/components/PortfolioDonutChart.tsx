import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { usePortfolioData } from "../hooks/usePortfolioData";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CF5", "#FF6384", "#FF69B4", "#CD5C5C"];

const PortfolioDonutChart: React.FC = () => {
    const { assets, positions, loading, error } = usePortfolioData();
    const [viewByClass, setViewByClass] = useState(false);

    if (loading) return <p className="text-center text-gray-500">Loading chart...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!positions.length) return <p className="text-center text-gray-500">No data available.</p>;

    let chartData;
    if (viewByClass) {
        // Aggregate by asset class (stock, crypto, fiat)
        const classData: Record<string, number> = {};
        positions.forEach((position) => {
            const asset = assets.find((a) => a.id.toString() === position.id.toString());
            if (asset) {
                classData[asset.type] = (classData[asset.type] || 0) + position.quantity * position.price;
            }
        });

        chartData = Object.entries(classData).map(([type, value], index) => ({
            name: type.charAt(0).toUpperCase() + type.slice(1),
            value,
            color: COLORS[index % COLORS.length],
        }));
    } else {
        // Show breakdown by individual asset
        chartData = positions.map((position, index) => {
            const asset = assets.find((a) => a.id.toString() === position.id.toString());
            return {
                name: asset ? asset.name : `⚠ Unknown Asset (ID: ${position.asset})`,
                value: position.quantity * position.price,
                color: COLORS[index % COLORS.length],
            };
        });
    }

    // Ensure even small-value assets (e.g., fiat) are visible
    const totalValue = chartData.reduce((sum, entry) => sum + entry.value, 0);
    chartData = chartData.map((entry) => ({
        ...entry,
        value: entry.value < totalValue * 0.02 ? totalValue * 0.02 : entry.value // Min 2% of total
    }));

    return (
        <div className="p-4 bg-white shadow-md rounded-lg flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">Portfolio Breakdown</h2>
            <button
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => setViewByClass(!viewByClass)}
            >
                {viewByClass ? "View by Asset" : "View by Asset Class"}
            </button>
            <div className="w-[350px] h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={120}
                            paddingAngle={5}
                            dataKey="value"
                            label
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" align="center" layout="horizontal" iconSize={10} wrapperStyle={{ marginTop: 10 }} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PortfolioDonutChart;
