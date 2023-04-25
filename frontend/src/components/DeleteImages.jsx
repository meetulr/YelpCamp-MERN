
function DeleteImages({ toDeleteImages, handleDeleteImages }) {
  return (
    <div>
      <h2 className="block mb-2 font-bold text-gray-700">Click image to delete</h2>
      <div className="mb-6 bg-slate-400 rounded-xl">
        <div className="flex flex-wrap">
          {toDeleteImages.map((image) => {
            const currUrl = image.url.replace('/upload', '/upload/w_112');
            return <img src={currUrl} className="m-3 max-h-24 overflow-hidden rounded-md" onClick={() => handleDeleteImages(image)} alt="remove"/>
          })}
        </div>
      </div>
    </div>
  )
}

export default DeleteImages