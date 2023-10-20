import { SparklesIcon } from "@heroicons/react/24/outline";

const WhyUsItem = ({ title, description }) => {
  return (
    <div className="flex flex-row gap-[2rem] w-full">
      <SparklesIcon width={24} />
      <p className="text-xl flex-1">
        <span className="text-blue-700">{title} – </span>
        {description}
      </p>
    </div>
  );
};

const WhyUsSection = () => {
  return (
    <div className="py-[4rem] md:px-[4rem] px-[2rem] bg-blue-50">
      <h2 className="text-center text-4xl mb-[4rem]">
        Why <span className="text-blue-700">AuctionWave</span>?
      </h2>
      <div className="flex flex-col gap-[2rem] max-w-[54rem] w-full mx-auto">
        <WhyUsItem
          title="Exclusive Items"
          description="Discover one-of-a-kind items you won't find anywhere"
        />
        <WhyUsItem
          title="Exciting Bidding"
          description="Feel the adrenaline rush as you outbid others to claim your prize."
        />
        <WhyUsItem
          title="Secure Transactions"
          description="Your transactions are safe and protected."
        />
        <WhyUsItem
          title="Join the Community"
          description="Connect with fellow bidders and sellers who share your passion."
        />
      </div>
    </div>
  );
};

export default WhyUsSection;
