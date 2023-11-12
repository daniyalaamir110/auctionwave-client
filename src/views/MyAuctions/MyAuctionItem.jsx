import Button from "@/components/Button";
import { getTimeLeft } from "@/utils";
import { ArrowRightIcon, ClockIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const MyAuctionItem = ({ auction }) => {
  const navigate = useNavigate();

  return (
    <div className="p-[1rem] rounded-lg shadow-md bg-blue-50 flex flex-row gap-[1rem]">
      <div className="w-[6rem] sm:w-[12rem] h-[6rem] sm:h-[12rem] border-2 rounded-md border-blue-700 flex flex-row items-center justify-center bg-white shrink-0">
        <img src={auction.image} alt={auction.title} />
      </div>
      <div className="flex flex-col gap-[1rem] items-start">
        <h3 className="text-lg sm:text-xl text-blue-800">{auction.title}</h3>
        <p className="line-clamp-2 sm:text-lg text-sm">{auction.description}</p>
        <div className="flex flex-row gap-[0.25rem] items-center text-blue-700">
          <ClockIcon width={16} />
          <p className="text-sm text-blue-700">
            Expires {getTimeLeft(auction.valid_till)}
          </p>
        </div>
        <Button
          text="Go to auction"
          variant="secondary"
          rightIcon={<ArrowRightIcon width={16} />}
          onClick={() => {
            navigate(`${auction.id}`);
          }}
        />
      </div>
    </div>
  );
};

export default MyAuctionItem;
