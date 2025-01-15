"use client";

import { useState, useEffect } from 'react';

import { CldImage } from 'next-cloudinary';

import {
  RenderImageContext,
  RenderImageProps,
  RowsPhotoAlbum,
} from "react-photo-album";
import "react-photo-album/rows.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import LightboxImage from './lightboxImage';
import LoadingSpinner from './loadingSpinner';
import ErrorMessage from './errorMessage';

import { ImageData } from '@/types';

interface CollectionProps {
  collection: string;
}

/**
 * Renders a Next.js Image component within the photo album.
 *
 * @param {RenderImageProps} props - Properties for rendering the image.
 * @param {RenderImageContext} context - Contextual information about the image.
 * @returns A JSX element containing the Image component.
 */
const renderCldImage = (
  { alt = "", title }: RenderImageProps,
  { photo, width, height }: RenderImageContext,
) => (
  <div
    style={{
      width: "100%",
      position: "relative",
      aspectRatio: `${width} / ${height}`,
    }}
  >
    <CldImage
      src={photo.src}
      alt={alt}
      title={title}
      fill
      // height={height}
      // width={width}
      quality="auto"
      format="auto"
      loading="lazy"
    />
  </div>
);

/**
 * Collection Component
 *
 * Fetches and displays a collection of images in a responsive photo album.
 *
 * @param - Properties for the Collection component.
 * @returns A JSX element displaying the photo album or relevant states.
 */
const Collection: React.FC<CollectionProps> = ({ collection }) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`/api/portfolio/collections/${collection}`);
        const data = await response.json();

        if (response.ok) {
          setImages(data.images);
        } else {
          setError(data.error || 'Failed to load images.');
        }
      } catch (error) {
        console.error('Error fetching images:', error); // Debugging
        setError('An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [collection]);

  if (isLoading) {
    return (
      <LoadingSpinner
        size="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12"
        color="text-custom-orange-1"
      />
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Optional: Collection Title */}
      {/* <h1 className="text-4xl font-bold mb-8 text-center capitalize">
        {collection.title} Collection
      </h1> */}

      <RowsPhotoAlbum
        photos={images}
        render={{ image: renderCldImage }}
        rowConstraints={{ maxPhotos: 3 }}
        onClick={({ index }) => setIndex(index)}
      />
      <Lightbox
        slides={images}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        render={{ slide: LightboxImage }}
      />
    </div>
  );
};

export default Collection;
