import Button from "@/components/Button";
import LoadingItems from "@/components/LoadingItems";
import { default as Modal } from "@/components/Modal";
import SearchInput from "@/components/SearchInput";
import TextInput from "@/components/TextInput";
import useSearchCategories from "@/hooks/useSearchCategories";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

const FiltersModal = ({ shown = false, hide = () => {}, filters }) => {
  const searchCategories = useSearchCategories(true);

  return (
    <Modal shown={shown} hide={hide} title="Apply Filters">
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
            loading={searchCategories.status.loading}
            onChange={searchCategories.handleChange}
            onSubmit={searchCategories.handleSubmit}
          />
          {searchCategories.status.loading ? (
            <LoadingItems text="Loading categories" />
          ) : searchCategories.status.error ? (
            <p className="text-xs">{searchCategories.status.error}</p>
          ) : (
            <div className="flex flex-row gap-[0.5rem] items-center flex-wrap">
              {searchCategories.status.data?.results?.map?.((categoryObj) => {
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
              })}
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
