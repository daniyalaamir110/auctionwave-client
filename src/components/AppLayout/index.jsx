import { Outlet, useMatch } from "react-router-dom";
import Drawer from "./Drawer";
import useDrawer from "./Drawer/useDrawer";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { memo } from "react";

const AppLayout = memo(() => {
  const { shown, show, hide } = useDrawer();

  const isHome = useMatch("/");

  return (
    <div className="flex flex-col w-[100svw] h-[100svh] overflow-hidden">
      <Navbar onClickMenu={show} />
      {!isHome && <Drawer shown={shown} hide={hide} />}
      <div className="flex-1 overflow-scroll">
        <div className="flex flex-row justify-between gap-[2rem] h-full flex-wrap">
          {!isHome && (
            <div className="w-[16rem] p-[2rem] h-full overflow-scroll hidden lg:block shadow-md">
              <SideMenu />
            </div>
          )}
          <div className="flex-1 sm:p-[2rem] p-[1rem] h-full overflow-scroll">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
});

export default AppLayout;
