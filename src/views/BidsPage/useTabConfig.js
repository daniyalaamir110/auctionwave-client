import useQuery from "@/hooks/useQuery";
import {
  ClockIcon,
  HandThumbDownIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

const items = [
  { name: "Pending", id: "pending", icon: <ClockIcon width={16} /> },
  { name: "Won", id: "won", icon: <TrophyIcon width={16} /> },
  { name: "Lost", id: "lost", icon: <HandThumbDownIcon width={16} /> },
];

const useTabConfig = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const status = query.get("status") || "pending";

  return useMemo(
    () => ({
      items,
      getInitialTabIdx: () => {
        const idx = items.findIndex((item) => item.id === status);
        return idx === -1 ? 0 : idx;
      },
      onTabChange: (tab) => {
        navigate(`?status=${tab.id}`);
      },
    }),
    [status]
  );
};

export default useTabConfig;
