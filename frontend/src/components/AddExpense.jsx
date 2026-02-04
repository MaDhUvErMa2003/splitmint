import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

const AddExpense = ({ groupId, participants, onAdded }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [payerId, setPayerId] = useState("");
  const [splitType, setSplitType] = useState("equal");
  const [splits, setSplits] = useState([]);

  const [aiText, setAiText] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (splitType === "equal") {
      setSplits(participants.map((p) => ({ ...p, share: "" })));
    }
  }, [splitType, participants]);

  const handleCustomChange = (id, value) => {
    setSplits((prev) =>
      prev.map((s) => (s._id === id ? { ...s, share: value } : s))
    );
  };

  const handlePercentageChange = (id, value) => {
    setSplits((prev) =>
      prev.map((s) => (s._id === id ? { ...s, percentage: value } : s))
    );
  };

  const submitExpense = async () => {
    if (!amount || !payerId) {
      toast.error("Please enter amount and select payer");
      return;
    }

    if (splitType === "custom") {
      const total = splits.reduce((sum, s) => sum + Number(s.share || 0), 0);
      if (total !== Number(amount)) {
        toast.error("Custom split total must equal amount");
        return;
      }
    }

    if (splitType === "percentage") {
      const total = splits.reduce(
        (sum, s) => sum + Number(s.percentage || 0),
        0
      );
      if (total !== 100) {
        toast.error("Percentages must sum to 100");
        return;
      }
    }

    let payload = {
      amount: Number(amount),
      description,
      payerId,
      splitType,
    };

    if (splitType === "equal") {
      payload.participants = participants.map((p) => p._id);
    }

    if (splitType !== "equal") {
      payload.customSplits = splits.map((s) => ({
        participantId: s._id,
        ...(splitType === "custom"
          ? { share: Number(s.share) }
          : { percentage: Number(s.percentage) }),
      }));
    }

    await api.post(`/expenses/${groupId}`, payload);
    onAdded();
    navigate("/dashboard");
  };

  const parseWithAI = async () => {
    if (!aiText.trim()) {
      toast.error("Please describe the expense first");
      return;
    }

    try {
      setAiLoading(true);
      const res = await api.post("/mintsense/parse", {
        text: aiText,
        participants: participants.map((p) => p.name),
      });

      const data = res.data;
      setAmount(data.amount || "");
      setSplitType(data.splitType || "equal");
      setDescription(data.category || "");

      toast.success("MintSense filled the expense ✨");
      if (data.ruleBased) {
        toast("AI quota unavailable — smart fallback used 🤖", { icon: "⚠️" });
      }
    } catch {
      toast.error("AI could not understand the expense");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-lg animate-fadeIn">
      <h3 className="text-xl font-bold mb-4">Add Expense</h3>

      {/* AI Input */}
      <div className="mb-6">
        <textarea
          className="w-full bg-white/10 border border-white/10 p-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="e.g. I paid 1200 for dinner for Rahul and Aman"
          value={aiText}
          onChange={(e) => setAiText(e.target.value)}
        />

        <button
          onClick={parseWithAI}
          disabled={aiLoading}
          className="mt-2 bg-green-600 hover:bg-green-500 transition px-4 py-2 rounded-lg shadow hover:scale-105"
        >
          {aiLoading ? "Parsing..." : "Parse with AI 🤖"}
        </button>
      </div>

      {/* Expense Details */}
      <input
        className="w-full bg-white/10 border border-white/10 p-3 rounded-lg mb-3 text-white"
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <input
        className="w-full bg-white/10 border border-white/10 p-3 rounded-lg mb-3 text-white"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select
        className="w-full bg-white/10 border border-white/10 p-3 rounded-lg mb-3 text-black"
        onChange={(e) => setPayerId(e.target.value)}
      >
        <option value="">Who paid?</option>
        {participants.map((p) => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      <select
        className="w-full bg-white/10 border border-white/10 p-3 rounded-lg mb-4 text-black"
        value={splitType}
        onChange={(e) => setSplitType(e.target.value)}
      >
        <option value="equal">Equal Split</option>
        <option value="custom">Custom Amount</option>
        <option value="percentage">Percentage</option>
      </select>

      {/* Split Inputs */}
      {splitType !== "equal" &&
        splits.map((p) => (
          <div key={p._id} className="flex gap-3 mb-2">
            <span className="w-1/3 text-gray-300">{p.name}</span>
            <input
              className="flex-1 bg-white/10 border border-white/10 p-2 rounded-lg text-white"
              placeholder={splitType === "custom" ? "Amount" : "%"}
              type="number"
              onChange={(e) =>
                splitType === "custom"
                  ? handleCustomChange(p._id, e.target.value)
                  : handlePercentageChange(p._id, e.target.value)
              }
            />
          </div>
        ))}

      <button
        onClick={submitExpense}
        className="mt-6 bg-indigo-600 hover:bg-indigo-500 transition px-5 py-2 rounded-lg shadow hover:scale-105"
      >
        Add Expense 💸
      </button>
    </div>
  );
};

export default AddExpense;
