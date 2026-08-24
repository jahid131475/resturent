import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';

interface GalleryItem {
  id: string;
  category: 'ambiance' | 'culinary' | 'wine' | 'cocktails';
  title: string;
  subtitle: string;
  image: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    category: 'ambiance',
    title: 'The Grand Chandelier Dining Hall',
    subtitle: 'Warm evening mood beneath vaulted crystal lights',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'gal-2',
    category: 'culinary',
    title: 'A5 Wagyu & Binchotan Charcoal Sear',
    subtitle: 'Precision flame finish at the Chef’s counter',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'gal-3',
    category: 'cocktails',
    title: 'Smoked Saffron Old Fashioned Vapor',
    subtitle: 'Hand-carved crystalline ice & barrel aromatics',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'gal-4',
    category: 'wine',
    title: 'The Grand Cru Sommelier Cellar',
    subtitle: 'Over 3,000 carefully curated international vintages',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'gal-5',
    category: 'culinary',
    title: 'Handcrafted Truffle Tagliolini',
    subtitle: 'Shaved black Norcia truffles & 36-yolk pasta',
    image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281691?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'gal-6',
    category: 'ambiance',
    title: 'Verdant Garden Terrace at Sunset',
    subtitle: 'Panoramic skyline views & open fire pits',
    image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'gal-7',
    category: 'culinary',
    title: 'Valrhona Dark Chocolate Sphere Melt',
    subtitle: 'Warm salted caramel pour-over table side',
    image: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'gal-8',
    category: 'cocktails',
    title: 'Empress Botanical Violette Fizz',
    subtitle: 'Indigo gin, wild lavender & vintage champagne float',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80'
  }
];

export const GallerySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const filters = [
    { id: 'all', label: 'All Moments' },
    { id: 'ambiance', label: 'Dining Rooms' },
    { id: 'culinary', label: 'Culinary Art' },
    { id: 'cocktails', label: 'Mixology' },
    { id: 'wine', label: 'Wine Vault' },
  ];

  const filteredItems = activeFilter === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeFilter);

  const handleOpenLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#0a0a0c] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase font-bold tracking-[0.25em] text-gold-400 block mb-2">
            Visual Experience
          </span>
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white mb-4">
            The Ambiance & Culinary Craft
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Glimpses into our dining rooms, open kitchen stations, mixology bar, and private sommelier vaults.
          </p>
        </div>

        {/* Bento Filter Dock */}
        <div className="flex items-center justify-center mb-10 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex items-center gap-1.5 p-1.5 bg-[#141414] rounded-2xl border border-white/10 backdrop-blur-md">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-gradient-to-r from-gold-500 to-gold-600 text-black font-bold shadow-md shadow-gold-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handleOpenLightbox(index)}
              className="group relative h-64 sm:h-72 rounded-3xl overflow-hidden cursor-pointer bg-[#121214] border border-white/10 hover:border-gold-500/40 shadow-xl transition-all duration-300"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute inset-0 p-5 flex flex-col justify-between text-left">
                <div className="flex justify-end">
                  <div className="p-2 rounded-xl bg-black/60 backdrop-blur-md text-white/80 group-hover:text-gold-400 group-hover:scale-110 transition-all border border-white/10">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-display text-base font-bold text-white mb-0.5 leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-zinc-300 text-xs line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedImageIndex(null);
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedImageIndex(null)}
            className="absolute top-6 right-6 z-20 p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 z-20 p-3 rounded-2xl bg-black/60 hover:bg-gold-500 hover:text-black text-white transition-all cursor-pointer border border-white/10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 z-20 p-3 rounded-2xl bg-black/60 hover:bg-gold-500 hover:text-black text-white transition-all cursor-pointer border border-white/10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Center Item */}
          <div className="max-w-4xl w-full text-center">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 max-h-[75vh] inline-block bg-[#121214]">
              <img
                src={filteredItems[selectedImageIndex].image}
                alt={filteredItems[selectedImageIndex].title}
                className="w-full max-h-[75vh] object-contain"
              />
            </div>
            <div className="mt-4 text-left max-w-xl mx-auto bg-[#121214] p-4 rounded-2xl border border-white/10">
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 block mb-1">
                {filteredItems[selectedImageIndex].category}
              </span>
              <h3 className="font-display text-2xl font-bold text-white">
                {filteredItems[selectedImageIndex].title}
              </h3>
              <p className="text-zinc-300 text-sm mt-1">
                {filteredItems[selectedImageIndex].subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
