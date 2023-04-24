
function DeleteImages({ toDeleteImages, handleDeleteImages }) {
  return (
    <div>
      <h2 className="block mb-2 font-bold text-gray-700">Click image to delete</h2>
      <div className="mb-6 bg-slate-400 rounded-xl">
        <div className="p-3 flex flex-wrap space-x-4 space-y-4">
          {toDeleteImages.map((image) => {
            const currUrl = image.url.replace('/upload', '/upload/w_110');
            return <img src={currUrl} onClick={() => handleDeleteImages(image)}/>
          })}
        </div>
      </div>
    </div>
  )
}

export default DeleteImages