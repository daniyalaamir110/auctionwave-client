import AppLogoWithoutTitleSrc from "@/assets/images/app-logo-without-title.png";
import NoBidsIllustrationSrc from "@/assets/images/no-bids-illustration.svg";
import Button from "@/components/Button";
import useModal from "@/components/Modal/useModal";
import Note from "@/components/Note";
import Paragraph from "@/components/Paragraph";
import TimeLeft from "@/components/TimeLeft";
import UserItem, { UserItemLoading } from "@/components/UserItem";
import { formatNumber, getPercentageTimeLeft } from "@/utils";
import {
  ArrowDownOnSquareIcon,
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  BoltIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  EyeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import BidModal from "./BidModal";
import useAuction from "./useAuction";
import { useRef } from "react";

const AuctionPage = () => {
  const auction = useAuction();
  const bidModal = useModal();

  const currentUserBid = auction.status.data?.current_user_bid;
  const navigate = useNavigate();

  const moreAuctionsRef = useRef();

  const onMoreAuctionsScroll = (x) => {
    moreAuctionsRef.current?.scrollBy({ left: x, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-[2rem]">
      {auction.status.loading ? (
        <div className="pt-[4rem] w-full flex flex-col gap-[4rem] items-center justify-center">
          <img
            src={AppLogoWithoutTitleSrc}
            alt="Loading"
            className="w-[6rem] animate-ping"
          />
          <p className="text-2xl animate-pulse">Please Wait</p>
        </div>
      ) : (
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
                  [...new Array(5)].map((_, idx) => {
                    return (
                      <div
                        key={idx}
                        className="h-[5rem] bg-neutral-100 rounded-lg animate-pulse p-[1rem] flex flex-row justify-between items-center"
                      >
                        <UserItemLoading />
                        <div className="flex flex-col gap-[0.5rem] items-end">
                          <div className="h-[1.25rem] w-[4rem] bg-neutral-200 rounded-md" />
                          <div className="h-[1rem] w-[3rem] bg-neutral-200 rounded-md" />
                        </div>
                      </div>
                    );
                  })
                ) : !auction.topBids.status.data?.length ? (
                  <>
                    <Note text="No bids to show" />
                    <img
                      src={NoBidsIllustrationSrc}
                      alt="no bids"
                      className="max-h-[24rem] my-[2rem]"
                    />
                  </>
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
          <div className="relative max-w-[74rem] w-full">
            <h2 className="text-2xl py-[1rem]">
              More From {auction.status.data?.creator?.username}
            </h2>
            {!auction.moreAuctions.status.loading &&
              !auction.moreAuctions.status.data?.results?.length && (
                <Note text="No more auctions from this user" />
              )}
            <div
              className="overflow-x-scroll flex flex-row gap-[1rem] items-center justify-start"
              ref={moreAuctionsRef}
            >
              {auction.moreAuctions.status.loading
                ? [...new Array(5)].map((_, idx) => (
                    <div
                      className="w-[16rem] h-[16rem] rounded-lg shadow-md bg-neutral-100 shrink-0 animate-pulse"
                      key={idx}
                    />
                  ))
                : auction.moreAuctions.status.data?.results?.map((item) => (
                    <Link
                      key={item.id}
                      to={`/app/auctions/${item.id}`}
                      className="w-[16rem] h-[16rem] rounded-lg shadow-md shrink-0 flex flex-row items-center justify-center overflow-x-hidden relative hover:shadow-lg transition-all"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="min-w-full min-h-full object-cover"
                      />
                      <div className="bg-neutral-900 bg-opacity-50 absolute bottom-0 left-0 p-[1rem]">
                        <h3 className="w-full text-white text-xl line-clamp-2 overflow-hidden select-none font-bold">
                          {item.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
            </div>
            <button
              className="absolute top-[50%] left-[1rem] -translate-y-[50%] h-[3rem] w-[3rem] shadow-lg bg-white rounded-full flex flex-col items-center justify-center hover:scale-110 transition-all"
              onClick={() => onMoreAuctionsScroll(-16 * 16)}
            >
              <ChevronLeftIcon width={20} />
            </button>
            <button
              className="absolute top-[50%] right-[1rem] -translate-y-[50%] h-[3rem] w-[3rem] shadow-lg bg-white rounded-full flex flex-col items-center justify-center hover:scale-110 transition-all"
              onClick={() => onMoreAuctionsScroll(16 * 16)}
            >
              <ChevronRightIcon width={20} />
            </button>
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
