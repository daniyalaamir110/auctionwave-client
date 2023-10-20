import AppLogoWithoutTitle from "@/assets/images/app-logo-without-title.png";
import WelcomeIllustrationSrc from "@/assets/images/welcome-illustration.svg";
import Button from "@/components/Button";
import { ArrowRightIcon, BoltIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const IntroSection = () => {
  const navigate = useNavigate();

  return (
    <div className="py-[4rem] md:px-[4rem] px-[2rem] flex lg:flex-row flex-col gap-[8rem] items-center justify-between bg-blue-50">
      <div className="flex-1">
        <img
          src={AppLogoWithoutTitle}
          alt="logo"
          className="max-w-[8rem] mb-[4rem]"
        />
        <h1 className="text-5xl mb-[2rem]">
          Welcome To <span className="text-blue-700">AuctionWave</span>!
        </h1>
        <p className="text-2xl mb-[2rem]">Unlock the thrill of winning</p>
        <p className="text-xl mb-[2rem]">
          Are you ready to experience the excitement of online auctions like
          never before? <span className="text-blue-700">AuctionWave</span> is
          your gateway to a world of bidding, winning, and uncovering unique
          treasures.
        </p>
        <div className="flex flex-row gap-[1rem]">
          <Button text="Get started" large leftIcon={<BoltIcon width={20} />} />
          <Button
            text="Go to app"
            large
            variant="secondary"
            rightIcon={<ArrowRightIcon width={20} />}
            onClick={() => {
              navigate("/auth/login");
            }}
          />
        </div>
      </div>
      <div className="flex-1">
        <img
          src={WelcomeIllustrationSrc}
          alt="welcome"
          className="max-w-[40rem] w-full"
        />
      </div>
    </div>
  );
};

export default IntroSection;
