import NoResultsIllustraionSrc from "@/assets/images/no-results-illustration.svg";
import AuctionsScrolView from "@/components/AuctionsScrollView";
import BidItem from "@/components/BidItem";
import BidItemLoading from "@/components/BidItem/BidItemLoading";
import useAuth from "@/redux/auth/useAuth";
import { ClockIcon } from "@heroicons/react/24/outline";
// import { PureComponent } from "react";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Cell,
//   Pie,
//   PieChart,
//   Rectangle,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";
import useDashboard from "./useDashboard";

// const RADIAN = Math.PI / 180;

// const renderCustomizedLabel =
//   (data) =>
//   ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//       <text
//         x={x}
//         y={y}
//         fill="white"
//         textAnchor="middle"
//         dominantBaseline="central"
//         className="text-xs"
//       >
//         {/* {`${(percent * 100).toFixed(0)}%`} */}
//         {data?.[index]?.category__title} ({percent * 100}%)
//       </text>
//     );
//   };

// class CategoriesPieChart extends PureComponent {
//   render() {
//     const data = this.props.data;

//     return (
//       <PieChart width={400} height={400}>
//         <Pie
//           data={data}
//           cx="50%"
//           cy="50%"
//           labelLine={false}
//           label={renderCustomizedLabel(data)}
//           outerRadius={150}
//           className="fill-blue-700"
//           dataKey="product_count"
//           nameKey="category__title"
//         >
//           {data?.map((entry, index) => (
//             <Cell key={`cell-${index}`} className="fill-blue-700" />
//           ))}
//         </Pie>
//         <Tooltip />
//       </PieChart>
//     );
//   }
// }

// class CategoriesBarChart extends PureComponent {
//   render() {
//     const data = this.props.data;

//     return (
//       <BarChart
//         width={Math.max(data?.length * 200, 400)}
//         height={500}
//         data={data}
//         margin={{
//           bottom: 100,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="category__title" fontSize={12} interval={0} />
//         <YAxis allowDecimals={false} />
//         <Tooltip />
//         <Bar
//           dataKey="product_count"
//           className="fill-blue-600 stroke-blue-700 stroke-1 shadow-lg"
//           maxBarSize={50}
//           activeBar={<Rectangle />}
//         />
//       </BarChart>
//     );
//   }
// }

const Stat = ({ title = "", value = "", loading = false }) => {
  return (
    <div className="bg-blue-50 flex-1 min-h-[6rem] p-[1rem] rounded-lg shadow-md flex flex-col justify-between gap-[1rem]">
      {!loading && (
        <>
          <h2 className="">{title}</h2>
          <p className=" text-4xl">{value}</p>
        </>
      )}
    </div>
  );
};

const Dashbaord = () => {
  const auth = useAuth();
  const dashboard = useDashboard();

  return (
    <div className="flex flex-col gap-[2rem] min-h-full w-full max-w-[72rem]">
      <div className="flex flex-row items-center gap-[0.5rem]">
        <div className="animate-wave shrink-0 sm:text-4xl text-3xl">👋</div>
        <h1 className="sm:text-4xl text-3xl">
          Welcome {auth.state.user?.first_name}
        </h1>
      </div>
      <div className="flex flex-row gap-[1rem]">
        <Stat
          title="ONGOING AUCTIONS"
          value={dashboard.status.data?.stats.ongoing_auctions_count}
          loading={dashboard.status.loading}
        />
        <Stat
          title="COMPLETED AUCTIONS"
          value={dashboard.status.data?.stats.completed_auctions_count}
          loading={dashboard.status.loading}
        />
        <Stat
          title="PENDING BIDS"
          value={dashboard.status.data?.stats.pending_bids_count}
          loading={dashboard.status.loading}
        />
        <Stat
          title="SUCCESSFUL BIDS"
          value={dashboard.status.data?.stats.successful_bids_count}
          loading={dashboard.status.loading}
        />
      </div>
      <div>
        <AuctionsScrolView
          auctions={dashboard.status.data?.top_ongoing_auctions}
          emptyText="No auctions to show from you"
          loading={dashboard.status.loading}
          title="Your auctions ending soon"
          my
        />
      </div>
      <div>
        <div className="flex flex-row gap-[0.5rem] items-center">
          <ClockIcon width={24} />
          <h2 className="text-2xl py-[1rem]">Your top pending bids</h2>
        </div>
        <div className="relative overflow-x-auto w-full pb-[0.675rem] rounded-lg border border-neutral-200 flex flex-col gap-[0.675rem]">
          <table className="w-full text-sm text-left text-neutral-500">
            <thead className="text-xs text-neutral-700 uppercase bg-neutral-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S#
                </th>
                <th scope="col" className="px-6 py-3">
                  Auction Item
                </th>
                <th scope="col" className="px-6 py-3">
                  Auctioneer
                </th>
                <th scope="col" className="px-6 py-3">
                  Bid Amount
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Rank
                </th>
              </tr>
            </thead>
            <tbody>
              {dashboard.status.loading
                ? [...new Array(5)].map((_, idx) => (
                    <BidItemLoading key={idx} />
                  ))
                : dashboard.status.data?.top_pending_bids?.map((bid, idx) => (
                    <BidItem key={bid.id} bid={bid} serialNo={idx + 1} />
                  ))}
            </tbody>
          </table>
          {!dashboard.status.data?.stats.pending_bids_count && (
            <div className="flex-1 flex flex-row items-center justify-center py-[4rem]">
              <img
                src={NoResultsIllustraionSrc}
                alt="No results"
                className="w-full max-w-[32rem]"
              />
            </div>
          )}
        </div>
      </div>
      {/* {!dashboard.status.loading ? (
        <div className="flex flex-row gap-[1rem] justify-between">
          <div className="max-w-1/2 w-fit overflow-scroll flex flex-col gap-[1rem] items-end">
            <h2 className="text-xl ml-[3.75rem] text-blue-700 self-start">
              Auction counts by category
            </h2>
            <CategoriesBarChart data={dashboard.status.data?.category_counts} />
          </div>
          <div className="max-w-1/2 w-fit overflow-scroll flex flex-col gap-[1rem] items-end">
            <h2 className="text-xl ml-[3.75rem] text-blue-700 self-start">
              Auction percentages by category
            </h2>
            <CategoriesPieChart data={dashboard.status.data?.category_counts} />
          </div>
        </div>
      ) : null} */}
    </div>
  );
};

export default Dashbaord;
