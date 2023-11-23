import NoResultsIllustraionSrc from "@/assets/images/no-results-illustration.svg";
import BidItem from "@/components/BidItem";
import BidItemLoading from "@/components/BidItem/BidItemLoading";
import { ClockIcon } from "@heroicons/react/24/outline";
import React from "react";

const TopBids = ({ loading = false, empty = false, bids = [] }) => {
  return (
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
            {loading
              ? [...new Array(5)].map((_, idx) => <BidItemLoading key={idx} />)
              : bids?.map((bid, idx) => (
                  <BidItem key={bid.id} bid={bid} serialNo={idx + 1} />
                ))}
          </tbody>
        </table>
        {empty && (
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
  );
};

export default TopBids;
