import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const ExpenseHistory = () => {
  const { groupId } = useParams();

  const [expenses, setExpenses] = useState([]);
  const [participants, setParticipants] = useState([]);

  const [search, setSearch] = useState("");
  const [participantId, setParticipantId] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  useEffect(() => {
    fetchParticipants();
    fetchExpenses();
  }, [groupId]);

  const fetchParticipants = async () => {
    const res = await api.get(`/participants/${groupId}`);
    setParticipants(res.data);
  };

  const fetchExpenses = async () => {
    const res = await api.get("/dashboard/search", {
      params: {
        groupId,
        search,
        participantId,
        minAmount,
        maxAmount,
      },
    });
    setExpenses(res.data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 text-gray-100 animate-fadeIn">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <h2 className="text-3xl font-bold mb-6 tracking-wide">
          Expense History
        </h2>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl p-5 shadow-lg mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          <input
            className="bg-white/10 border border-white/10 p-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="bg-white/10 border border-white/10 p-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={participantId}
            onChange={(e) => setParticipantId(e.target.value)}
          >
            <option value="">All participants</option>
            {participants.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>

          <input
            className="bg-white/10 border border-white/10 p-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Min ₹"
            type="number"
            value={minAmount}
            onChange={(e) => setMinAmount(e.target.value)}
          />

          <input
            className="bg-white/10 border border-white/10 p-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Max ₹"
            type="number"
            value={maxAmount}
            onChange={(e) => setMaxAmount(e.target.value)}
          />

          <button
            onClick={fetchExpenses}
            className="bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 rounded-lg shadow-lg hover:scale-105"
          >
            Apply
          </button>
        </div>

        {/* Expense List */}
        <div className="space-y-4">
          {expenses.length === 0 && (
            <p className="text-gray-400 text-center">
              No expenses found
            </p>
          )}

          {expenses.map((exp) => (
            <div
              key={exp._id}
              className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl p-4 shadow-lg flex justify-between items-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <p className="font-semibold">
                  {exp.description || "Expense"}
                </p>
                <p className="text-sm text-gray-400">
                  {new Date(exp.date).toDateString()}
                </p>
              </div>

              <div className="text-lg font-bold text-indigo-400">
                ₹{exp.amount}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ExpenseHistory;
