import Link from 'next/link';
import Image from 'next/image';

const collections = [
  {
    id: 'architektur',
    title: 'Architektur',
    image: '/photos/architektur/discussion_lr.jpg',
  },
  {
    id: 'sw',
    title: 'Schwarz-Weiß',
    image: '/photos/sw/rendezvous.jpg',
  },
  {
    id: 'composing',
    title: 'Composing',
    image: '/photos/composing/venice.jpg',
  },
  { 
    id: 'wimmelbilder',
    title: 'Wimmelbilder',
    image: '/photos/wimmelbilder/cityscape-1.jpg',
  },
];

const Portfolio = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* <h1 className="text-4xl font-bold mb-8 font-[family-name:var(--font-geist-mono)]">Portfolio</h1> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((collection) => (
          <Link href={`/portfolio/collections/${collection.id}`} key={collection.id}>
            <div className="relative overflow-hidden group cursor-pointer h-80">
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                objectFit="cover"
                className="transform transition-transform duration-300 group-hover:scale-105"
              />
              <div 
                className="absolute inset-0 flex items-center justify-center text-2xl text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100 font-extralight font-[family-name:var(--font-geist-sans)] uppercase"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}
              >
                {collection.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
