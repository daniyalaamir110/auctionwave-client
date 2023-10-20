import AppLogoWithoutTitleSrc from "@/assets/images/app-logo-without-title.png";
import { XMarkIcon } from "@heroicons/react/24/outline";
import SideMenu from "../SideMenu";

const Drawer = ({ shown = false, hide = () => {} }) => {
  return (
    <div
      className={`md:hidden fixed bg-black bg-opacity-50 w-[100svw] h-[100svh] top-0 transition-all ${
        !shown ? "bg-transparent -z-50" : "z-50"
      }`}
      onClick={hide}
    >
      <div
        className={`bg-white flex flex-col w-full max-w-[16rem] h-full transition-all ${
          !shown ? "-translate-x-full" : "shadow-md"
        }`}
      >
        <div className="flex flex-row p-[1.5rem] justify-between items-center">
          <img
            src={AppLogoWithoutTitleSrc}
            alt="app-logo-without-title"
            className="w-[4rem]"
          />
          <button onClick={hide}>
            <XMarkIcon width={24} />
          </button>
        </div>
        <div className="flex-1 overflow-scroll p-[1.5rem]">
          <SideMenu />
        </div>
      </div>
    </div>
  );
};

export default Drawer;
