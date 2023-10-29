import Button from "@/components/Button";
import { ArrowRightIcon, ClockIcon } from "@heroicons/react/24/outline";
import React from "react";

const MyAuctionItem = () => {
  return (
    <div className="p-[1rem] rounded-lg shadow-md bg-blue-50 flex flex-row gap-[1rem]">
      <div className="w-[6rem] sm:w-[12rem] h-[6rem] sm:h-[12rem] border-2 rounded-md border-blue-700 flex flex-row items-center justify-center bg-white shrink-0">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/f/f6/2005-2008_Honda_Accord_Euro_Luxury_sedan_02.jpg"
          alt="honda accord 2005"
        />
      </div>
      <div className="flex flex-col gap-[1rem] items-start">
        <h3 className="text-lg sm:text-xl text-blue-800">Honda Accord 2005</h3>
        <p className="line-clamp-2 sm:text-lg text-sm">
          Up for auction: A meticulously cared for 2005 Honda Accord, a model of
          reliability and fuel efficiency. This low-mileage sedan boasts sleek
          design, top-notch maintenance, and a velvety-smooth ride. An
          exceptional opportunity not to be missed!
        </p>
        <div className="flex flex-row gap-[0.25rem] items-center text-blue-700">
          <ClockIcon width={16} />
          <p className="text-sm text-blue-700">2 days left</p>
        </div>
        <Button
          text="Go to auction"
          variant="secondary"
          rightIcon={<ArrowRightIcon width={16} />}
        />
      </div>
    </div>
  );
};

export default MyAuctionItem;
