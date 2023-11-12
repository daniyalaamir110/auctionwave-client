import Button from "@/components/Button";
import useAuth from "@/redux/auth/useAuth";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import sideMenuConifg from "./sideMenuConfig";

const SideLink = ({ text = "", to = "/", icon = null, match = false }) => {
  return (
    <Link
      to={to}
      className={`p-[0.75rem] rounded-lg text-sm flex flex-row gap-[0.5rem] items-center transition-all ${
        match
          ? "bg-blue-700 text-white shadow-lg hover:bg-blue-800"
          : "hover:text-blue-700 hover:bg-blue-100 text-neutral-900"
      }`}
    >
      {icon}
      <span>{text}</span>
    </Link>
  );
};

const SideMenu = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isMatch = useCallback(
    (pathname) => {
      return pathname === location.pathname;
    },
    [location.pathname]
  );

  return (
    <div className="flex flex-col gap-[1rem]">
      {auth.state.success ? (
        sideMenuConifg.items.map((item, idx) => (
          <SideLink {...item} match={isMatch(item.to)} key={item.to} />
        ))
      ) : (
        <>
          <div className="p-[2rem] m-[-2rem] mb-[1rem] bg-blue-100">
            <p className="text-lg text-blue-700">You are not logged in</p>
            <p className="text-sm text-blue-900">
              Please log in to explore and make use of complete functionality
            </p>
          </div>
          <Button
            text="Log in"
            variant="secondary"
            rightIcon={<ArrowRightIcon width={16} />}
            onClick={() => {
              navigate("/auth/login");
            }}
          />
          <Button
            text="Register"
            variant="secondary"
            rightIcon={<ArrowRightIcon width={16} />}
            onClick={() => {
              navigate("/auth/signup");
            }}
          />
        </>
      )}
    </div>
  );
};

export default SideMenu;
