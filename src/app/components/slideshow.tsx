"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";

import LoadingSpinner from "./loadingSpinner";
import ErrorMessage from "./errorMessage";

import { ImageData } from "@/types";

const Slideshow = () => {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/slideshow');

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        setImages(data.images);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching slideshow images:', err); // Debugging
        setError('Failed to load slideshow images.');
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

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
    <div className="relative w-full h-full">
      {images.map((image: ImageData, index) => (
        <div
          key={index}
          className={clsx(
            "absolute inset-0 transition-opacity duration-1000",
            {
              "opacity-100": index === current,
              "opacity-0": index !== current,
            }
          )}
        >
          <Image 
            src={image.src}
            fill
            sizes="100vw"
            className="object-cover"
            alt={image.alt || `Slide ${index + 1}`}
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  )
}

export default Slideshow;