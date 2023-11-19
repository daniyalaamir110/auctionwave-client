import NoResultsIllustraionSrc from "@/assets/images/no-results-illustration.svg";
import Button from "@/components/Button";
import useModal from "@/components/Modal/useModal";
import Pagination from "@/components/Pagination";
import usePagination from "@/components/Pagination/usePagination";
import SearchInput from "@/components/SearchInput";
import Tab from "@/components/Tab";
import useTab from "@/components/Tab/useTab";
import {
  AdjustmentsHorizontalIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import FiltersModal from "./FiltersModal";
import MyAuctionItem from "./MyAuctionItem";
import MyAuctionItemLoading from "./MyAuctionItemLoading";
import useTabConfig from "./tabConfig";
import useFilters from "./useFilters";
import useMyAuctions from "./useMyAuctions";
import useSearch from "./useSearch";

const MyAuctions = () => {
  const tabConfig = useTabConfig();
  const tab = useTab(tabConfig);
  const filters = useFilters();
  const filtersModal = useModal();
  const search = useSearch();
  const navigate = useNavigate();
  const auctions = useMyAuctions();
  const count = auctions.status.data?.count || 0;
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
        <div className="flex flex-row gap-[0.25rem] shrink-0">
          <Button
            variant="secondary"
            text="Apply Filters"
            leftIcon={<AdjustmentsHorizontalIcon width={16} />}
            onClick={filtersModal.show}
            badgeCount={filters.filterCount}
          />
          {filters.filterCount > 0 && (
            <Button
              leftIcon={<XMarkIcon width={16} onClick={filters.clearFilters} />}
            />
          )}
        </div>
        <SearchInput
          id="search"
          name="search"
          placeholder="Search by title"
          label="Search"
          loading={auctions.status.loading}
          value={search.form.values.search}
          onChange={search.form.handleChange("search")}
          onBlur={search.form.handleBlur("search")}
          onSubmit={search.form.handleSubmit}
        />
      </div>
      {auctions.noResults ? (
        <div className="flex-1 flex flex-row items-center justify-center">
          <img
            src={NoResultsIllustraionSrc}
            alt="No results"
            className="w-full max-w-[32rem]"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-[1rem] flex-1">
          {auctions.status.loading
            ? [...Array(3)].map((_, idx) => <MyAuctionItemLoading key={idx} />)
            : auctions.status.data?.results?.map?.((auction) => (
                <MyAuctionItem
                  type={auction.status}
                  key={auction.id}
                  auction={auction}
                />
              ))}
        </div>
      )}
      {!auctions.noResults && <Pagination {...pagination} />}
      <FiltersModal
        shown={filtersModal.shown}
        hide={filtersModal.hide}
        filters={filters}
      />
    </div>
  );
};

export default MyAuctions;
