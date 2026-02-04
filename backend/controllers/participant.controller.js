import Participant from "../models/Participant.js";
import Group from "../models/Group.js";

/// ADD PARTICIPANT
export const addParticipant = async (req, res) => {
  try {
    const { name, color } = req.body;
    const groupId = req.params.groupId;

    if (!name) {
      return res.status(400).json({ message: "Participant name required" });
    }

    const group = await Group.findOne({
      _id: groupId,
      ownerId: req.user.userId
    }).populate("participants");

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (group.participants.length >= 3) {
      return res.status(400).json({
        message: "Max 3 participants allowed per group"
      });
    }

    const participant = await Participant.create({
      name,
      color,
      groupId
        ,userId: req.user.userId
    });

    group.participants.push(participant._id);
    await group.save();

    res.status(201).json({
      message: "Participant added",
      participant
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/// UPDATE PARTICIPANT
export const updateParticipant = async (req, res) => {
  try {
    const { name, color } = req.body;
    const participantId = req.params.id;

    const participant = await Participant.findById(participantId);
    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    participant.name = name || participant.name;
    participant.color = color || participant.color;
    await participant.save();

    res.json({
      message: "Participant updated",
      participant
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/// DELETE PARTICIPANT (CASCADE PLACEHOLDER)
export const deleteParticipant = async (req, res) => {
  try {
    const participantId = req.params.id;

    const participant = await Participant.findById(participantId);
    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    // remove from group
    await Group.findByIdAndUpdate(participant.groupId, {
      $pull: { participants: participantId }
    });

    // FUTURE: delete/update related expenses

    await participant.deleteOne();

    res.json({ message: "Participant removed" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getParticipantsByGroup = async (req, res) => {
  try {
    const participants = await Participant.find({
      groupId: req.params.groupId
    });
    res.json(participants);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
