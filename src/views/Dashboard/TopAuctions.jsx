import AuctionsScrolView from "@/components/AuctionsScrollView";
import Button from "@/components/Button";
import { ArrowRightIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const TopAuctions = ({ auctions = [], loading = false }) => {
  const navigate = useNavigate();
  return (
    <div>
      <AuctionsScrolView
        auctions={auctions}
        emptyText="No auctions to show from you"
        loading={loading}
        title="Your auctions ending soon"
        btn={
          <Button
            text="See all"
            rightIcon={<ArrowRightIcon width={16} />}
            leftIcon={<EyeIcon width={16} />}
            onClick={() => {
              navigate(`/app/auctions/my?status=ongoing`);
            }}
            variant="secondary"
          />
        }
      />
    </div>
  );
};

export default TopAuctions;
