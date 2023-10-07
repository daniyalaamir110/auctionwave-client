import AppLogoWithoutTitleSrc from "@/assets/images/app-logo-without-title.png";
import Avatar from "@/components/Avatar";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";

const Navbar = ({ onClickMenu = () => {} }) => {
  return (
    <div className="flex flex-row p-[1rem] gap-[1rem] items-center justify-between shadow">
      <div className="flex flex-row gap-[2rem] items-center">
        <Bars3Icon
          width={32}
          className="hover:text-blue-700 transition-all cursor-pointer"
          onClick={onClickMenu}
        />
        <img
          src={AppLogoWithoutTitleSrc}
          alt="app-logo-without-title"
          className="w-[6rem]"
        />
        <h1 className="text-blue-700 text-2xl">AuctionWave</h1>
      </div>
      <div className="flex flex-row gap-[1rem]"></div>
      <div className="flex flex-row items-center gap-[2rem] justify-end">
        <BellIcon
          width={32}
          className="hover:text-blue-700 transition-all cursor-pointer"
        />
        <div className="relative">
          <button>
            <Avatar />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
