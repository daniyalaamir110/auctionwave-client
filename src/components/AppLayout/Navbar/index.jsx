import AppLogoWithoutTitleSrc from "@/assets/images/app-logo-without-title.png";
import Avatar from "@/components/Avatar";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import AccountPopover from "./AccountPopover";

const Navbar = ({ onClickMenu = () => {} }) => {
  return (
    <div className="flex flex-row p-[1rem] gap-[1rem] items-center justify-between shadow">
      <div className="flex flex-row gap-[1rem] items-center">
        <Bars3Icon
          width={32}
          className="hover:text-blue-700 transition-all cursor-pointer"
          onClick={onClickMenu}
        />
        <div className="flex flex-row items-center gap-[0.25rem]">
          <img
            src={AppLogoWithoutTitleSrc}
            alt="app-logo-without-title"
            className="w-[4rem]"
          />
          <h1 className="text-blue-700 text-lg">AuctionWave</h1>
        </div>
      </div>
      <div className="flex flex-row gap-[1rem]"></div>
      <div className="flex flex-row items-center gap-[1rem] justify-end">
        <BellIcon
          width={24}
          className="hover:text-blue-700 transition-all cursor-pointer"
        />
        <div className="relative">
          <button>
            <Avatar />
          </button>
          <AccountPopover />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
