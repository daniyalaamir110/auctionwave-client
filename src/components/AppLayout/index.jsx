import { Outlet } from "react-router-dom";
import Drawer from "./Drawer";
import useSidebar from "./Drawer/useSidebar";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const AppLayout = () => {
  const { shown, show, hide } = useSidebar();

  return (
    <div className="flex flex-col w-[100svw] h-[100svh] overflow-hidden">
      <Navbar onClickMenu={show} />
      <Drawer shown={shown} hide={hide} />
      <div className="flex-1 overflow-scroll">
        <div className="flex flex-row justify-between gap-[2rem] h-full flex-wrap">
          <div className="w-[16rem] p-[2rem] h-full overflow-scroll hidden md:block">
            <SideMenu />
          </div>
          <div className="flex-1 p-[2rem] h-full overflow-scroll">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
