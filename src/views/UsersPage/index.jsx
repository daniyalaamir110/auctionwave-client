import React from "react";
import useSearch from "./useSearch";
import useUsers from "./useUsers";
import usePagination from "@/components/Pagination/usePagination";
import NoResultsIllustraionSrc from "@/assets/images/no-results-illustration.svg";
import UserItem, { UserItemLoading } from "@/components/UserItem";
import Pagination from "@/components/Pagination";
import SearchInput from "@/components/SearchInput";
import { useNavigate } from "react-router-dom";

const UserWrapper = ({ children, id = null, loading = false }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`xl:w-[calc((100%/3)-2rem*((3-1)/3))] lg:w-[calc((100%/2)-2rem*((2-1)/2))] shadow-md rounded-md p-[1rem] bg-gradient-to-br from-white to-blue-50 transition-all ${
        loading ? "animate-pulse" : "hover:to-blue-100 cursor-pointer"
      }`}
      onClick={() => {
        if (id !== null) {
          navigate(`${id}`);
        }
      }}
    >
      {children}
    </div>
  );
};

const UsersPage = () => {
  const search = useSearch();
  const users = useUsers();
  const count = users.status.data?.count || 0;
  const pagination = usePagination({ count, pageSize: 12 });

  return (
    <div className="flex flex-col gap-[2rem] min-h-full max-w-[72rem]">
      <div className="flex sm:flex-row flex-col sm:items-center justify-between gap-[1.5rem]">
        <h1 className="sm:text-4xl text-3xl">Find Users</h1>
      </div>
      <div className="max-w-[48rem] flex flex-col-reverse md:flex-row gap-[0.5rem]">
        <SearchInput
          id="search"
          name="search"
          placeholder="Search by name"
          label="Search"
          loading={users.status.loading}
          value={search.form.values.search}
          onChange={search.form.handleChange("search")}
          onBlur={search.form.handleBlur("search")}
          onSubmit={search.form.handleSubmit}
        />
      </div>
      <div className="flex-1">
        {users.noResults ? (
          <div className="flex-1 flex flex-row items-center justify-center">
            <img
              src={NoResultsIllustraionSrc}
              alt="No results"
              className="w-full max-w-[32rem]"
            />
          </div>
        ) : (
          <div className="flex flex-row gap-[2rem] w-full flex-wrap">
            {users.status.loading
              ? [...Array(15)].map((_, idx) => (
                  <UserWrapper key={idx} loading>
                    <UserItemLoading />
                  </UserWrapper>
                ))
              : users.status.data?.results?.map?.((user) => (
                  <UserWrapper key={user.id} id={user.id}>
                    <UserItem user={user} />
                  </UserWrapper>
                ))}
          </div>
        )}
      </div>
      {!users.noResults && <Pagination {...pagination} />}
    </div>
  );
};

export default UsersPage;
