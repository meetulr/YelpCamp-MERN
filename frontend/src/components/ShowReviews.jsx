import ReviewItem from "./ReviewItem";

function ShowReviews({reviews}) {
  return (
    <div className="card bg-slate-300">
      <div className="m-3">
        <h2 className="block mb-2 font-bold text-gray-900 text-2xl text-center">All Reviews</h2>

        <div className="flex flex-col chat chat-start md:h-40 md:overflow-scroll">
          {reviews.map((reviewItem) => (
            <ReviewItem key={reviewItem._id} reviewItem={reviewItem} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShowReviews