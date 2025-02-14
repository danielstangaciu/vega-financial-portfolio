import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { usePortfolioData } from "../hooks/usePortfolioData";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const COLORS = ["#2563EB", "#10B981", "#FACC15", "#F97316", "#9333EA", "#EC4899", "#EF4444", "#6B7280"];

const PortfolioDonutChart: React.FC = () => {
    const { assets, positions, loading, error } = usePortfolioData();
    const [viewByClass, setViewByClass] = useState(false);

    if (loading) return <p className="text-center text-gray-500">Loading chart...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!positions.length) return <p className="text-center text-gray-500">No data available.</p>;

    let chartData;
    if (viewByClass) {
        const classData: Record<string, number> = {};
        positions.forEach((position) => {
            const asset = assets.find((a) => a.id === position.id.toString());
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
        chartData = positions.map((position, index) => {
            const asset = assets.find((a) => a.id === position.id.toString());
            return {
                name: asset ? asset.name : `⚠ Unknown (ID: ${position.asset})`,
                value: position.quantity * position.price,
                color: COLORS[index % COLORS.length],
            };
        });
    }

    return (
        <Card className="card">
            <h2 className="text-2xl font-semibold mb-4">Portfolio Breakdown</h2>

            <Button
                onClick={() => setViewByClass(!viewByClass)}
                className="btn"
            >
                {viewByClass ? "View by Asset" : "View by Asset Class"}
            </Button>

            {/* 🔹 Fully Responsive Chart Container */}
            <div className="donut-chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius="40%"
                            outerRadius="70%"
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={1} />
                            ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)", color: "#fff" }} />
                        <Legend
                            verticalAlign="bottom"
                            align="center"
                            layout="horizontal"
                            iconSize={10}
                            wrapperStyle={{ marginTop: 15, color: "#fff" }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default PortfolioDonutChart;
