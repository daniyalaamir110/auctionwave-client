import React from "react";
import { Link } from "react-router-dom";

const BidItem = () => {
  return (
    <div className="p-[1rem] bg-blue-50 shadow rounded-lg flex flex-row gap-[1rem] items-center">
      <Link to="/app/auctions/1">Honda Accord 2005</Link>
    </div>
  );
};

export default BidItem;
