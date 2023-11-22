import useQuery from "@/hooks/useQuery";
import {
  ClipboardDocumentCheckIcon,
  ClockIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const items = [
  { name: "Ongoing", id: "ongoing", icon: <ClockIcon width={16} /> },
  { name: "Finished", id: "finished", icon: <LockClosedIcon width={16} /> },
  {
    name: "Sold",
    id: "sold",
    icon: <ClipboardDocumentCheckIcon width={16} />,
  },
];

const useTabConfig = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const status = query.get("status") || "ongoing";

  return {
    items,
    getInitialTabIdx: () => {
      const idx = items.findIndex((item) => item.id === status);
      return idx === -1 ? 0 : idx;
    },
    onTabChange: (tab) => {
      navigate(`?status=${tab.id}`);
    },
  };
};

export default useTabConfig;
