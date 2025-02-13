import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Portfolio from "../components/Portfolio";
import PortfolioDonutChart from "../components/PortfolioDonutChart";
import PositionsTable from "../components/PositionsTable";
import HistoricalChart from "../components/HistoricalChart";


const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      navigate("/");
    }
  }, [navigate]);


  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Financial Dashboard</h1>
      <p className="text-gray-600 text-lg">Welcome to your portfolio overview</p>
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <Portfolio />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome to your portfolio</h2>
        <PortfolioDonutChart />
      </div>
      <div className="p-6">
        <PositionsTable />
      </div>
      <div className="p-6">
        <HistoricalChart />
      </div>
      <button onClick={auth?.logout} className="bg-red-500 text-white p-2 rounded">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
