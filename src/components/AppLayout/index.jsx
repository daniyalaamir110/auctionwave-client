import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import useSidebar from "./Sidebar/useSidebar";

const AppLayout = () => {
  const { shown, show, hide } = useSidebar();

  return (
    <div className="flex flex-col w-[100svw] h-[100svh] overflow-hidden">
      <Navbar onClickMenu={show} />
      <Sidebar shown={shown} hide={hide} />
      <div className="flex-1 overflow-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
