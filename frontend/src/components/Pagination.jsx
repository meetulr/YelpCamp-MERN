
function Pagination({ currPage, campsPerPage, totalCamps, paginate }) {

  // const pageNumbers = [];

  // for (let i = 1; i <= Math.ceil(totalCamps / campsPerPage); i++) {
  //   pageNumbers.push(i);
  // }

  const totalPages = Math.ceil(totalCamps / campsPerPage);

  return (
    <div className="mt-10 -my-5 text-center">
      <div className="btn-group">
        <button className={`btn ${currPage === 1 ? "btn-disabled bg-stone-500" : ""}`} onClick={() => paginate(currPage-1)}>«</button>
        <button className="btn">{`Page ${currPage}`}</button>
        <button className={`btn ${currPage === totalPages ? "btn-disabled bg-stone-500" : ""}`} onClick={() => paginate(currPage+1)}>»</button>
      </div>
    </div>
  )
}

export default Pagination;