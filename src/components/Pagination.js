import React from 'react';

function Pagination({ totalJobs, page, perPage, setPage, setPerPage }) {
  const totalPages = Math.ceil(totalJobs / perPage);

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="flex flex-wrap justify-center items-center py-4 bg-white shadow-md rounded-lg mt-4">
      <button
        className="px-3 py-1 mx-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200 disabled:opacity-50"
        onClick={handlePrevious}
        disabled={page <= 1}
      >
        Previous
      </button>
      <span className="mx-3 text-lg font-semibold">
        {page} / {totalPages}
      </span>
      <button
        className="px-3 py-1 mx-2 bg-gray-200 rounded-full hover:bg-gray-300 transition duration-200 disabled:opacity-50"
        onClick={handleNext}
        disabled={page >= totalPages}
      >
        Next
      </button>
      <div className="ml-4 flex items-center">
        <span className="mr-2">Show</span>
        <select
          value={perPage}
          onChange={(e) => setPerPage(Number(e.target.value))}
          className="border border-gray-300 rounded-full py-1 px-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
}

export default Pagination;
