import {
  ChatBubbleBottomCenterIcon,
  Cog8ToothIcon,
  MegaphoneIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const SideLink = ({ text = "", icon = null, active = false }) => {
  return (
    <Link
      className={`p-[0.75rem] rounded-lg text-sm flex flex-row gap-[0.5rem] items-center transition-all ${
        active
          ? "bg-blue-700 text-white shadow-lg hover:bg-blue-800"
          : "hover:text-blue-700 hover:bg-blue-100 text-neutral-900"
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

const SideMenu = () => {
  return (
    <div className="flex flex-col gap-[1rem] h-full">
      <SideLink
        text="Dashboard"
        active
        icon={<RectangleGroupIcon width={16} />}
      />
      <SideLink text="Your Auctions" icon={<MegaphoneIcon width={16} />} />
      <SideLink
        text="Your Bids"
        icon={<ChatBubbleBottomCenterIcon width={16} />}
      />
      <SideLink text="Settings" icon={<Cog8ToothIcon width={16} />} />
    </div>
  );
};

export default SideMenu;
