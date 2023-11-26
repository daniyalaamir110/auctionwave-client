import UserItem from "@/components/UserItem";
import { formatNumber } from "@/utils";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const BidItem = ({ bid, serialNo = 1 }) => {
  const status = bid.product.status;
  const color =
    status === "ongoing"
      ? "bg-green-500"
      : status === "finished"
      ? "bg-gold-500"
      : "bg-blue-500";
  return (
    <tr className="bg-white border-b border-b-neutral-200 hover:bg-neutral-50">
      <td className="px-6 py-4 min-w-max whitespace-nowrap">{serialNo}</td>
      <td className="px-6 py-4 min-w-max whitespace-nowrap">
        <Link
          to={`/app/auctions/${bid.product.id}`}
          className="underline text-blue-700 hover:text-blue-800 active:text-blue-900 flex flex-row items-center gap-[0.25rem]"
        >
          {bid.product.title}
          <ArrowTopRightOnSquareIcon width={16} className="inline" />
        </Link>
      </td>
      <td className="px-6 py-4 min-w-max whitespace-nowrap">
        <UserItem user={bid.product.creator} />
      </td>
      <td className="px-6 py-4 min-w-max whitespace-nowrap">
        {formatNumber(bid.bid_amount)}
      </td>
      <td className="px-6 py-4 min-w-max whitespace-nowrap">
        <div className="flex items-center uppercase">
          <div className={`h-2.5 w-2.5 rounded-full ${color} mr-2`}></div>{" "}
          {bid.product.status}
        </div>
      </td>
      <td className="px-6 py-4 min-w-max whitespace-nowrap">
        {bid.rank ? `#${bid.rank}` : "–"}
      </td>
    </tr>
  );
};

export default BidItem;
