import { useState } from "react";

function Carousel({ images }) {
  const [currentImage, setCurrentImage] = useState(0);

  const previousImage = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    setCurrentImage((currentImage + 1) % images.length);
  };

  return (
    <div className="carousel relative w-full rounded-t-2xl">
      {images.map((image, index) => (
        <div
          key={index}
          className={`carousel-item absolute w-full h-full max-h-72 transition-opacity duration-500 overflow-hidden ${
            index === currentImage ? "relative opacity-100" : "opacity-0"
          }`}
        >
          <img src={image.url} className="w-full" alt={`Slide ${index}`} />
        </div>
      ))}
      <a className="btn btn-circle absolute w-10 text-white text-center top-1/2 left-1" onClick={previousImage}>
        ❮
      </a>
      <a className="btn btn-circle absolute w-10 text-white text-center top-1/2 right-1" onClick={nextImage}>
        ❯
      </a>
    </div>
  );
}

export default Carousel;
