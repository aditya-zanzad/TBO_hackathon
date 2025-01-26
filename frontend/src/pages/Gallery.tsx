

const Gallery = () => {
  return (
    <div className="p-10 grid place-content-center">
      <h1 className="text-4xl font-semibold text-center font-Playfair tracking-wider mb-8">
        Stunning Travel Destinations
      </h1>

      <div className="mx-2 md:mx-10">
        <span className="bg-green-500 p-1 rounded-full font-bold font-Playfair">
          Collection of Memories
        </span>
        <div className="text-xl my-3 tracking-wider font-Playfair">
          Visit our collection of stunning travel destinations and create unforgettable memories.
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4  md:p-10 max-w-7xl">
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg transform transition-transform duration-300 hover:scale-105"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg transform transition-transform duration-300 hover:scale-105"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg transform transition-transform duration-300 hover:scale-105"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg transform transition-transform duration-300 hover:scale-105"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg transform transition-transform duration-300 hover:scale-105"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg transform transition-transform duration-300 hover:scale-105"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg transform transition-transform duration-300 hover:scale-105"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg transform transition-transform duration-300 hover:scale-105"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg transform transition-transform duration-300 hover:scale-105"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="grid gap-4">
          <div>
            <img
              className="h-auto max-w-full rounded-lg transform transition-transform duration-300 hover:scale-105"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg transform transition-transform duration-300 hover:scale-105"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg"
              alt=""
            />
          </div>
          <div>
            <img
              className="h-auto max-w-full rounded-lg transform transition-transform duration-300 hover:scale-105"
              src="https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
