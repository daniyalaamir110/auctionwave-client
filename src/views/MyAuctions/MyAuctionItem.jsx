import Button from "@/components/Button";
import { getTimeLeft } from "@/utils";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  CheckIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import useSellAuction from "./useSellAuction";

const MyAuctionItem = ({ auction, type }) => {
  const navigate = useNavigate();

  const sellAuction = useSellAuction();

  return (
    <div className="p-[1rem] rounded-lg shadow-md bg-blue-50 flex flex-row gap-[1rem]">
      <div className="w-[6rem] sm:w-[12rem] h-[6rem] sm:h-[12rem] border-2 rounded-md border-blue-700 flex flex-row items-center justify-center bg-white shrink-0">
        <img src={auction.image} alt={auction.title} />
      </div>
      <div className="flex flex-col gap-[1rem] items-start">
        <h3 className="text-lg sm:text-xl text-blue-800">{auction.title}</h3>
        <p className="line-clamp-2 sm:text-lg text-sm">{auction.description}</p>
        <div className="flex flex-row gap-[0.25rem] items-center text-blue-700">
          {type === "ongoing" ? (
            <ClockIcon width={16} />
          ) : type === "finished" ? (
            <ExclamationCircleIcon width={16} />
          ) : (
            <CheckCircleIcon width={16} />
          )}
          <p className="text-sm text-blue-700">
            {type === "ongoing" ? "Ending" : "Ended"}{" "}
            {getTimeLeft(auction.valid_till)} • Winner –{" "}
            {type === "ongoing" ? (
              "(TBD)"
            ) : !auction.highest_bid ? (
              "(None)"
            ) : (
              <a
                target="_blank"
                href={`/app/users/${auction.highest_bid.bidder?.id}`}
                className="underline text-blue-700"
              >
                @{auction.highest_bid.bidder?.username}
              </a>
            )}
          </p>
        </div>
        {auction.status === "ongoing" ? (
          <Button
            text="Go to auction"
            variant="secondary"
            rightIcon={<ArrowRightIcon width={16} />}
            onClick={() => {
              navigate(`/app/auctions/${auction.id}`);
            }}
          />
        ) : auction.status === "finished" ? (
          <Button
            text="Mark as sold"
            leftIcon={<CheckIcon width={16} />}
            loading={sellAuction.status.loading}
            disabled={!auction.highest_bid}
            onClick={() => sellAuction.sell(auction.id)}
          />
        ) : null}
      </div>
    </div>
  );
};

export default MyAuctionItem;
