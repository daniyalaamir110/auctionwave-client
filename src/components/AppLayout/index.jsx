import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-row">
        <div className="w-[18rem] bg-blue-700 h-screen overflow-y-scroll">
          <div>{/* Sidebar */}</div>
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
