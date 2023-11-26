import Insights from "./Insights";
import Stats from "./Stats";
import TopAuctions from "./TopAuctions";
import TopBids from "./TopBids";
import Welcome from "./Welcome";
import useDashboard from "./useDashboard";

const Dashbaord = () => {
  const dashboard = useDashboard();

  return (
    <div className="flex flex-col gap-[2rem] min-h-full w-full max-w-[72rem]">
      <Welcome />
      <Stats
        loading={dashboard.status.loading}
        stats={dashboard.status.data?.stats}
      />
      <TopAuctions
        auctions={dashboard.status.data?.top_ongoing_auctions}
        loading={dashboard.status.loading}
      />
      <TopBids
        bids={dashboard.status.data?.top_pending_bids}
        loading={dashboard.status.loading}
        empty={!dashboard.status.data?.stats.pending_bids_count}
      />
      <Insights
        categoryCounts={dashboard.status.data?.category_counts}
        loading={dashboard.status.loading}
      />
    </div>
  );
};

export default Dashbaord;
