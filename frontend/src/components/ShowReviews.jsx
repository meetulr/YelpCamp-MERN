import ReviewItem from "./ReviewItem";

function ShowReviews({ reviews, handleReviewDelete }) {
  return (
    <div className="card bg-slate-300 w-96 mx-auto md:w-3/5 lg:w-1/2 mb-10">
      {reviews.length ? (
        <div className="m-3">
          <h2 className="block mb-2 font-bold text-gray-900 text-2xl text-center">All Reviews</h2>

          <div className="flex flex-col chat chat-start max-h-screen overflow-scroll">
            {reviews.map((reviewItem) => (
              <ReviewItem
                key={reviewItem._id}
                reviewItem={reviewItem}
                handleReviewDelete={handleReviewDelete}
              />
            ))}
          </div>
        </div>
      ) : (
        <h2 className="block m-3 font-bold text-gray-900 text-2xl text-center">No Reviews</h2>
      )}
    </div>
  )
}

export default ShowReviews