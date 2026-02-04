import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import AddExpense from "../components/AddExpense";
import toast from "react-hot-toast";

const GroupDetails = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [group, setGroup] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchGroup();
    fetchParticipants();
  }, [groupId]);

  const fetchGroup = async () => {
    const res = await api.get("/groups");
    const g = res.data.find((g) => g._id === groupId);
    setGroup(g || null);
  };

  const fetchParticipants = async () => {
    const res = await api.get(`/participants/${groupId}`);
    setParticipants(res.data);
  };

  const addParticipant = async () => {
    if (!name.trim() || participants.length >= 3) return;

    try {
      await api.post(`/participants/${groupId}`, { name });
      setName("");
      fetchParticipants();
      toast.success("Participant added 👤");
    } catch {
      toast.error("Failed to add participant");
    }
  };

  const removeParticipant = async (id) => {
    try {
      await api.delete(`/participants/${id}`);
      fetchParticipants();
      toast.success("Participant removed");
    } catch {
      toast.error("Failed to remove participant");
    }
  };

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-400 animate-pulse">
        Loading group...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 text-gray-100 animate-fadeIn">
      <div className="max-w-3xl mx-auto">

        {/* Group Title */}
        <h2 className="text-3xl font-bold mb-6 tracking-wide">
          {group.name}
        </h2>

        {/* Add Participant */}
        <div className="flex gap-3 mb-3">
          <input
            className="flex-1 bg-white/10 backdrop-blur border border-white/10 p-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Participant name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={participants.length >= 3}
          />

          <button
            onClick={addParticipant}
            disabled={participants.length >= 3}
            className={`px-6 rounded-lg transition-all duration-300 ${
              participants.length >= 3
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500 hover:scale-105 shadow-lg"
            }`}
          >
            Add
          </button>
        </div>

        {participants.length >= 3 && (
          <p className="text-sm text-red-400 mb-4">
            Max 3 participants allowed
          </p>
        )}

        {/* Participants List */}
        <div className="space-y-3 mb-8">
          {participants.map((p) => (
            <div
              key={p._id}
              className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl p-4 shadow-lg flex justify-between items-center hover:shadow-2xl transition-all duration-300"
            >
              <span className="font-medium">{p.name}</span>

              <button
                onClick={() => removeParticipant(p._id)}
                className="text-red-400 hover:text-red-300 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Add Expense */}
        <div className="mb-10">
          <AddExpense
            groupId={groupId}
            participants={participants}
            onAdded={() => toast.success("Expense added successfully 💸")}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate(`/balance/${groupId}`)}
            className="bg-green-600 hover:bg-green-500 transition px-5 py-2 rounded-lg shadow hover:scale-105"
          >
            View Balance
          </button>

          <button
            onClick={() => navigate(`/groups/${groupId}/expenses`)}
            className="bg-indigo-600 hover:bg-indigo-500 transition px-5 py-2 rounded-lg shadow hover:scale-105"
          >
            View Expenses
          </button>

          <button
            onClick={() => navigate(`/groups/${groupId}/dashboard`)}
            className="bg-purple-600 hover:bg-purple-500 transition px-5 py-2 rounded-lg shadow hover:scale-105"
          >
            Group Dashboard
          </button>
        </div>

      </div>
    </div>
  );
};

export default GroupDetails;
