import AppLogoWithoutTitleSrc from "@/assets/images/app-logo-without-title.png";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import useAuth from "@/redux/auth/useAuth";
import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  BellIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { memo, useCallback, useEffect } from "react";
import {
  Link,
  NavLink,
  useLocation,
  useMatch,
  useNavigate,
} from "react-router-dom";
import AccountPopover from "./AccountPopover";
import useAccountPopover from "./AccountPopover/useAccountPopover";
import navbarConfig from "./navbarConfig";
import useNavbarCollapse from "./useNavbarCollapse";

const NavItem = memo(({ text, to = "/", icon = null, match = false }) => {
  console.log("rerender " + text);

  return (
    <NavLink
      to={to}
      className={`p-[0.75rem] rounded-lg text-sm flex flex-row gap-[0.5rem] items-center transition-all ${
        match
          ? "bg-blue-700 text-white shadow-lg hover:bg-blue-800"
          : "hover:text-blue-700 hover:bg-blue-100 text-neutral-900"
      }`}
    >
      {icon}
      <span>{text}</span>
    </NavLink>
  );
});

const NavItemList = memo(() => {
  const location = useLocation();

  const isMatch = useCallback(
    (pathname) => {
      return pathname === location.pathname;
    },
    [location.pathname]
  );

  return navbarConfig.items.map((item, idx) => (
    <NavItem {...item} match={isMatch(item.to)} key={idx} />
  ));
});

const Navbar = memo(({ onClickMenu = () => {} }) => {
  const accountPopover = useAccountPopover();
  const auth = useAuth();
  const navigate = useNavigate();
  const navbarCollapse = useNavbarCollapse();
  const isHome = useMatch("/");
  const location = useLocation();

  useEffect(navbarCollapse.hide, [location.pathname]);

  const navigateToLogin = useCallback(() => navigate("/auth/login"), []);

  return (
    <>
      <div className="flex flex-row p-[1rem] h-[5rem] gap-[1rem] items-center justify-between">
        <div className="flex flex-row gap-[1rem] items-center">
          {!isHome && (
            <Bars3Icon
              width={24}
              className="hover:text-blue-700 transition-all cursor-pointer lg:hidden"
              onClick={onClickMenu}
            />
          )}
          <div className="flex flex-row items-center gap-[0.25rem]">
            <Link to="/">
              <img
                src={AppLogoWithoutTitleSrc}
                alt="app-logo-without-title"
                className="w-[4rem]"
              />
            </Link>
            <div className="hidden lg:flex flex-row gap-[1rem] p-[1rem]">
              <NavItemList />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-[1rem]"></div>
        <div className="flex flex-row items-center gap-[1rem] justify-end">
          <button
            className={`lg:hidden transition-all hover:text-blue-700 ${
              navbarCollapse.collapsed ? "" : "rotate-180"
            }`}
            onClick={navbarCollapse.toggle}
          >
            <ChevronDownIcon width={24} />
          </button>
          {auth.state.success ? (
            <>
              <BellIcon
                width={24}
                className="hover:text-blue-700 transition-all cursor-pointer"
              />
              <div className="relative">
                <button
                  onClick={accountPopover.toggle}
                  className={`transition-all ${
                    accountPopover.shown && "scale-110"
                  }`}
                >
                  <Avatar />
                </button>
                <AccountPopover
                  shown={accountPopover.shown}
                  hide={accountPopover.hide}
                />
              </div>
            </>
          ) : (
            <Button
              text="Log in"
              leftIcon={<ArrowLeftOnRectangleIcon width={16} />}
              onClick={navigateToLogin}
            />
          )}
        </div>
      </div>
      <div
        className={`overflow-scroll lg:hidden transition-all duration-700 ${
          navbarCollapse.collapsed ? "max-h-0" : "max-h-full"
        }`}
      >
        <div className="flex flex-col gap-[0.5rem] p-[1rem]">
          <NavItemList />
        </div>
      </div>
      <div className="shadow border-b border-transparent" />
    </>
  );
});

export default Navbar;
