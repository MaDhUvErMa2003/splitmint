import Group from "../models/Group.js";

/// CREATE GROUP
export const createGroup = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Group name is required" });
    }

    const group = await Group.create({
      name,
      ownerId: req.user.userId,
      participants: []
    });

    res.status(201).json({
      message: "Group created successfully",
      group
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/// GET ALL GROUPS (OF LOGGED IN USER)
export const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({
      ownerId: req.user.userId
    });

    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/// UPDATE GROUP
export const updateGroup = async (req, res) => {
  try {
    const { name } = req.body;
    const groupId = req.params.id;

    const group = await Group.findOne({
      _id: groupId,
      ownerId: req.user.userId
    });

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    group.name = name || group.name;
    await group.save();

    res.json({
      message: "Group updated successfully",
      group
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/// DELETE GROUP
export const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;

    const group = await Group.findById(id);
    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // 🔥 Cascade delete
    await Participant.deleteMany({ groupId: id });
    await Expense.deleteMany({ groupId: id });
    await Group.findByIdAndDelete(id);

    res.json({ message: "Group deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete group" });
  }
};
