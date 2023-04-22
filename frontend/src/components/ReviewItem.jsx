
function ReviewItem({ reviewItem }) {
  const stars = reviewItem.rating;

  return (
    <div className=" bg-slate-400 rounded-lg mb-3 w-full">
      <div className="flex flex-col my-2 mx-3">
        <div className="flex mb-3">
          {Array(5).fill().map((_, index) => (
            <svg
              key={index}
              aria-hidden="true"
              className={`w-5 h-5 ${
                index < stars ? "text-yellow-600" : "text-gray-300 dark:text-gray-500"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>{`${index + 1}${index === 0 ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th"} star`}</title>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        <div className="chat chat-start">
          <div className="chat-bubble">{reviewItem.body}</div>
        </div>
      </div>
    </div>
  )
}

export default ReviewItem;
