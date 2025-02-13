import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { usePortfolioData } from "../hooks/usePortfolioData";

const HistoricalChart: React.FC = () => {
    const { historicalPortfolios, loading, error } = usePortfolioData();

    if (loading) return <p>Loading chart data...</p>;
    if (error) return <p>{error}</p>;

    if (!historicalPortfolios || historicalPortfolios.length === 0) {
        return <p>No historical data available.</p>;
    }

    return (
        <div className="p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Portfolio Value Over Time</h2>
            <div className="w-[500px] h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={historicalPortfolios}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="asOf"
                            tickFormatter={(value) => new Date(value).toISOString().split("T")[0]}
                        />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default HistoricalChart;
