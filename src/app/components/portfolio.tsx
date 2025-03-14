"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import LoadingSpinner from './loadingSpinner';
import ErrorMessage from './errorMessage';

import { TitleImageResult } from '@/types'; 

const Portfolio = () => {
  const [collections, setCollections] = useState<TitleImageResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch('/api/portfolio');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCollections(data.collections);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching collections:', err);
        setError('Failed to load collections.');
        setIsLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

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
    <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 max-w-7xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {collections.map((collection, index) => (
          <Link href={`/portfolio/collections/${collection.name}`} key={index}>
            <div className="relative overflow-hidden group cursor-pointer h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96">
              <Image
                src={collection.titleImage.src}
                alt={collection.name}
                fill
                sizes="(min-width: 1280px) 576px, (min-width: 1024px) 480px, (min-width: 768px) 384px, (min-width: 640px) 304px, 100vw"
                className="object-cover transform transition-transform duration-300 group-hover:scale-105"
                priority={index < 2}
              />
                <div 
                  className={`
                    absolute inset-0 flex items-center justify-center 
                    text-2xl text-white font-extralight font-[family-name:var(--font-geist-sans)]
                    uppercase tracking-wider

                  bg-black/20 sm:bg-black/0 group-hover:bg-black/20

                    opacity-100 sm:opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                    `}
                >
                  {collection.name.replaceAll('-', ' ')}
                </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
