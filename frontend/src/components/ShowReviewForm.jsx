
function ShowReviewForm({rating, body, handleChange, handleSubmit}) {
  return (
    <form onSubmit={handleSubmit} className="mb-10">
      <h2 className="block mb-2 font-bold text-gray-900 text-2xl md:-mt-3">Leave a review</h2>
      <div>
        <label className="block mb-2 font-bold text-gray-500" htmlfor="rating">Rating</label>
        <input className="range w-full h-6 bg-gray-400 rounded-full appearance-none cursor-pointer"
          type="range"
          id="rating"
          name="rating"
          min="1"
          max="5"
          step="1"
          value={rating}
          onChange={handleChange}
        />
        <div className="flex justify-between text-xs px-2">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
        </div>
      </div>

      <label className="block mb-0 font-bold text-gray-500" htmlfor="review">Review</label>
      <textarea className="w-full px-3 py-2 mt-2 mb-4 text-gray-700 bg-gray-300 rounded-md"
        id="body"
        name="body"
        rows="2"
        placeholder="Enter your review"
        value={body}
        onChange={handleChange}
      ></textarea>

      <button className="btn btn-sm bg-green-700 hover:bg-green-800 w-full">Submit Review</button>
    </form>
  )
}

export default ShowReviewForm