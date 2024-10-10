import React from "react";

const Pagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handlePrevPage = () => {
    if (currentPage > 1) onPageChane(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) onPageChane(currentPage + 1);
  };
  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        -
      </button>
      <span>
        Page {currentPage}/{Number(totalPages)}
      </span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        +
      </button>
    </div>
  );
};
