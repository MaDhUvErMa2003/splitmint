import Expense from "../models/Expense.js";
import Group from "../models/Group.js";
import Participant from "../models/Participant.js";
import { calculateBalances } from "../utils/balanceEngine.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const userId = req.user.userId;

    // groups owned by user
    const groups = await Group.find({ ownerId: userId });

    const groupIds = groups.map(g => g._id);

    // all expenses of user's groups
    const expenses = await Expense.find({
      groupId: { $in: groupIds }
    });

    let totalSpent = 0;
    expenses.forEach(e => (totalSpent += e.amount));

    const balances = calculateBalances(expenses);

    let youOwe = 0;
    let youAreOwed = 0;

    Object.values(balances).forEach(val => {
      if (val < 0) youOwe += Math.abs(val);
      if (val > 0) youAreOwed += val;
    });

    res.json({
      totalSpent: Number(totalSpent.toFixed(2)),
      youOwe: Number(youOwe.toFixed(2)),
      youAreOwed: Number(youAreOwed.toFixed(2)),
      netBalance: Number((youAreOwed - youOwe).toFixed(2))
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const getFilteredExpenses = async (req, res) => {
  try {
    const { groupId, participantId, from, to, min, max } = req.query;

    const query = {};

    if (groupId) query.groupId = groupId;
    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = new Date(from);
      if (to) query.date.$lte = new Date(to);
    }
    if (min || max) {
      query.amount = {};
      if (min) query.amount.$gte = Number(min);
      if (max) query.amount.$lte = Number(max);
    }

    let expenses = await Expense.find(query);

    // filter by participant involvement
    if (participantId) {
      expenses = expenses.filter(exp =>
        exp.splits.some(s => s.participantId.toString() === participantId)
      );
    }

    res.json(expenses);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};




export const getGroupDashboard = async (req, res) => {
  try {
    const { groupId } = req.params;
    const participants = await Participant.find({ groupId });
    const expenses = await Expense.find({ groupId });
    const contribution = {};
    participants.forEach(p => {
      contribution[p._id.toString()] = 0;
    });

    expenses.forEach(e => {
      if (!e.payerId) return;

      const pid = e.payerId.toString();

      if (contribution[pid] !== undefined) {
        contribution[pid] += Number(e.amount);
      }
    });

   
    res.json({
      contribution
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Group dashboard failed" });
  }
};



export const searchExpenses = async (req, res) => {
  try {
    const {
      groupId,
      search,
      participantId,
      startDate,
      endDate,
      minAmount,
      maxAmount
    } = req.query;

    const query = {};

    // group filter
    if (groupId) {
      query.groupId = groupId;
    }

    // text search
    if (search) {
      query.description = { $regex: search, $options: "i" };
    }

    // date range
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    // amount range
    if (minAmount || maxAmount) {
      query.amount = {};
      if (minAmount) query.amount.$gte = Number(minAmount);
      if (maxAmount) query.amount.$lte = Number(maxAmount);
    }

    let expenses = await Expense.find(query).sort({ date: -1 });

    // participant involvement filter
    if (participantId) {
      expenses = expenses.filter(exp =>
        exp.splits.some(
          s => s.participantId.toString() === participantId
        )
      );
    }

    res.json(expenses);

  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
};

