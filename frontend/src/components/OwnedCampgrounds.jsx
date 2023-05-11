import OwnedCamp from "./OwnedCamp";

function OwnedCampgrounds({ ownedCampgrounds, handleDelete }) {
  // console.log(ownedCampgrounds.length);

  return (
    <div className="mt-5 space-y-5 mb-5">
      {ownedCampgrounds.map((ownedCamp) => (
        <OwnedCamp
          key={ownedCamp._id}
          ownedCamp={ownedCamp}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  )
}

export default OwnedCampgrounds