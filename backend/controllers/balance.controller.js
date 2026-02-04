import Expense from "../models/Expense.js";
import { calculateBalances } from "../utils/balanceEngine.js";
import { minimizeSettlements } from "../utils/settlementEngine.js";

export const getGroupBalance = async (req, res) => {
  try {
    const groupId = req.params.groupId;

    const expenses = await Expense.find({ groupId });

    const balances = calculateBalances(expenses);
    const settlements = minimizeSettlements(balances);

    res.json({
      balances,
      settlements
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
