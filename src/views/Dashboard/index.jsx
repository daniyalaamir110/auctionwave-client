import AppLoader from "@/components/AppLoader";
import useAuth from "@/redux/auth/useAuth";
import { PureComponent } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useDashboard from "./useDashboard";

/**
 * Welcome section
 * stats: ongoing auctions, completed auctions, pending bids, completed bids
 * Your auctions: ending today/tomorrow with view all
 * Pie chart illustrating my auctions by category
 * Pending bids: today or tomorrow with see all
 * Auctions you might be interested in
 */

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
        {/* {`${(percent * 100).toFixed(0)}%`} */}
        {data?.[index]?.category__title} ({percent * 100}%)
      </text>
    );
  };

class CategoriesPieChart extends PureComponent {
  render() {
    const data = this.props.data;

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

class CategoriesBarChart extends PureComponent {
  render() {
    const data = this.props.data;

    return (
      <BarChart
        width={Math.max(data?.length * 200, 400)}
        height={500}
        data={data}
        margin={{
          bottom: 100,
        }}
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

const Dashbaord = () => {
  const auth = useAuth();
  const dashboard = useDashboard();

  return (
    <div className="flex flex-col gap-[2rem] min-h-full w-full max-w-[72rem]">
      {dashboard.status.loading ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <AppLoader fullScreen={false} />
        </div>
      ) : (
        <>
          <h1 className="sm:text-4xl text-3xl">
            👋 Welcome {auth.state.user?.first_name}
          </h1>
          <div className="flex flex-row gap-[1rem]">
            {/* bg-gradient-to-r from-blue-50 to-blue-100 */}
            <div className="bg-blue-50 flex-1 p-[1rem] rounded-lg shadow-md flex flex-col justify-between gap-[1rem]">
              <h2 className="">ONGOING AUCTIONS</h2>
              <p className=" text-4xl">
                {dashboard.status.data?.stats.ongoing_auctions_count}
              </p>
            </div>
            {/* bg-gradient-to-r from-blue-100 to-blue-200 */}
            <div className="bg-blue-50 flex-1 p-[1rem] rounded-lg shadow-md flex flex-col justify-between gap-[1rem]">
              <h2 className="">COMPLETED AUCTIONS</h2>
              <p className=" text-4xl">
                {dashboard.status.data?.stats.completed_auctions_count}
              </p>
            </div>
            {/* bg-gradient-to-r from-blue-200 to-blue-300 */}
            <div className="bg-blue-50 flex-1 p-[1rem] rounded-lg shadow-md flex flex-col justify-between gap-[1rem]">
              <h2 className="">PENDING BIDS</h2>
              <p className=" text-4xl">
                {dashboard.status.data?.stats.pending_bids_count}
              </p>
            </div>
            {/* bg-gradient-to-r from-blue-300 to-blue-400 */}
            <div className="bg-blue-50 flex-1 p-[1rem] rounded-lg shadow-md flex flex-col justify-between gap-[1rem]">
              <h2 className="">SUCCESSFUL BIDS</h2>
              <p className=" text-4xl">
                {dashboard.status.data?.stats.successful_bids_count}
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-[1rem] justify-between">
            <div className="w-1/2 overflow-scroll flex flex-col gap-[1rem]"></div>
            <div className="max-w-1/2 w-fit overflow-scroll flex flex-col gap-[1rem] items-end">
              <h2 className="text-xl ml-[3.75rem] text-blue-700 self-start">
                Auction counts by category
              </h2>
              <CategoriesBarChart
                data={dashboard.status.data?.category_counts}
              />
            </div>
          </div>
          <div className="flex flex-row gap-[1rem] justify-between">
            <div className="w-1/2 overflow-scroll flex flex-col gap-[1rem]"></div>
            <div className="max-w-1/2 w-fit overflow-scroll flex flex-col gap-[1rem] items-end">
              <h2 className="text-xl ml-[3.75rem] text-blue-700 self-start">
                Auction percentages by category
              </h2>
              <CategoriesPieChart
                data={dashboard.status.data?.category_counts}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashbaord;
