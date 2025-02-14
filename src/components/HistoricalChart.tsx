import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { usePortfolioData } from "../hooks/usePortfolioData";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";

const HistoricalChart: React.FC = () => {
    const { historicalPortfolios, loading, error } = usePortfolioData();

    if (loading) return <p className="chart-loading">Loading chart data...</p>;
    if (error) return <p className="chart-error">{error}</p>;
    if (!historicalPortfolios || historicalPortfolios.length === 0) {
        return <p className="chart-no-data">No historical data available.</p>;
    }

    return (
        <Container className="chart-container">
            <Card className="chart-card">
                <h2 className="chart-title">📈 Portfolio Value Over Time</h2>
                <div className="chart-wrapper">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={historicalPortfolios}>
                            <CartesianGrid strokeDasharray="3 3" className="chart-grid" />
                            <XAxis
                                dataKey="asOf"
                                tickFormatter={(value) => new Date(value).toISOString().split("T")[0]}
                                className="chart-axis"
                            />
                            <YAxis className="chart-axis" />
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
