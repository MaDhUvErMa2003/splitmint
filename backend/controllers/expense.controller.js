import Expense from "../models/Expense.js";
import Group from "../models/Group.js";
import { calculateSplits } from "../utils/splitCalculator.js";

/// ADD EXPENSE
export const addExpense = async (req, res) => {
  try {
    const {
      amount,
      description,
      splitType,
      payerId,
      participants,
      customSplits
    } = req.body;

    const groupId = req.params.groupId;

    if (!amount || !splitType || !payerId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const group = await Group.findOne({
      _id: groupId,
      ownerId: req.user.userId
    });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    const splits = calculateSplits({
      amount,
      splitType,
      participants,
      customSplits
    });

    const expense = await Expense.create({
      amount,
      description,
      splitType,
      payerId,
      groupId,
      splits
    });

    res.status(201).json({
      message: "Expense added",
      expense
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/// GET EXPENSES OF GROUP
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      groupId: req.params.groupId
    });

    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/// DELETE EXPENSE
export const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
