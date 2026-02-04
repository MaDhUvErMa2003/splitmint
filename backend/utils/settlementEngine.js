export const minimizeSettlements = (balances) => {
  const creditors = [];
  const debtors = [];

  Object.entries(balances).forEach(([id, amount]) => {
    if (amount > 0) creditors.push({ id, amount });
    if (amount < 0) debtors.push({ id, amount: -amount });
  });

  const settlements = [];
  let i = 0, j = 0;

  while (debtors.length && creditors.length) {
  const debtor = debtors[0];
  const creditor = creditors[0];

  if (debtor.id === creditor.id) {
    debtors.shift();
    continue;
  }

  const amount = Math.min(
    Math.abs(debtor.amount),
    creditor.amount
  );

  if (amount <= 0) break;

  settlements.push({
    from: debtor.id,
    to: creditor.id,
    amount: Number(amount.toFixed(2))
  });

  debtor.amount += amount;
  creditor.amount -= amount;

  if (Math.abs(debtor.amount) < 0.01) debtors.shift();
  if (creditor.amount < 0.01) creditors.shift();
}


  return settlements;
};
