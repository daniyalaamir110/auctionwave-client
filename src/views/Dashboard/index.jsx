import useAuth from "@/redux/auth/useAuth";
import React from "react";
import useDashboard from "./useDashboard";
import AppLoader from "@/components/AppLoader";

/**
 * Welcome section
 * stats: ongoing auctions, completed auctions, pending bids, completed bids
 * Your auctions: ending today/tomorrow with view all
 * Pie chart illustrating my auctions by category
 * Pending bids: today or tomorrow with see all
 * Auctions you might be interested in
 */

const Dashbaord = () => {
  const auth = useAuth();
  const dashboard = useDashboard();

  return (
    <div className="flex flex-col gap-[2rem] min-h-full w-full max-w-[72rem]">
      {dashboard.status.loading ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <AppLoader fullScreen={false} />
        </div>
      ) : (
        <>
          <h1 className="sm:text-4xl text-3xl text-blue-700">
            Welcome {auth.state.user?.first_name}!
          </h1>
        </>
      )}
    </div>
  );
};

export default Dashbaord;
