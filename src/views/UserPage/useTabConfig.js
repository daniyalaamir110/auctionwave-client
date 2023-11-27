import useQuery from "@/hooks/useQuery";
import { MegaphoneIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const items = [
  { name: "Auctions", id: "auctions", icon: <MegaphoneIcon width={16} /> },
  // { name: "Completed", id: "sold", icon: <CheckBadgeIcon width={16} /> },
  // { name: "Won", id: "won", icon: <TrophyIcon width={16} /> },
];

const useTabConfig = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const status = query.get("view") || "auctions";

  return {
    items,
    getInitialTabIdx: () => {
      const idx = items.findIndex((item) => item.id === status);
      return idx === -1 ? 0 : idx;
    },
    onTabChange: (tab) => {
      navigate(`?view=${tab.id}`);
    },
  };
};

export default useTabConfig;
