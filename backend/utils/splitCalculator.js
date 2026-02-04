export const calculateSplits = ({
  amount,
  splitType,
  participants,
  customSplits
}) => {
  let splits = [];

  if (splitType === "equal") {
    const rawShare = amount / participants.length;
    const roundedShare = Math.floor(rawShare * 100) / 100;

    let remainder = amount - roundedShare * participants.length;

    participants.forEach((p, index) => {
      let share = roundedShare;
      if (remainder > 0) {
        share += 0.01;
        remainder -= 0.01;
      }
      splits.push({ participantId: p, share });
    });
  }

  if (splitType === "custom") {
    let total = 0;
    customSplits.forEach(s => (total += s.share));

    if (Math.abs(total - amount) > 0.01) {
      throw new Error("Custom split total does not match expense amount");
    }
    splits = customSplits;
  }

  if (splitType === "percentage") {
    let totalPercent = 0;
    customSplits.forEach(s => (totalPercent += s.percentage));

    if (totalPercent !== 100) {
      throw new Error("Percentages must sum to 100");
    }

    customSplits.forEach(s => {
      const share = Math.round((amount * s.percentage / 100) * 100) / 100;
      splits.push({
        participantId: s.participantId,
        share
      });
    });
  }

  return splits;
};
