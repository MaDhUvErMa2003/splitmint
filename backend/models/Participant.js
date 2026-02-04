import mongoose from "mongoose";
import Group from "./Group.js";
import User from "./User.js";
const participantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    color: {
      type: String,
      default: "#cccccc"
    },
    avatar: {
      type: String
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true
    },

    userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
}
  },
  { timestamps: true }
);

const Participant = mongoose.model("Participant", participantSchema);
export default Participant;
