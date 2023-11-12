import React from "react";
import CategoryItem from "./CategoryItem";
import useAllCategories from "./useAllCategories";
import usePagination from "@/components/Pagination/usePagination";
import Pagination from "@/components/Pagination";
import useCategoriesSearch from "./useCategoriesSearch";
import SearchInput from "@/components/SearchInput";
import NoResultsIllustraionSrc from "@/assets/images/no-results-illustration.svg";

const Categories = () => {
  const categories = useAllCategories();
  const search = useCategoriesSearch();

  const noResults =
    !categories.categories.requestStatus.loading &&
    !categories.categories.requestStatus.data?.results?.length;

  const pagination = usePagination({ count: categories.count });

  return (
    <div className="flex flex-col gap-[2rem] min-h-full w-full max-w-[72rem]">
      <div className="flex flex-col flex-1 gap-[2rem]">
        <h1 className="sm:text-4xl text-3xl">Categories</h1>
        <div className="max-w-[48rem] flex flex-col-reverse md:flex-row gap-[0.5rem]">
          <SearchInput
            id="search"
            name="search"
            placeholder="Search by title"
            label="Search"
            loading={categories.categories.requestStatus.loading}
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
            {categories.categories.requestStatus?.loading
              ? [...new Array(12)].map((_, idx) => {
                  return (
                    <div
                      className="h-[12rem] xl:w-[calc((100%/3)-2rem*((3-1)/3))] lg:w-[calc((100%/2)-2rem*((2-1)/2))] w-[calc((100%/1)-2rem*((1-1)/3))] shadow-md rounded-md animate-pulse bg-neutral-200 flex flex-row items-end justify-end p-[1rem]"
                      key={idx}
                    >
                      <div className="p-[1rem] w-[8rem] bg-neutral-300 rounded-md" />
                    </div>
                  );
                })
              : categories.categories.requestStatus?.data?.results.map(
                  (item) => {
                    return (
                      <CategoryItem
                        title={item.title}
                        image={item.image}
                        categoryId={item.id}
                        key={item.id}
                      />
                    );
                  }
                )}
          </div>
        )}
      </div>
      <Pagination {...pagination} />
    </div>
  );
};

export default Categories;
