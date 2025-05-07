/**
 * Pagination component that provides controls for navigating between pages.
 * It displays the current page, total pages, and buttons to go to the previous or next page.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} meta - Metadata for pagination (e.g., total pages, current page).
 * @param {number} meta.currentPage - Current page number for pagination.
 * @param {number} meta.pageCount - Total number of pages available.
 * @param {boolean} meta.isFirstPage - Indicates if the current page is the first page.
 * @param {boolean} meta.isLastPage - Indicates if the current page is the last page.
 * @param {number} currentPage - Current page number.
 * @param {Function} setCurrentPage - Function to update the current page number.
 * @returns {JSX.Element} - The rendered component.
 */
export default function Pagination({ meta, currentPage, setCurrentPage }) {
  if (!meta) return null;

  const goToPage = (page) => {
    if (page >= 1 && page <= meta.pageCount) {
      setCurrentPage(page);
    }
  };
  return (
    <div>
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={meta.isFirstPage}
      >
        Previous
      </button>
      <span>
        {meta.currentPage} of {meta.pageCount}
      </span>
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={meta.isLastPage}
      >
        Next
      </button>
    </div>
  );
}
