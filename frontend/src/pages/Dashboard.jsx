import { useEffect, useState } from "react";
import api from "../services/api";
import SummaryCard from "../components/SummaryCard";
import Navbar from "../components/NavBar";

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    const res = await api.get("/dashboard/summary");
    setSummary(res.data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-300 animate-pulse">
        Loading dashboard...
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 text-gray-100 animate-fadeIn">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold tracking-wide">
              Dashboard
            </h2>

            <a
              href="/groups"
              className="bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 px-5 py-2 rounded-lg shadow-lg hover:scale-105"
            >
              View Groups
            </a>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <SummaryCard title="Total Spent" value={summary.totalSpent} />
            <SummaryCard title="You Owe" value={summary.youOwe} />
            <SummaryCard title="You Are Owed" value={summary.youAreOwed} />
            <SummaryCard title="Net Balance" value={summary.netBalance} />
          </div>

        </div>
      </div>
    </>
  );
};

export default Dashboard;
