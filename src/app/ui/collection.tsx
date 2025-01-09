"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  RenderImageContext,
  RenderImageProps,
  RowsPhotoAlbum,
} from "react-photo-album";
import "react-photo-album/rows.css";
import LoadingSpinner from './loadingSpinner';
import ErrorMessage from './errorMessage';

interface CollectionProps {
  collection: string;
}

interface ImageData {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  description?: string;
}

interface Photo {
  src: string;
  width: number;
  height: number;
  alt?: string;
  title?: string;
}

/**
 * Renders a Next.js Image component within the photo album.
 *
 * @param {RenderImageProps} props - Properties for rendering the image.
 * @param {RenderImageContext} context - Contextual information about the image.
 * @returns A JSX element containing the Image component.
 */
const renderNextImage = (
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
    <Image
      fill
      src={photo}
      alt={alt}
      title={title}
      // placeholder={blurDataURL ? "blur" : undefined}
    />
  </div>
);

/**
 * Collection Component
 *
 * Fetches and displays a collection of images in a responsive photo album.
 *
 * @param {CollectionProps} props - Props containing the collection identifier.
 * @returns A JSX element displaying the photo album or relevant states.
 */
const Collection: React.FC<CollectionProps> = ({ collection }) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`/api/portfolio/collections/${collection}`);
        const data = await response.json();

        throw new Error('Test error');

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

  const photos: Photo[] = images.map((img) => ({
    src: img.secure_url,
    width: img.width,
    height: img.height,
    alt: img.description || "Gallery Image",
    title: img.description || "",
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Optional: Collection Title */}
      {/* <h1 className="text-4xl font-bold mb-8 text-center capitalize">
        {collection.title} Collection
      </h1> */}

      <RowsPhotoAlbum
        photos={photos}
        render={{ image: renderNextImage }}
        rowConstraints={{ maxPhotos: 3 }}
      />
    </div>
  );
};

export default Collection;
