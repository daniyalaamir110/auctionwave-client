import NoResultsIllustraionSrc from "@/assets/images/no-results-illustration.svg";
import BidItem from "@/components/BidItem";
import BidItemLoading from "@/components/BidItem/BidItemLoading";
import Pagination from "@/components/Pagination";
import usePagination from "@/components/Pagination/usePagination";
import Tab from "@/components/Tab";
import useTab from "@/components/Tab/useTab";
import useBids from "./useBids";
import useTabConfig from "./useTabConfig";

const BidsPage = () => {
  const bids = useBids();
  const tabConfig = useTabConfig();
  const tab = useTab(tabConfig);
  const noResults = !bids.status.loading && !bids.status.data?.results?.length;
  const count = bids.status.data?.count || 0;
  const pagination = usePagination({ count, pageSize: 10 });

  return (
    <div className="flex flex-col gap-[2rem] min-h-full max-w-[72rem]">
      <div className="flex flex-col gap-[2rem] flex-1 w-full">
        <h1 className="sm:text-4xl text-3xl">Your Bids</h1>
        <Tab
          getTabClickHandler={tab.getTabClickHandler}
          items={tab.items}
          selectedTabIdx={tab.selectedTabIdx}
        />
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
              {bids.status.loading
                ? [...new Array(6)].map((_, idx) => (
                    <BidItemLoading key={idx} />
                  ))
                : bids.status.data?.results?.map((bid, idx) => (
                    <BidItem key={bid.id} bid={bid} serialNo={idx + 1} />
                  ))}
            </tbody>
          </table>
          {noResults ? (
            <div className="flex-1 flex flex-row items-center justify-center py-[4rem]">
              <img
                src={NoResultsIllustraionSrc}
                alt="No results"
                className="w-full max-w-[32rem]"
              />
            </div>
          ) : (
            <div className="flex flex-row items-center justify-center w-full">
              <Pagination {...pagination} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BidsPage;
