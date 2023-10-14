import Button from "@/components/Button";
import useModal from "@/components/Modal/useModal";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import AuctionItem from "./AuctionItem";
import FiltersModal from "./FiltersModal";
import useSearch from "./useSearch";

const Auctions = () => {
  const filtersModal = useModal();

  const search = useSearch();

  return (
    <div className="flex flex-col gap-[2rem]">
      <h1 className="text-4xl">Auctions</h1>
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
          // loading
          value={search.form.values.search}
          onChange={search.form.handleChange("search")}
          onBlur={search.form.handleBlur("search")}
          onSubmit={search.form.handleSubmit}
        />
      </div>
      <div className="flex flex-row gap-[2rem] w-full flex-wrap">
        {new Array(12).fill(0).map((_, idx) => (
          <AuctionItem key={idx} />
        ))}
      </div>
      <Pagination />
      <FiltersModal shown={filtersModal.shown} hide={filtersModal.hide} />
    </div>
  );
};

export default Auctions;
