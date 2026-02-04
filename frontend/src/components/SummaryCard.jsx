const SummaryCard = ({ title, value }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className="text-2xl font-semibold text-white">
        ₹ {value}
      </p>
    </div>
  );
};

export default SummaryCard;
