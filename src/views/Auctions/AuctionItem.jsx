import Button from "@/components/Button";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import ImageNotFoundSrc from "@/assets/images/image-not-found.svg";
import {
  formatNumber,
  getPercentageTimeLeft,
  getTimeAgo,
  getTimeLeft,
} from "@/utils";

const TimeLeft = ({ value = 45, text = "" }) => {
  return (
    <div className="w-full max-w-[180rem] flex flex-col gap-[0.25rem] items-end">
      <div className="w-full bg-blue-200 rounded-full overflow-hidden">
        <div
          className={`bg-blue-700 p-[0.125rem]`}
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="text-[0.625rem] text-neutral-600 uppercase">Ends {text}</p>
    </div>
  );
};

const AuctionItem = ({ auction }) => {
  return (
    <div className="xl:w-[calc((100%/3)-2rem*((3-1)/3))] lg:w-[calc((100%/2)-2rem*((2-1)/2))] shadow-md rounded-md flex flex-col overflow-hidden">
      <div className="flex flex-col items-center justify-center">
        <div className="w-full h-[16rem] flex flex-col items-center justify-center overflow-hidden">
          {/* <img
            src={ImageNotFoundSrc}
            alt="Not found"
            className="max-w-[8rem] max-h-[8rem] object-cover"
          /> */}
          <img
            src={auction.image}
            alt="Honda Accord 2005"
            className="min-w-full min-h-full object-cover"
          />
        </div>
      </div>
      <div className="p-[1rem] flex flex-col gap-[1rem]">
        <p className="bg-green-100 p-[0.25rem] text-xs text-green-700 rounded-md w-fit">
          {auction.category.title}
        </p>
        <div>
          <h2 className="text-xl">{auction.title}</h2>
          <p className="text-xs text-neutral-400 uppercase">
            {getTimeAgo(auction.created_at)}
          </p>
        </div>
        <p className="text-sm text-neutral-600 line-clamp-2">
          {auction.description}
        </p>
        <div>
          <h3 className="text-xs text-neutral-900">BASE PRICE</h3>
          <p className="text-blue-700">
            <span className="text-xs">PKR </span>
            {formatNumber(auction.base_price)}
          </p>
          <div className="flex flex-row py-[1rem]">
            <TimeLeft
              value={getPercentageTimeLeft(
                auction.created_at,
                auction.valid_till
              )}
              text={getTimeLeft(auction.valid_till)}
            />
          </div>
        </div>
        <Button
          text="View Details"
          variant="secondary"
          rightIcon={<ArrowTopRightOnSquareIcon width={16} />}
        />
      </div>
    </div>
  );
};

export default AuctionItem;
