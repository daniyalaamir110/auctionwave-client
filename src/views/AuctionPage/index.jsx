import Button from "@/components/Button";
import useModal from "@/components/Modal/useModal";
import Note from "@/components/Note";
import Paragraph from "@/components/Paragraph";
import TimeLeft from "@/components/TimeLeft";
import UserItem from "@/components/UserItem";
import { formatNumber, getPercentageTimeLeft } from "@/utils";
import {
  ArrowDownOnSquareIcon,
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  BoltIcon,
  ClockIcon,
  EyeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";
import BidModal from "./BidModal";
import useAuction from "./useAuction";
import { useNavigate } from "react-router-dom";

const AuctionPage = () => {
  const auction = useAuction();
  const bidModal = useModal();

  const currentUserBid = auction.status.data?.current_user_bid;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-[2rem]">
      {auction.status.loading ? null : (
        <>
          <h1 className="sm:text-4xl text-3xl">{auction.status.data?.title}</h1>
          <div className="flex flex-col gap-[2rem] 2xl:flex-row">
            <div className="flex flex-col gap-[1rem] max-w-[36rem] w-full">
              <div className="p-[0rem]">
                <h2 className="uppercase text-sm text-blue-900">Description</h2>
                <Paragraph text={auction.status.data?.description} />
              </div>
              <div className="w-full min-h-[10rem] max-h-[20rem] cursor-pointer bg-neutral-100 relative rounded-md overflow-hidden flex flex-col items-center justify-center">
                <img
                  src={auction.status.data?.image}
                  alt={auction.status.data?.title}
                  className="min-w-full min-h-full object-contain hover:opacity-50 transition-all"
                />
              </div>
              <div className="p-[1rem] shadow-md rounded-lg flex flex-col gap-[1rem]">
                <div className="flex sm:flex-row flex-col gap-[1rem]">
                  <div className="flex sm:flex-col flex-row justify-between gap-[0.5rem] p-[1rem] text-blue-900 bg-blue-200 rounded-md sm:w-1/3">
                    <div className="flex flex-row gap-[0.5rem] items-center sm:text-sm text-xs uppercase">
                      <UsersIcon className="w-[1rem]" />
                      <h3>Bids</h3>
                    </div>
                    <p className="text-right text-lg sm:text-xl">
                      {formatNumber(auction.status.data?.bid_count)}
                    </p>
                  </div>
                  <div className="flex sm:flex-col flex-row justify-between gap-[0.5rem] p-[1rem] text-blue-900 bg-blue-100 rounded-md sm:w-1/3">
                    <div className="flex flex-row gap-[0.5rem] items-center sm:text-sm text-xs uppercase">
                      <BoltIcon className="w-[1rem]" />
                      <h3>Top Bid</h3>
                    </div>
                    <p className="text-right text-lg sm:text-xl">
                      {!!auction.status.data?.highest_bid?.bid_amount
                        ? formatNumber(
                            auction.status.data?.highest_bid?.bid_amount
                          )
                        : "–"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-[0.5rem] p-[1rem] text-blue-900 bg-blue-50 rounded-md sm:w-1/3">
                    <div className="flex sm:flex-col flex-row justify-between gap-[0.5rem]">
                      <div className="flex flex-row gap-[0.5rem] items-center sm:text-sm text-xs uppercase">
                        <ClockIcon className="w-[1rem]" />
                        <h3>Ends in</h3>
                      </div>
                      <p className="text-right text-lg sm:text-xl">
                        {moment(auction.status.data?.valid_till).fromNow(true)}
                      </p>
                    </div>
                    <TimeLeft
                      value={getPercentageTimeLeft(
                        auction.status.data?.created_at,
                        auction.status.data?.valid_till
                      )}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-[0.5rem]">
                  <h2 className="uppercase text-sm text-blue-900">
                    Owner Information
                  </h2>
                  <div className="p-[1rem] rounded-lg bg-blue-100 flex sm:flex-row flex-col gap-[0.5rem] justify-between">
                    <UserItem user={auction.status.data?.creator} />
                    <Button
                      text="View Profile"
                      variant="secondary"
                      rightIcon={<ArrowTopRightOnSquareIcon width={16} />}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-[1rem] max-w-[36rem]">
              <div className="p-[1rem] shadow-md rounded-lg flex flex-row gap-[1rem] justify-between items-start bg-blue-50">
                <div className="flex flex-row gap-[1rem] items-center">
                  {!!currentUserBid && auction.bid.canBid && (
                    <div className="text-blue-700 text-3xl">
                      <span className="text-xl">#</span>
                      {currentUserBid.rank}
                    </div>
                  )}
                  <div className="flex flex-col gap-[0.25rem]">
                    {!auction.status.data?.is_creator ? (
                      <>
                        <h3 className="uppercase text-sm text-blue-900">
                          Your Bid
                        </h3>
                        {!currentUserBid || !auction.bid.canBid ? (
                          <p className="text-xl">None</p>
                        ) : (
                          <div>
                            <p className="text-xl">
                              {formatNumber(currentUserBid.bid_amount)}
                            </p>
                            <p className="text-xs text-neutral-600">
                              {moment(currentUserBid.updated_at).fromNow()}
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      <div>
                        <p className="text-xl">The auctioneer here is you!</p>
                        <p className="text-xs text-neutral-600">
                          You cannot bid on this auction
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-[0.5rem]">
                  {auction.status.data?.is_creator ? (
                    <Button
                      text="Go to auction"
                      variant="secondary"
                      rightIcon={
                        <ArrowTopRightOnSquareIcon className="w-[1rem]" />
                      }
                      onClick={() => {
                        navigate(`/app/auctions/my/${auction.status.data?.id}`);
                      }}
                    />
                  ) : !currentUserBid || !auction.bid.canBid ? (
                    <Button
                      text="Bid"
                      leftIcon={<ArrowDownOnSquareIcon className="w-[1rem]" />}
                      onClick={bidModal.show}
                      disabled={!auction.bid.canBid}
                    />
                  ) : (
                    <Button
                      text="Rebid"
                      leftIcon={<ArrowPathIcon className="w-[1rem]" />}
                      onClick={bidModal.show}
                    />
                  )}
                </div>
              </div>
              {!auction.bid.canBid && (
                <Note text="To place your bid, please log in or create an account. We're excited to have you participate!" />
              )}
              <div className="flex flex-row justify-between items-center mt-[1rem]">
                <h2 className="text-2xl text-blue-900">Top Bids</h2>
                <Button text="View all" leftIcon={<EyeIcon width={16} />} />
              </div>
              <div className="flex flex-col gap-[1rem]">
                {auction.topBids.status.loading ? (
                  <Note text="Loading top bids" loading />
                ) : !auction.topBids.status.data?.length ? (
                  <Note text="Be the first to place a bid! Start the excitement now – there are no bids to show yet." />
                ) : (
                  auction.topBids.status.data.map((item, idx) => {
                    const isFirst = idx === 0;
                    return (
                      <div
                        key={item.id}
                        className={`flex flex-row justify-between items-center p-[1rem] ${
                          isFirst && "bg-green-100 "
                        }rounded-lg`}
                      >
                        <UserItem user={item.bidder} />
                        <div className="flex flex-col items-end">
                          <p>{formatNumber(item.bid_amount)}</p>
                          <p className="text-xs text-neutral-600">
                            {moment(item.updated_at).fromNow()}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
          <BidModal
            hide={bidModal.hide}
            shown={bidModal.shown}
            currentUserBid={currentUserBid}
            bidContext={auction.bid}
          />
        </>
      )}
    </div>
  );
};
export default AuctionPage;
