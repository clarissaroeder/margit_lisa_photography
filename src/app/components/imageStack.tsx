

/**
 * Renders a mobile-friendly stack view of images
 */
const ImageStack = ({ images, onClick }) => {
  return (
    <div className="flex flex-col gap-4">
      {images.map((image, index) => (
        <div 
          key={image.src} 
          className="relative w-full cursor-pointer"
          onClick={() => onClick(index)}
        >
          <div style={{ aspectRatio: `${image.width} / ${image.height}` }} className="w-full">
            <CldImage
              src={image.src}
              alt={image.alt || ""}
              title={image.title || ""}
              fill
              quality="auto"
              format="auto"
              loading="lazy"
              sizes="100vw"
              className="rounded-md"
            />
          </div>
          {image.title && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 rounded-b-md">
              {image.title}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageStack;