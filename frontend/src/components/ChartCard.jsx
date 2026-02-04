import { PieChart, Pie, Cell } from "recharts";

const ChartCard = ({ data }) => {
  const COLORS = ["#6366f1", "#22c55e", "#ef4444"];

  return (
    <PieChart width={300} height={300}>
      <Pie data={data} dataKey="value" outerRadius={100}>
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
};

export default ChartCard;
