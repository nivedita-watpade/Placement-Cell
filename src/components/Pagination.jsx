function Pagination({ totalItems, jobsPerPage, currentPage, setCurrentPage }) {
  const totalPages = Math.ceil(totalItems / jobsPerPage);

  const pages = Array.from({ length: totalPages });

  return (
    <div className="mt-6 flex gap-9 align-middle justify-center ">
      <button
        className="text-[#193cb8] cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed"
        onClick={() => setCurrentPage((page) => page - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {pages.map((_, i) => (
        <button
          className={`w-6 h-6 rounded-sm flex items-center justify-center text-sm cursor-pointer ${
            i + 1 === currentPage
              ? "bg-[#193cb8] text-white"
              : "text-[#193cb8] bg-white"
          }`}
          key={i}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}

      <button
        className="text-[#193cb8] cursor-pointer disabled:text-gray-400 disabled:cursor-not-allowed"
        onClick={() => setCurrentPage((page) => page + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
