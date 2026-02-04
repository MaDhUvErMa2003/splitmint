export const parseExpense = async (req, res) => {
  try {
    const { text } = req.body;

    const amountMatch = text.match(/\d+/);
    const amount = amountMatch ? Number(amountMatch[0]) : "";

    let category = "Other";

    if (/food|dinner|lunch|snacks|meal/i.test(text)) category = "Food";
    else if (/travel|uber|ola|bus|train|flight/i.test(text)) category = "Travel";
    else if (/rent|room|flat|house/i.test(text)) category = "Rent";
    else if (/shopping|amazon|flipkart|mall/i.test(text)) category = "Shopping";

    res.json({
      amount,
      splitType: "equal",
      category,
      ruleBased: true
    });
  } catch (err) {
    res.status(500).json({
      message: "MintSense failed"
    });
  }
};
