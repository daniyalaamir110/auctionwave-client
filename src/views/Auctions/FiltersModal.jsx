import Button from "@/components/Button";
import { default as Modal } from "@/components/Modal";
import TextInput from "@/components/TextInput";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import useFilters from "./useFilters";
import useSearchCategories from "@/hooks/useSearchCategories";
import LoadingSpinner from "@/components/LoadingSpinner";
import SearchInput from "@/components/SearchInput";

const FiltersModal = ({ shown = false, hide = () => {} }) => {
  const filters = useFilters();
  const searchCategories = useSearchCategories({ fetchFirst: true });

  return (
    <Modal shown={shown} hide={hide}>
      <div className="flex flex-col gap-[1rem]">
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-md text-blue-700">Category Filter</h3>
          {!filters.form.values.category ? (
            <div className="text-xs">(None)</div>
          ) : (
            <button
              onClick={() => filters.form.setFieldValue("category", null)}
              className="flex flex-row gap-[0.5rem] px-[0.5rem] py-[0.25rem] items-center text-xs text-green-700 bg-green-100 hover:bg-green-200 transition-all rounded"
            >
              <XMarkIcon width={12} />
              <span>
                {filters.form.values.category?.title ||
                  filters.form.values.category}
              </span>
            </button>
          )}
        </div>
        <div className="flex flex-row gap-[0.5rem] flex-wrap">
          <SearchInput
            label="Search category"
            placeholder="Search category by name"
            value={searchCategories.value}
            id="searchCategories"
            name="searchCategories"
            loading={searchCategories.categories.requestStatus.loading}
            onChange={searchCategories.handleChange}
            onSubmit={searchCategories.handleSubmit}
          />
          {searchCategories.categories.requestStatus.loading ? (
            <div className="flex flex-row gap-[0.5rem] items-center text-blue-800">
              <p className="text-xs">Loading Categories</p>
              <LoadingSpinner />
            </div>
          ) : searchCategories.categories.requestStatus.error ? (
            <p className="text-xs">
              {searchCategories.categories.requestStatus.error}
            </p>
          ) : (
            <div className="flex flex-row gap-[0.5rem] items-center flex-wrap">
              {searchCategories.categories.requestStatus.data?.results?.map?.(
                (categoryObj) => {
                  const selected =
                    categoryObj.id === filters.form.values.category?.id;
                  return (
                    <button
                      key={categoryObj.id}
                      disabled={selected}
                      className={`px-[0.5rem] py-[0.25rem] rounded-lg transition-all ${
                        selected
                          ? "bg-blue-700 text-white"
                          : "bg-blue-100 text-blue-900 hover:bg-blue-200 active:bg-blue-300"
                      }`}
                      onClick={() =>
                        filters.form.setFieldValue("category", categoryObj)
                      }
                    >
                      {categoryObj.title}
                    </button>
                  );
                }
              )}
            </div>
          )}
        </div>
        <div className="flex flex-row justify-between items-center">
          <h3 className="text-md text-blue-700">Price Filter</h3>
        </div>
        <div className="flex flex-row gap-[1rem]">
          <TextInput
            label="Minimum price"
            isNumber
            id="minPrice"
            value={filters.form.values.minPrice}
            onChange={filters.form.handleChange("minPrice")}
            onBlur={filters.form.handleBlur("minPrice")}
            error={filters.form.errors.minPrice}
            touched={filters.form.touched.minPrice}
            name="minPrice"
            placeholder="Min price"
            required
          />
          <TextInput
            label="Maximum price"
            isNumber
            id="maxPrice"
            value={filters.form.values.maxPrice}
            onChange={filters.form.handleChange("maxPrice")}
            onBlur={filters.form.handleBlur("maxPrice")}
            error={filters.form.errors.maxPrice}
            touched={filters.form.touched.maxPrice}
            name="maxPrice"
            placeholder="Max price"
            required
          />
        </div>
        <Button
          text="Apply"
          onClick={() => filters.form.submitForm().finally(hide)}
          leftIcon={<CheckIcon width={16} />}
        />
      </div>
    </Modal>
  );
};

export default FiltersModal;
