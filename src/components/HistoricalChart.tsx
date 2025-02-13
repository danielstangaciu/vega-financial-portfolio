import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { usePortfolioData } from "../hooks/usePortfolioData";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";

const HistoricalChart: React.FC = () => {
    const { historicalPortfolios, loading, error } = usePortfolioData();

    if (loading) return <p className="text-center text-gray-500">Loading chart data...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!historicalPortfolios || historicalPortfolios.length === 0) {
        return <p className="text-center text-gray-500">No historical data available.</p>;
    }

    return (
        <Container className="p-6">
            <Card className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg rounded-xl border border-gray-700 text-white">
                <h2 className="text-2xl font-semibold mb-4">Portfolio Value Over Time</h2>
                <div className="w-full h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={historicalPortfolios}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.2)" />
                            <XAxis
                                dataKey="asOf"
                                tickFormatter={(value) => new Date(value).toISOString().split("T")[0]}
                                stroke="white"
                            />
                            <YAxis stroke="white" />
                            <Tooltip
                                contentStyle={{ backgroundColor: "rgba(0,0,0,0.7)", borderRadius: "8px", color: "white" }}
                                labelStyle={{ color: "#FFD700" }}
                            />
                            <Line type="monotone" dataKey="value" stroke="#4F46E5" strokeWidth={2} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </Container>
    );
};

export default HistoricalChart;
