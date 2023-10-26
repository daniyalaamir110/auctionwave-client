import Button from "@/components/Button";
import useAuth from "@/redux/auth/useAuth";
import {
  ArrowRightIcon,
  ChatBubbleBottomCenterIcon,
  Cog8ToothIcon,
  MegaphoneIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import { Link, useMatch, useNavigate } from "react-router-dom";

const SideLink = ({ text = "", to = "/", icon = null }) => {
  const match = useMatch(to);

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

  return (
    <div className="flex flex-col gap-[1rem]">
      {auth.state.success ? (
        <>
          <SideLink
            text="Dashboard"
            to="/app/dashboard"
            icon={<RectangleGroupIcon width={16} />}
          />
          <SideLink
            text="Your Auctions"
            to="/app/auctions/my"
            icon={<MegaphoneIcon width={16} />}
          />
          <SideLink
            text="Your Bids"
            to="/app/bids/my"
            icon={<ChatBubbleBottomCenterIcon width={16} />}
          />
          <SideLink
            text="Settings"
            to="/app/settings"
            icon={<Cog8ToothIcon width={16} />}
          />
        </>
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
