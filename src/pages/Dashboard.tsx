import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Portfolio from "../components/Portfolio";
import PortfolioDonutChart from "../components/PortfolioDonutChart";
import PositionsTable from "../components/PositionsTable";
import HistoricalChart from "../components/HistoricalChart";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Container from "../components/ui/Container";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("donut");

  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Container className="min-h-screen bg-gradient-to-br from-background to-primary text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-wide">Financial Dashboard</h1>
        <Button variant="accent" onClick={auth?.logout}>Logout</Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6 border-b border-white/20 pb-2">
        <button className={`px-4 py-2 rounded-t-md transition-all ${activeTab === "donut" ? "bg-white/20 text-gray-900" : "text-gray-400"}`} onClick={() => setActiveTab("donut")}>Asset Allocation</button>
        <button className={`px-4 py-2 rounded-t-md transition-all ${activeTab === "positions" ? "bg-white/20 text-gray-900" : "text-gray-400"}`} onClick={() => setActiveTab("positions")}>Current Holdings</button>
        <button className={`px-4 py-2 rounded-t-md transition-all ${activeTab === "history" ? "bg-white/20 text-gray-900" : "text-gray-400"}`} onClick={() => setActiveTab("history")}>Performance Over Time</button>
      </div>

      {/* Conditional Rendering */}
      {activeTab === "donut" && (
        <Card className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Asset Allocation</h2>
          <PortfolioDonutChart />
        </Card>
      )}

      {activeTab === "positions" && (
        <Card className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Current Holdings</h2>
          <PositionsTable />
        </Card>
      )}

      {activeTab === "history" && (
        <Card className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Portfolio Performance Over Time</h2>
          <HistoricalChart />
        </Card>
      )}
    </Container>
  );
};

export default Dashboard;
