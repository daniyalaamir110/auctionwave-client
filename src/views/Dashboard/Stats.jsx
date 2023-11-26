import Button from "@/components/Button";
import {
  ArrowRightIcon,
  EyeIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import React from "react";

const Stat = ({ title = "", value = "", loading = false }) => {
  if (loading) {
    return (
      <div className="bg-neutral-100 min-h-[12rem] lg:w-[calc(100%/4-3rem/4)] w-[calc(100%/2-1rem/2)] p-[1rem] rounded-lg flex flex-col justify-between gap-[1rem] animate-pulse" />
    );
  }
  return (
    <div className="bg-blue-50 lg:w-[calc(100%/4-3rem/4)] w-[calc(100%/2-1rem/2)] min-h-[12rem] p-[1rem] rounded-lg shadow-md flex flex-col justify-between gap-[1rem]">
      <h2 className="text-sm">{title}</h2>
      <p className="text-blue-700 text-4xl">{value}</p>
      <Button
        text="See all"
        variant="secondary"
        leftIcon={<EyeIcon width={16} />}
        rightIcon={<ArrowRightIcon width={16} />}
      />
    </div>
  );
};

const StatContainer = ({ loading = false, children }) => {
  if (loading) {
    return (
      <div className="flex flex-row gap-[1rem] flex-wrap shadow-lg bg-gradient-to-b from-white to-neutral-50 p-[1rem] rounded-xl animate-pulse">
        {children}
      </div>
    );
  }
  return (
    <div className="flex flex-row gap-[1rem] flex-wrap shadow-lg bg-gradient-to-b from-blue-400 to-blue-700 p-[1rem] rounded-xl">
      {children}
    </div>
  );
};

const Stats = ({ loading = false, stats = {} }) => {
  return (
    <div>
      <div className="flex flex-row gap-[0.5rem] items-center">
        <SparklesIcon width={24} />
        <h2 className="text-2xl py-[1rem]">Your stats</h2>
      </div>
      <StatContainer loading={loading}>
        <Stat
          title="ONGOING AUCTIONS"
          value={stats?.ongoing_auctions_count}
          loading={loading}
        />
        <Stat
          title="COMPLETED AUCTIONS"
          value={stats?.completed_auctions_count}
          loading={loading}
        />
        <Stat
          title="PENDING BIDS"
          value={stats?.pending_bids_count}
          loading={loading}
        />
        <Stat
          title="SUCCESSFUL BIDS"
          value={stats?.successful_bids_count}
          loading={loading}
        />
      </StatContainer>
    </div>
  );
};

export default Stats;
