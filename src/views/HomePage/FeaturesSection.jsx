import {
  ArrowDownOnSquareIcon,
  ClipboardDocumentCheckIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const FeatureItem = ({ title, description, icon }) => {
  return (
    <div className="flex-1 flex flex-col gap-[2rem] items-center text-blue-700 mb-[2rem]">
      {icon}
      <h3 className="text-2xl text-center">{title}</h3>
      <p className="text-center text-lg text-neutral-600">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <div className="p-[4rem]">
      <h2 className="text-center text-4xl mb-[4rem]">How It Works</h2>
      <div className="flex lg:flex-row flex-col gap-[2rem] justify-evenly">
        <FeatureItem
          title="Browse Auctions"
          description="Explore a diverse range of categories, from electronics to antiques. Find the perfect item that catches your eye."
          icon={<MagnifyingGlassIcon width={64} />}
        />
        <FeatureItem
          title="Place Your Bids"
          description="Join the auction by placing your bids on your favorite products. The race to victory begins!"
          icon={<ArrowDownOnSquareIcon width={64} />}
        />
        <FeatureItem
          title="Win and Enjoy"
          description="If you're the highest bidder when the timer runs out, the item is yours to enjoy."
          icon={<ClipboardDocumentCheckIcon width={64} />}
        />
      </div>
    </div>
  );
};

export default FeaturesSection;
