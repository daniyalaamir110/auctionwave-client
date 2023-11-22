import useQuery from "@/hooks/useQuery";
import { useNavigate } from "react-router-dom";

const usePagination = ({
  count = 0,
  pageSize = 10,
  numberOfButtonsOneSide = 3,
}) => {
  const query = useQuery();
  const navigate = useNavigate();

  // Get the current page from query, which defaults to 1.
  const currentPage = parseInt(query.get("page") || 1);

  // Number of pages is count per page size.
  const pageCount = Math.ceil(count / pageSize);

  // Number of buttons in sequence is taken from odd number sequence.
  // However, it should not exceed the page count.
  const numberOfButtons = Math.min(2 * numberOfButtonsOneSide - 1, pageCount);

  // The largest maximum page number would be if we go rightmost
  // from the current page if it lies at the center.
  const lastPageMaximum = Math.max(currentPage, 3) + numberOfButtonsOneSide - 1;

  // Then find the extra buttons count by checking that by how much does this maximum
  // button count exceeds the page count.
  const numberOfExtraButtons = Math.max(lastPageMaximum - pageCount, 0);

  // The last page in button sequence is simply found by subtracting the maximum by the
  // extra button count.
  const lastPage = lastPageMaximum - numberOfExtraButtons;

  // Similarly, find the minimum first page by subtracting the current page by the count of
  // those on the left if it as the center.
  const firstPageMinimum =
    currentPage - numberOfButtonsOneSide + 1 - numberOfExtraButtons;

  // But the first page should not be less than 1.
  const firstPage = Math.max(firstPageMinimum, 1);

  // Flags to decide whether to show special buttons.
  const shouldShowLast = pageCount > lastPage;
  const shouldShowFirst = firstPage > 1;
  const shouldShowNext = currentPage < pageCount;
  const shouldShowPrevious = currentPage > 1;

  // Handlers
  const setPage = (page = 1) => navigate(page === 1 ? "" : `?page=${page}`);

  const first = () => setPage(1);

  const last = () => setPage(pageCount);

  const next = () => {
    if (currentPage < pageCount) {
      setPage(currentPage + 1);
    }
  };

  const previous = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  return {
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
  };
};

export default usePagination;
