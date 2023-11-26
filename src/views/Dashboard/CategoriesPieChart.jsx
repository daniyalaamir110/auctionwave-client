const { PureComponent } = require("react");
const { PieChart, Pie, Cell, Tooltip } = require("recharts");

const RADIAN = Math.PI / 180;

const renderCustomizedLabel =
  (data) =>
  ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs"
      >
        {data?.[index]?.category__title} ({percent * 100}%)
      </text>
    );
  };

export default class CategoriesPieChart extends PureComponent {
  render() {
    const data = this.props.data;

    console.log(data);

    return (
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel(data)}
          outerRadius={150}
          className="fill-blue-700"
          dataKey="product_count"
          nameKey="category__title"
        >
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} className="fill-blue-700" />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    );
  }
}
