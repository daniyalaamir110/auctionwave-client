import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import useSidebar from "./Sidebar/useSidebar";

const AppLayout = () => {
  const { shown, show, hide } = useSidebar();

  return (
    <div>
      <Navbar onClickMenu={show} />
      <Sidebar shown={shown} hide={hide} />
    </div>
  );
};

export default AppLayout;
