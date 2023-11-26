import {
  ChatBubbleBottomCenterIcon,
  Cog8ToothIcon,
  MegaphoneIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";

const sideMenuConifg = {
  items: [
    {
      text: "Dashboard",
      to: "/app/dashboard",
      icon: <RectangleGroupIcon width={16} />,
    },
    {
      text: "Your Auctions",
      to: "/app/auctions/my",
      icon: <MegaphoneIcon width={16} />,
    },
    {
      text: "Your Bids",
      to: "/app/bids",
      icon: <ChatBubbleBottomCenterIcon width={16} />,
    },
    {
      text: "Account Settings",
      to: "/app/settings",
      icon: <Cog8ToothIcon width={16} />,
    },
  ],
};

export default sideMenuConifg;
