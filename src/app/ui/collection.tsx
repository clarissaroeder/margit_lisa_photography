"use client";

import { useState, useEffect } from 'react';
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

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

const Collection: React.FC<CollectionProps> = ({ collection }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const [images, setImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`/api/portfolio/collections/${collection}`);
        const data = await response.json();

        if (response.ok) {
          setImages(data.images);
          setIsLoading(false);
        } else {
          setError(data.error || 'Failed to load images.');
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('An unexpected error occurred.');
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [collection]);

  if (isLoading) return <div className="text-center py-8">Loading collection...</div>;
  if (error) return <div className="text-center text-red-500 py-8">Error: {error}</div>;

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
        // targetRowHeight={150}
        rowConstraints={{ maxPhotos: 3 }}
      />;
    </div>
  );
};

export default Collection;
