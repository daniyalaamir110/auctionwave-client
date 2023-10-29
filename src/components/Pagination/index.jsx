import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/24/outline";

const PaginationButton = ({ children, active = false, onClick = () => {} }) => {
  return (
    <button
      className={`text-sm transition-all min-w-[1.75rem] h-[1.75rem] rounded-md flex flex-row items-center justify-center ${
        active
          ? "text-white bg-blue-700"
          : "text-black hover:text-blue-700 hover:bg-blue-100 active:bg-blue-200"
      }`}
      disabled={active}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Pagination = ({
  numberOfButtons,
  shouldShowLast,
  shouldShowFirst,
  shouldShowNext,
  shouldShowPrevious,
  firstPage,
  pageCount,
  currentPage,
  setPage,
  next,
  previous,
  first,
  last,
}) => {
  return (
    <div className="flex flex-row gap-[0.25rem] items-center justify-center">
      {shouldShowFirst && (
        <>
          <PaginationButton onClick={first}>1</PaginationButton>
          <EllipsisHorizontalIcon width={16} />
        </>
      )}
      {shouldShowPrevious && (
        <PaginationButton onClick={previous}>
          <ChevronLeftIcon width={16} />
        </PaginationButton>
      )}
      {[...Array(numberOfButtons)].map((_, idx) => {
        const pageNumber = firstPage + idx;
        return (
          <PaginationButton
            onClick={() => setPage(pageNumber)}
            key={idx}
            active={pageNumber === currentPage}
          >
            {pageNumber}
          </PaginationButton>
        );
      })}
      {shouldShowNext && (
        <PaginationButton onClick={next}>
          <ChevronRightIcon width={16} />
        </PaginationButton>
      )}
      {shouldShowLast && (
        <>
          <EllipsisHorizontalIcon width={16} />
          <PaginationButton onClick={last}>{pageCount}</PaginationButton>
        </>
      )}
    </div>
  );
};

export default Pagination;
