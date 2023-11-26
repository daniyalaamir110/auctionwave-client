import { PureComponent } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default class CategoriesBarChart extends PureComponent {
  render() {
    const data = this.props.data;

    return (
      <BarChart
        width={Math.max(data?.length * 200, 400)}
        height={400}
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category__title" fontSize={12} interval={0} />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar
          dataKey="product_count"
          className="fill-blue-600 stroke-blue-700 stroke-1 shadow-lg"
          maxBarSize={50}
          activeBar={<Rectangle />}
        />
      </BarChart>
    );
  }
}
