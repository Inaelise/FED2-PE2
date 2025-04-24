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
      <span>{meta.currentPage}</span>
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={meta.isLastPage}
      >
        Next
      </button>
    </div>
  );
}
