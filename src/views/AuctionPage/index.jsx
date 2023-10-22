import Carousel from "@/components/Carousel";
import React from "react";

const AuctionPage = () => {
  return (
    <div className="flex flex-col gap-[2rem]">
      <h1 className="text-4xl">Honda Accord 2005</h1>
      <div className="flex flex-col gap-[1rem] max-w-[36rem] w-full">
        <Carousel />
      </div>
    </div>
  );
};

export default AuctionPage;
