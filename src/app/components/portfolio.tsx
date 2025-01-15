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
    <div className="container mx-auto px-4 py-16">
      {/* <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-mono)]">Portfolio</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((collection, index) => (
          <Link href={`/portfolio/collections/${collection.name}`} key={index}>
            <div className="relative overflow-hidden group cursor-pointer h-80">
              <Image
                src={collection.titleImage.src}
                alt={collection.name}
                fill
                objectFit="cover"
                className="transform transition-transform duration-300 group-hover:scale-105"
              />
              <div 
                className="absolute inset-0 flex items-center justify-center text-2xl text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100 font-extralight font-[family-name:var(--font-geist-sans)] uppercase"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}
              >
                {collection.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
