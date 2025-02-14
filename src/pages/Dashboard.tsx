import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
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
  const [fullView, setFullView] = useState(false); // Toggle between views

  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Container className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Financial Dashboard</h1>
        <div className="flex space-x-4">
          {/* <Button
            onClick={() => setFullView(!fullView)}
            className="dashboard-button"
          >
            {fullView ? "Switch to Tab View" : "Switch to Full View"}
          </Button> */}

          <Button variant="accent" onClick={auth?.logout}>Logout</Button>
        </div>
      </div>

      {/* Full View: All components visible at once */}
      {fullView ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Donut Chart & Positions Table Side by Side */}
          <Card className="dashboard-card">
            <h2 className="dashboard-card-title">Asset Allocation</h2>
            <PortfolioDonutChart />
          </Card>
          <Card className="dashboard-card">
            <h2 className="dashboard-card-title">Current Holdings</h2>
            <PositionsTable />
          </Card>

          {/* Historical Chart Spanning Full Width */}
          <Card className="dashboard-card lg:col-span-2">
            <h2 className="dashboard-card-title">Portfolio Performance Over Time</h2>
            <HistoricalChart />
          </Card>
        </div>
      ) : (
        <>
          {/* Tab Navigation */}
          <div className="dashboard-tabs">
            <button
              className={`dashboard-tab-button ${activeTab === "donut" ? "dashboard-tab-active" : "dashboard-tab-inactive"}`}
              onClick={() => setActiveTab("donut")}
            >
              Asset Allocation
            </button>
            <button
              className={`dashboard-tab-button ${activeTab === "positions" ? "dashboard-tab-active" : "dashboard-tab-inactive"}`}
              onClick={() => setActiveTab("positions")}
            >
              Current Holdings
            </button>
            <button
              className={`dashboard-tab-button ${activeTab === "history" ? "dashboard-tab-active" : "dashboard-tab-inactive"}`}
              onClick={() => setActiveTab("history")}
            >
              Performance Over Time
            </button>
          </div>

          {/* Conditional Rendering for Tabbed View */}
          {activeTab === "donut" && (
            <Card className="dashboard-card">
              <h2 className="dashboard-card-title">Asset Allocation</h2>
              <PortfolioDonutChart />
            </Card>
          )}

          {activeTab === "positions" && (
            <Card className="dashboard-card">
              <h2 className="dashboard-card-title">Current Holdings</h2>
              <PositionsTable />
            </Card>
          )}

          {activeTab === "history" && (
            <Card className="dashboard-card">
              <h2 className="dashboard-card-title">Portfolio Performance Over Time</h2>
              <HistoricalChart />
            </Card>
          )}
        </>
      )}
    </Container>
  );
};

export default Dashboard;
