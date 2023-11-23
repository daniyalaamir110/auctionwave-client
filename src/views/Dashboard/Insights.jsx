import { ChartBarIcon } from "@heroicons/react/24/outline";
import CategoriesBarChart from "./CategoriesBarChart";
import CategoriesPieChart from "./CategoriesPieChart";

const Insights = ({ loading = false, categoryCounts = [] }) => {
  return (
    <div>
      <div className="flex flex-row gap-[0.5rem] items-center">
        <ChartBarIcon width={24} />
        <h2 className="text-2xl py-[1rem]">Insights</h2>
      </div>
      {loading ? (
        <div className="bg-neutral-100 p-[2rem] shadow-md rounded-lg h-[32rem] animate-pulse" />
      ) : (
        <div className="flex xl:flex-row flex-col items-center gap-[1rem] justify-between bg-gradient-to-b from-blue-50 to-blue-300 p-[2rem] shadow-md rounded-lg">
          <div className="max-w-1/2 w-fit overflow-scroll flex flex-col gap-[1rem] items-end">
            <h2 className="text-xl text-blue-800 self-start">
              Auction counts by category
            </h2>
            <CategoriesBarChart data={categoryCounts} />
          </div>
          <div className="max-w-1/2 w-fit overflow-scroll flex flex-col gap-[1rem] items-end">
            <h2 className="text-xl text-blue-800 self-start">
              Auction percentages by category
            </h2>
            <CategoriesPieChart data={categoryCounts} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Insights;
