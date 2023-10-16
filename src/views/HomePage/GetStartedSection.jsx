import Button from "@/components/Button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useNavigate } from "react-router-dom";

const GetStartedSection = () => {
  const navigate = useNavigate();

  return (
    <div className="p-[4rem] bg-blue-700">
      <h2 className="text-center text-4xl mb-[4rem] text-white">Get Started</h2>
      <p className="text-white text-xl mx-auto text-center mb-[4rem]">
        Ready to embark on your auction journey? Sign up now and start bidding
        today.
      </p>
      <div className="w-fit mx-auto">
        <Button
          variant="secondary"
          text="Sign up now"
          onClick={() => {
            navigate("/auth/signup");
          }}
          rightIcon={<ArrowRightIcon width={20} />}
          large
        />
      </div>
    </div>
  );
};

export default GetStartedSection;
