
function Pagination({ currPage, campsPerPage, totalCamps, paginate }) {

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCamps / campsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-10 -my-5 text-center">
      <div className="btn-group">
        {pageNumbers.map((number) => (
          <button
            className={`btn ${currPage === number ? "btn-active" : ""}`}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Pagination;