import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      trim: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    splitType: {
      type: String,
      enum: ["equal", "custom", "percentage"],
      required: true
    },
    payerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Participant",
      required: true
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true
    },
    splits: [
      {
        participantId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Participant"
        },
        share: Number
      }
    ]
  },
  { timestamps: true }
);

const Expense = mongoose.model("Expense", expenseSchema);
export default Expense;
