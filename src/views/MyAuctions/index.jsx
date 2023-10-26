import Button from "@/components/Button";
import Tab from "@/components/Tab";
import useTab from "@/components/Tab/useTab";
import {
  ArrowRightIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  LockClosedIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";

const MyAuctions = () => {
  const tab = useTab({
    items: [
      { name: "Ongoing", icon: <ClockIcon width={16} /> },
      { name: "Finished", icon: <LockClosedIcon width={16} /> },
      { name: "Sold", icon: <ClipboardDocumentCheckIcon width={16} /> },
    ],
  });

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-[2rem] min-h-full">
      <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-[1.5rem]">
        <h1 className="sm:text-4xl text-3xl">Your Auctions</h1>
        <Button
          text="Start Auction"
          leftIcon={<PlusIcon width={16} />}
          onClick={() => navigate("/app/auctions/create")}
        />
      </div>
      <Tab
        getTabClickHandler={tab.getTabClickHandler}
        items={tab.items}
        selectedTabIdx={tab.selectedTabIdx}
      />
    </div>
  );
};

export default MyAuctions;
