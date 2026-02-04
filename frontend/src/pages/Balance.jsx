import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const Balance = () => {
  const { groupId } = useParams();

  const [balances, setBalances] = useState({});
  const [settlements, setSettlements] = useState([]);
  const [participantsMap, setParticipantsMap] = useState({});

  useEffect(() => {
    fetchBalance();
    fetchParticipants();
  }, [groupId]);

  const fetchBalance = async () => {
    const res = await api.get(`/balance/${groupId}`);
    setBalances(res.data.balances);
    setSettlements(res.data.settlements);
  };

  const fetchParticipants = async () => {
    const res = await api.get(`/participants/${groupId}`);
    const map = {};
    res.data.forEach((p) => {
      map[p._id] = p.name;
    });
    setParticipantsMap(map);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 text-gray-100 animate-fadeIn">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <h2 className="text-3xl font-bold mb-8 tracking-wide">
          Group Balance
        </h2>

        {/* Net Balances */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-5 mb-8">
          <h3 className="font-semibold mb-4 text-lg">
            Net Balances
          </h3>

          {Object.entries(balances).map(([id, amount]) => (
            <div
              key={id}
              className="flex justify-between items-center py-2 border-b border-white/10 last:border-none"
            >
              <span className="text-gray-200">
                {participantsMap[id] || "Unknown"}
              </span>

              <span
                className={`font-semibold ${
                  amount >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                ₹{amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Settlements */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl shadow-lg p-5">
          <h3 className="font-semibold mb-4 text-lg">
            Who Pays Whom
          </h3>

          {settlements.length === 0 && (
            <p className="text-gray-400 text-sm">
              🎉 All settled up!
            </p>
          )}

          {settlements.map((s, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-white/10 last:border-none"
            >
              <span className="text-red-400 font-medium">
                {participantsMap[s.from]}
              </span>

              <span className="text-gray-400 mx-2">→</span>

              <span className="text-green-400 font-medium">
                {participantsMap[s.to]}
              </span>

              <span className="font-semibold text-indigo-300">
                ₹{s.amount}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Balance;
