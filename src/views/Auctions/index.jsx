import Button from "@/components/Button";
import useModal from "@/components/Modal/useModal";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import AuctionItem from "@/components/AuctionItem";
import AuctionItemLoading from "@/components/AuctionItem/AuctionItemLoading";
import FiltersModal from "./FiltersModal";
import useAvailableAuctions from "./useAvailableAuctions";
import useSearch from "./useSearch";
import NoResultsIllustraionSrc from "@/assets/images/no-results-illustration.svg";
import usePagination from "@/components/Pagination/usePagination";
import useFilters from "./useFilters";

const Auctions = () => {
  const filters = useFilters();
  const filtersModal = useModal();
  const search = useSearch();
  const auctions = useAvailableAuctions();
  const count = auctions.status.data?.count || 0;
  const pagination = usePagination({ count, pageSize: 12 });

  return (
    <div className="flex flex-col gap-[2rem] min-h-full max-w-[72rem]">
      <div className="flex flex-col gap-[2rem] flex-1">
        <h1 className="sm:text-4xl text-3xl">Auctions</h1>
        <div className="max-w-[48rem] flex flex-col-reverse md:flex-row gap-[0.5rem]">
          <div className="flex flex-row gap-[0.25rem] shrink-0">
            <Button
              variant="secondary"
              leftIcon={<AdjustmentsHorizontalIcon width={16} />}
              onClick={filtersModal.show}
              badgeCount={filters.filterCount}
            />
            {filters.filterCount > 0 && (
              <Button
                onClick={filters.clearFilters}
                leftIcon={<XMarkIcon width={16} />}
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
          <div className="flex flex-row gap-[2rem] w-full flex-wrap">
            {auctions.status.loading
              ? [...Array(3)].map((_, idx) => <AuctionItemLoading key={idx} />)
              : auctions.status.data?.results?.map?.((auction) => (
                  <AuctionItem key={auction.id} auction={auction} />
                ))}
          </div>
        )}
      </div>
      {!auctions.noResults && <Pagination {...pagination} />}
      <FiltersModal
        shown={filtersModal.shown}
        hide={filtersModal.hide}
        filters={filters}
      />
    </div>
  );
};

export default Auctions;
