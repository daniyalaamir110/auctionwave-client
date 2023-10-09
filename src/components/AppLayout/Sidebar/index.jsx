import AppLogoWithoutTitleSrc from "@/assets/images/app-logo-without-title.png";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Sidebar = ({ shown = false, hide = () => {} }) => {
  return (
    <div
      className={`fixed bg-black bg-opacity-50 w-screen h-screen top-0 transition-all ${
        !shown ? "bg-transparent -z-50" : "z-50"
      }`}
      onClick={hide}
    >
      <div
        className={`bg-white w-full max-w-[16rem] h-full p-[1.5rem] transition-all ${
          !shown ? "-translate-x-full" : "shadow-md"
        }`}
      >
        <div className="flex flex-row justify-between items-start">
          <img
            src={AppLogoWithoutTitleSrc}
            alt="app-logo-without-title"
            className="w-[4rem]"
          />
          <button onClick={hide}>
            <XMarkIcon width={32} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
