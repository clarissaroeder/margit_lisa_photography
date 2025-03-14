import Image from "next/image";

import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
  Slide,
} from "yet-another-react-lightbox";

interface LightboxImageProps {
  slide: Slide;
  offset: number;
  rect: Rect;
}

interface Rect {
  width: number;
  height: number;
}

// Type guard to ensure 'slide' is of type 'Slide' with necessary properties
const isNextJsImage = (slide: Slide): slide is Slide & { width: number; height: number } => {
  return (
    isImageSlide(slide) &&
    typeof slide.width === "number" &&
    typeof slide.height === "number"
  );
};

const LightboxImage: React.FC<LightboxImageProps> = ({ slide, offset, rect }) => {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();

  // Determine if the image should cover the container
  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  // If the slide is not a valid Next.js Image, return null
  if (!isNextJsImage(slide)) return null;

  // Calculate width and height based on cover status
  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / slide.height) * slide.width)
      )
    : rect.width;

  const height = !cover
    ? Math.round(
        Math.min(rect.height, (rect.width / slide.width) * slide.height)
      )
    : rect.height;

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        fill
        alt={slide.alt || "Lightbox Image"}
        src={slide.src}
        loading="eager"
        draggable={false}
        // Uncomment and provide a blurDataURL if available
        // placeholder={slide.blurDataURL ? "blur-sm" : undefined}
        style={{
          objectFit: cover ? "cover" : "contain",
          cursor: click ? "zoom-in" : "default", // Changed cursor to indicate zoom
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0 && click
            ? () => click({ index: currentIndex })
            : undefined
        }
      />
    </div>
  );
};

export default LightboxImage;
