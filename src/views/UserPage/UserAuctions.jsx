import React from "react";
import useUserAuctions from "./useUserAuctions";
import usePagination from "@/components/Pagination/usePagination";
import Pagination from "@/components/Pagination";
import NoResultsIllustraionSrc from "@/assets/images/no-results-illustration.svg";
import AuctionItemLoading from "@/components/AuctionItem/AuctionItemLoading";
import AuctionItem from "@/components/AuctionItem";

const UserAuctions = () => {
  const auctions = useUserAuctions();
  const count = auctions.status.data?.count || 0;
  const pagination = usePagination({ count, pageSize: 12 });

  return (
    <div>
      {auctions.noResults ? (
        <div className="flex-1 flex flex-row items-center justify-center">
          <img
            src={NoResultsIllustraionSrc}
            alt="No results"
            className="w-full max-w-[32rem]"
          />
        </div>
      ) : (
        <div className="flex flex-row gap-[2rem] w-full flex-wrap">
          {auctions.status.loading
            ? [...Array(3)].map((_, idx) => <AuctionItemLoading key={idx} />)
            : auctions.status.data?.results?.map?.((auction) => (
                <AuctionItem key={auction.id} auction={auction} />
              ))}
        </div>
      )}
      {!auctions.noResults && <Pagination {...pagination} />}
    </div>
  );
};

export default UserAuctions;
