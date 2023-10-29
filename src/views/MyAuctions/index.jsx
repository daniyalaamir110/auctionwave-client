import Button from "@/components/Button";
import Tab from "@/components/Tab";
import useTab from "@/components/Tab/useTab";
import {
  AdjustmentsHorizontalIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import MyAuctionItem from "./MyAuctionItem";
import useTabConfig from "./tabConfig";
import useMyAuctions from "./useMyAuctions";
import usePagination from "@/components/Pagination/usePagination";
import Pagination from "@/components/Pagination";
import useModal from "@/components/Modal/useModal";
import useSearch from "./useSearch";
import SearchInput from "@/components/SearchInput";
import FiltersModal from "./FiltersModal";
import MyAuctionItemLoading from "./MyAuctionItemLoading";
import NoResultsIllustraionSrc from "@/assets/images/no-results-illustration.svg";

const MyAuctions = () => {
  const tabConfig = useTabConfig();
  const tab = useTab(tabConfig);
  const filtersModal = useModal();
  const search = useSearch();
  const navigate = useNavigate();
  const { auctions } = useMyAuctions();
  const noResults =
    !auctions.requestStatus.loading &&
    !auctions.requestStatus.data?.results?.length;
  const count = auctions.requestStatus.data?.count || 0;
  const pagination = usePagination({ count, pageSize: 10 });

  return (
    <div className="flex flex-col gap-[2rem] min-h-full max-w-[72rem]">
      <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-[1.5rem]">
        <h1 className="sm:text-4xl text-3xl">Your Auctions</h1>
        <Button
          text="Start Auction"
          leftIcon={<PlusIcon width={16} />}
          onClick={() => navigate("/app/auctions/create")}
        />
      </div>
      <Tab
        getTabClickHandler={tab.getTabClickHandler}
        items={tab.items}
        selectedTabIdx={tab.selectedTabIdx}
      />
      <div className="max-w-[48rem] flex flex-col-reverse md:flex-row gap-[0.5rem]">
        <Button
          variant="secondary"
          text="Apply Filters"
          leftIcon={<AdjustmentsHorizontalIcon width={16} />}
          onClick={filtersModal.show}
        />
        <SearchInput
          id="search"
          name="search"
          placeholder="Search by title"
          label="Search"
          loading={auctions.requestStatus.loading}
          value={search.form.values.search}
          onChange={search.form.handleChange("search")}
          onBlur={search.form.handleBlur("search")}
          onSubmit={search.form.handleSubmit}
        />
      </div>
      {noResults ? (
        <div className="flex-1 flex flex-row items-center justify-center">
          <img
            src={NoResultsIllustraionSrc}
            alt="No results"
            className="w-full max-w-[32rem]"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-[1rem] flex-1">
          {auctions.requestStatus.loading
            ? [...Array(3)].map((_, idx) => <MyAuctionItemLoading key={idx} />)
            : auctions.requestStatus.data?.results?.map?.((auction, idx) => (
                <MyAuctionItem key={idx} auction={auction} />
              ))}
        </div>
      )}
      {!noResults && <Pagination {...pagination} />}
      <FiltersModal shown={filtersModal.shown} hide={filtersModal.hide} />
    </div>
  );
};

export default MyAuctions;
