import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const Groups = () => {
  const navigate = useNavigate();

  const [groups, setGroups] = useState([]);
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      const res = await api.get("/groups");
      setGroups(res.data);
    } catch (err) {
      toast.error("Failed to load groups");
    }
  };

  const createGroup = async () => {
    if (!name.trim()) {
      toast.error("Group name is required");
      return;
    }

    try {
      setCreating(true);
      await api.post("/groups", { name });
      setName("");
      toast.success("Group created successfully 🎉");
      fetchGroups();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create group");
    } finally {
      setCreating(false);
    }
  };

  const deleteGroup = async (id) => {
    const confirm = window.confirm(
      "Are you sure? This will delete all expenses & balances."
    );
    if (!confirm) return;

    try {
      await api.delete(`/groups/${id}`);
      toast.success("Group deleted 🗑️");
      fetchGroups();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete group");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6 text-gray-100 animate-fadeIn">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <h2 className="text-3xl font-bold mb-6 tracking-wide">
          Your Groups
        </h2>

        {/* Create Group */}
        <div className="flex gap-3 mb-8">
          <input
            className="flex-1 bg-white/10 backdrop-blur border border-white/10 p-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="New group name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <button
            onClick={createGroup}
            disabled={creating}
            className={`px-6 rounded-lg font-medium transition-all duration-300 ${
              creating
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500 hover:scale-105 shadow-lg"
            }`}
          >
            {creating ? "Creating..." : "Create"}
          </button>
        </div>

        {/* Group List */}
        <div className="grid gap-4">
          {groups.length === 0 && (
            <p className="text-gray-400 text-center">
              No groups yet. Create your first group 👆
            </p>
          )}

          {groups.map((group) => (
            <div
              key={group._id}
              className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl p-4 shadow-lg flex justify-between items-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              <span className="font-semibold text-lg">
                {group.name}
              </span>

              <div className="flex gap-4 items-center">
                <button
                  onClick={() => navigate(`/groups/${group._id}`)}
                  className="text-indigo-400 hover:text-indigo-300 transition"
                >
                  Open →
                </button>

                <button
                  onClick={() => deleteGroup(group._id)}
                  className="text-red-400 hover:text-red-300 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Groups;
