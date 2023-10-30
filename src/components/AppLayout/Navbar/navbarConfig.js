import {
  HomeIcon,
  ListBulletIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/outline";

const navbarConfig = {
  items: [
    {
      text: "Home",
      to: "/",
      icon: <HomeIcon width={16} />,
    },
    {
      text: "Categories",
      to: "/app/categories",
      icon: <ListBulletIcon width={16} />,
    },
    {
      text: "Auctions",
      to: "/app/auctions",
      icon: <MegaphoneIcon width={16} />,
    },
  ],
};

export default navbarConfig;
