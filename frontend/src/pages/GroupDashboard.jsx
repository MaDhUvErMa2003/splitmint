import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#22c55e", "#6366f1", "#ef4444", "#f59e0b"];

const GroupDashboard = () => {
  const { groupId } = useParams();

  const [participantsMap, setParticipantsMap] = useState({});
  const [rawContribution, setRawContribution] = useState({});
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchParticipants = async () => {
    const res = await api.get(`/participants/${groupId}`);
    const map = {};
    res.data.forEach((p) => {
      map[p._id.toString()] = p.name;
    });
    setParticipantsMap(map);
  };

  const fetchDashboard = async () => {
    const res = await api.get(`/dashboard/group/${groupId}`);
    setRawContribution(res.data.contribution || {});
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchParticipants();
      await fetchDashboard();
      setLoading(false);
    };

    load();

    const handler = () => fetchDashboard();
    window.addEventListener("expenseAdded", handler);

    return () => window.removeEventListener("expenseAdded", handler);
  }, [groupId]);

  useEffect(() => {
    if (
      Object.keys(participantsMap).length === 0 ||
      Object.keys(rawContribution).length === 0
    ) {
      setChartData([]);
      return;
    }

    const data = Object.entries(rawContribution).map(
      ([id, amount]) => ({
        name: participantsMap[id] || "Unknown",
        value: amount
      })
    );

    setChartData(data);
  }, [participantsMap, rawContribution]);

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-400 animate-pulse">
        Loading group dashboard...
      </div>
    );
  }

  /* ---------------- EMPTY ---------------- */
  if (chartData.length === 0) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-400 text-center">
        No expenses yet. Add an expense to see contributions 📊
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 text-gray-100 animate-fadeIn">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <h2 className="text-3xl font-bold mb-8 tracking-wide">
          Group Dashboard
        </h2>

        {/* Contribution Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          {chartData.map((c) => (
            <div
              key={c.name}
              className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl p-5 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <p className="text-gray-400 text-sm">
                {c.name}
              </p>
              <p className="text-2xl font-bold text-indigo-300">
                ₹{c.value}
              </p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl p-5 shadow-lg h-[360px]">
            <h3 className="font-semibold mb-4">
              Contribution Share
            </h3>

            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={110}
                  label
                >
                  {chartData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={COLORS[i % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl p-5 shadow-lg h-[360px]">
            <h3 className="font-semibold mb-4">
              Contribution Comparison
            </h3>

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #374151",
                    color: "#fff"
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GroupDashboard;
