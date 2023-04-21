
function Edit() {
  return (
    <div className="mt-24 mb-10">
      <form className="p-6 max-w-sm md:max-w-xl lg:max-w-2xl mx-auto bg-white rounded-md shadow-md">
        <div className="mb-6">
          <label className="block mb-2 font-bold text-gray-700" for="name">Title</label>
          <input className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400" type="text" id="name" name="name" placeholder="eg. Petrified Pond" />
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-bold text-gray-700" for="email">Location</label>
          <input className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400" type="email" id="email" name="email" placeholder="eg. Scottsdale, Arizona" />
        </div>
        <div className="mb-6">
          <label for="price" className="block mb-2 font-bold text-gray-700">Campground Price</label>
          <div className="relative flex items-stretch w-full">
            <span className="flex items-center justify-center w-10 h-10 text-gray-100 bg-zinc-600 rounded-l">
              $
            </span>
            <input type="text" id="price" className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-r-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400" placeholder="0.00" aria-label="price" required />
          </div>
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-bold text-gray-700" for="message">Description</label>
          <textarea className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-400" id="message" name="message" rows="4" placeholder="Describe your camp in concise words"></textarea>
        </div>
        <div class="mb-6">
          <label for="image" className="block mb-2 font-bold text-gray-700">Choose Images</label>
          <input type="file" className="file-input file-input-md w-full  text-gray-700 bg-gray-200" multiple />
        </div>

        <div className="flex justify-end">
          <button className="px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400" type="submit">Submit</button>
        </div>
      </form >
    </div >
  )
}

export default Edit