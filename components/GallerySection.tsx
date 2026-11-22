'use client';

import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Facade' | 'Interior' | 'Terrace' | 'Materiality';
  frame: string;
  frameIndex: number;
  specs: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Monolithic Facade & Concrete Ribs',
    category: 'Facade',
    frame: '/frames/ezgif-frame-060.jpg',
    frameIndex: 60,
    specs: 'Custom fluted architectural precast concrete panels with basalt sand aggregates.',
  },
  {
    id: 'g2',
    title: 'Double-Height Living Saloon',
    category: 'Interior',
    frame: '/frames/ezgif-frame-125.jpg',
    frameIndex: 125,
    specs: '7.2-meter ceiling span featuring acoustic slotted micro-perforated smoked oak.',
  },
  {
    id: 'g3',
    title: 'Cantilevered Sky Loggia',
    category: 'Terrace',
    frame: '/frames/ezgif-frame-185.jpg',
    frameIndex: 185,
    specs: 'Continuous post-tensioned glass balustrades with recessed LED floor grazing.',
  },
  {
    id: 'g4',
    title: 'Art Atrium & Floating Staircase',
    category: 'Interior',
    frame: '/frames/ezgif-frame-150.jpg',
    frameIndex: 150,
    specs: 'Direct north-facing diffused skylight system engineered for private fine art.',
  },
  {
    id: 'g5',
    title: 'Basalt Stone Hearth & Joinery',
    category: 'Materiality',
    frame: '/frames/ezgif-frame-210.jpg',
    frameIndex: 210,
    specs: 'Hand-chiselled Italian basalt block fireplace with custom patinated brass mantle.',
  },
  {
    id: 'g6',
    title: 'Penthouse Summit Observation Deck',
    category: 'Terrace',
    frame: '/frames/ezgif-frame-285.jpg',
    frameIndex: 285,
    specs: 'Level 50 private observation terrace with heated stone paving and horizon infinity edge.',
  },
];

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const categories = ['All', 'Facade', 'Interior', 'Terrace', 'Materiality'];

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeModalIndex !== null) {
      setActiveModalIndex((activeModalIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeModalIndex !== null) {
      setActiveModalIndex((activeModalIndex + 1) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-28 px-4 sm:px-8 border-t border-border bg-surface-subtle/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 pb-6 border-b border-border/60">
          <div>
            <div className="text-[10px] sm:text-[11px] font-mono tracking-widest text-accent uppercase mb-2">
              CURATED SPACES // SECTION 03
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-light text-neutral-100 tracking-tight">
              Architectural Gallery
            </h2>
          </div>
          <p className="mt-4 md:mt-0 text-xs sm:text-sm text-neutral-400 font-light max-w-md">
            Visual studies of light, proportion, and materiality extracted directly from the high-resolution structural sequence.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm transition-colors ${
                activeCategory === cat
                  ? 'bg-neutral-100 text-neutral-900 font-semibold'
                  : 'bg-surface border border-border text-neutral-400 hover:text-white hover:border-neutral-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setActiveModalIndex(index)}
              className="group relative cursor-pointer border border-border bg-surface rounded-sm overflow-hidden flex flex-col hover:border-neutral-500 transition-colors duration-300"
            >
              {/* Image Preview */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                <img
                  src={item.frame}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />

                {/* Corner Expand Indicator */}
                <div className="absolute top-3 right-3 p-1.5 bg-background/80 backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5 text-accent" />
                </div>

                <div className="absolute bottom-3 left-3">
                  <span className="px-2 py-0.5 text-[9px] font-mono tracking-widest text-neutral-300 bg-background/80 border border-white/10 uppercase">
                    FRAME {String(item.frameIndex).padStart(3, '0')}
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-wider text-accent uppercase block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-medium text-neutral-200 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-neutral-400 font-light mt-2 line-clamp-1">
                  {item.specs}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Fullscreen Modal */}
      {activeModalIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-lg"
          onClick={() => setActiveModalIndex(null)}
        >
          <div
            className="relative max-w-5xl w-full flex flex-col space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-border/80 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-accent uppercase tracking-wider">
                  {filteredItems[activeModalIndex].category}
                </span>
                <span>//</span>
                <span className="text-neutral-200 font-sans text-sm">
                  {filteredItems[activeModalIndex].title}
                </span>
              </div>
              <button
                onClick={() => setActiveModalIndex(null)}
                className="p-1 text-neutral-400 hover:text-white"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Visual */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-950 border border-neutral-800">
              <img
                src={filteredItems[activeModalIndex].frame}
                alt={filteredItems[activeModalIndex].title}
                className="w-full h-full object-contain"
              />

              {/* Prev / Next Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 text-white border border-white/10 rounded-sm"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 text-white border border-white/10 rounded-sm"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Footnote Specs */}
            <div className="flex items-center justify-between text-xs text-neutral-400 font-light pt-2">
              <p className="max-w-2xl">{filteredItems[activeModalIndex].specs}</p>
              <span className="font-mono text-neutral-400 tabular-nums">
                {activeModalIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
