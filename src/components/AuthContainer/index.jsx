import AppLogoWithTitleSrc from "@/assets/images/app-logo-with-title.png";
import { Link } from "react-router-dom";
import Button from "../Button";
import { ArrowLeftIcon, HomeIcon } from "@heroicons/react/24/outline";

const AuthContainer = ({
  children,
  title = "",
  contentContainerClassName = "",
}) => {
  return (
    <div className="w-screen min-h-screen flex flex-row items-center justify-center bg-blue-50 md:p-[3rem] wave-bg">
      <div className="max-w-[36rem] w-full md:p-[3rem] p-[2rem] flex flex-col gap-[3rem] items-center bg-white shadow-md border border-neutral-100 relative">
        <Link to="/">
          <img
            src={AppLogoWithTitleSrc}
            alt="app-logo-with-title"
            className="w-[12rem] select-none"
          />
        </Link>
        <h2 className="text-2xl text-black select-none">{title}</h2>
        <div className={`w-full ${contentContainerClassName}`}>{children}</div>
        <div className="absolute top-[1rem] left-[1rem]">
          <Link to="/">
            <Button
              leftIcon={<ArrowLeftIcon width={16} />}
              rightIcon={<HomeIcon width={16} />}
              variant="secondary"
              large
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
