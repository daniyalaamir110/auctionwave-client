import Button from "@/components/Button";
import useModal from "@/components/Modal/useModal";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import AuctionItem from "./AuctionItem";
import AuctionItemLoading from "./AuctionItemLoading";
import FiltersModal from "./FiltersModal";
import useAvailableAuctions from "./useAvailableAuctions";
import useSearch from "./useSearch";
import NoResultsIllustraionSrc from "@/assets/images/no-results-illustration.svg";
import usePagination from "@/components/Pagination/usePagination";

const Auctions = () => {
  const filtersModal = useModal();
  const search = useSearch();
  const { auctions } = useAvailableAuctions();
  const noResults =
    !auctions.requestStatus.loading &&
    !auctions.requestStatus.data?.results?.length;
  const count = auctions.requestStatus.data?.count || 0;
  const pagination = usePagination({ count, pageSize: 10 });

  return (
    <div className="flex flex-col gap-[2rem] min-h-full max-w-[72rem]">
      <div className="flex flex-col gap-[2rem] flex-1">
        <h1 className="sm:text-4xl text-3xl">Auctions</h1>
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
          <div className="flex flex-row gap-[2rem] w-full flex-wrap">
            {auctions.requestStatus.loading
              ? [...Array(3)].map((_, idx) => <AuctionItemLoading key={idx} />)
              : auctions.requestStatus.data?.results?.map?.((auction, idx) => (
                  <AuctionItem key={idx} auction={auction} />
                ))}
          </div>
        )}
      </div>
      {!noResults && <Pagination {...pagination} />}
      <FiltersModal shown={filtersModal.shown} hide={filtersModal.hide} />
    </div>
  );
};

export default Auctions;
