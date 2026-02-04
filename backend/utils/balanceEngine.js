export const calculateBalances = (expenses) => {
  const balanceMap = {};

  expenses.forEach(expense => {
    const payerId = expense.payerId.toString();

    // payer ne pura amount diya
    if (!balanceMap[payerId]) balanceMap[payerId] = 0;
    balanceMap[payerId] += expense.amount;

    // har participant ka share minus karo
    expense.splits.forEach(split => {
      const pid = split.participantId.toString();
      if (!balanceMap[pid]) balanceMap[pid] = 0;
      balanceMap[pid] -= split.share;
    });
  });

  return balanceMap;
};
