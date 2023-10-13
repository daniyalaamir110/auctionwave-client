import Button from "@/components/Button";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import useQuery from "@/hooks/useQuery";
import {
  AdjustmentsHorizontalIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import AuctionItem from "./AuctionItem";
import Modal from "@/components/Modal";
import useModal from "@/components/Modal/useModal";
import TextInput from "@/components/TextInput";

const Auctions = () => {
  const query = useQuery();
  const filtersModal = useModal();

  let activeCategoryId = query.get("category");
  if (activeCategoryId !== null) {
    activeCategoryId = +activeCategoryId;
  }

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
          value=""
          onChange={() => {}}
          onBlur={() => {}}
        />
      </div>
      <div className="flex flex-row gap-[2rem] w-full flex-wrap">
        {new Array(12).fill(0).map(() => (
          <AuctionItem />
        ))}
      </div>
      <Pagination />
      <Modal shown={filtersModal.shown} hide={filtersModal.hide}>
        <div className="flex flex-col gap-[1rem]">
          <div className="flex flex-row justify-between items-center">
            <h3 className="text-md text-blue-700">Category Filter</h3>
            <div className="text-xs">(None)</div>
          </div>
          <TextInput
            label="Search category"
            placeholder="Enter category name"
          />
          <div className="flex flex-row gap-[0.5rem] flex-wrap">
            {[
              "Car",
              "Mobile",
              "TV",
              "Furniture",
              "Art",
              "PCs/Laptops",
              "Cutlery",
              "Kitchenware",
              "Phones",
              "Gadgets",
            ].map((c, idx) => (
              <button
                key={idx}
                className={`px-[0.5rem] py-[0.25rem] rounded-lg transition-all ${
                  idx === 0
                    ? "bg-blue-700 text-white"
                    : "bg-blue-100 text-blue-900 hover:bg-blue-200 active:bg-blue-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex flex-row justify-between items-center">
            <h3 className="text-md text-blue-700">Price Filter</h3>
          </div>
          <div className="flex flex-row gap-[1rem]">
            <TextInput label="Minimum price" isNumber />
            <TextInput label="Maximum price" isNumber />
          </div>
          <Button text="Apply" leftIcon={<CheckIcon width={16} />} />
        </div>
      </Modal>
    </div>
  );
};

export default Auctions;
