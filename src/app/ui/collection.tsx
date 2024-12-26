"use client";

import { useState } from 'react';
import Image from 'next/image';
// import CarouselModal from '../../ui/carouselModal';

interface Collection {
  id: string;
  title: string;
  images: string[];
}

const collections: Collection[] = [
  {
    id: 'architektur',
    title: 'Architektur',
    images: ['big_stage_lr', 'catwalk', 'circles-1', 'discussion_lr', 'oyster_lr', 'the_observer', 'walk_this_way-1']
  },
  {
    id: 'sw',
    title: 'Schwarz-Weiß',
    images: ['nh1_lr', 'nh2_lr', 'nh3_lr', 'phaneo_1', 'phaneo_2', 'phaneo_3', 'rendezvous', 'smokingbreak']
  },
  {
    id: 'composing',
    title: 'Composing',
    images: ['fantasy', 'good_vibration-1', 'grün3', 'morningwalk', 'photowalk', 'Seaflowers', 'venice']
  },
  { 
    id: 'wimmelbilder',
    title: 'Wimmelbilder',
    images: ['cityscape-1', 'Leipzig', 'siena_lr']
  },
];

interface CollectionProps {
  collectionID: string;
}

const Collection = ({ collectionID }: CollectionProps) => {
  const collection = collections.find(c => c.id == collectionID)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const images = collection?.images || [];

  const openModal = (image: string) => {
    setCurrentImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage(null);
  };

  if (!collection) return  <div>The collection was not found.</div>;
  // if (!data && collection) return <div>Loading collection...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* <h1 className="text-4xl font-bold mb-8 text-center capitalize">
        {collection.title} Collection
      </h1> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {collection.images.map((image, index) => (
          <div
            key={index}
            className="relative cursor-pointer"
            onClick={() => openModal(image)}
          >
            <div className="w-full h-48 relative">
              <Image
                src={`/photos/${collection.id}/${image}.jpg`}
                alt={image}
                fill
                objectFit="cover"
                // placeholder="blur"
                // blurDataURL=''
              />
            </div>
            {/* <p className="mt-2 text-center">{image || 'Untitled'}</p> */}
          </div>
        ))}
      </div>
    </div>
  )
}


export default Collection;
