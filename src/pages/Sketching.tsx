import { useState, useEffect, useCallback, useRef } from 'react';
import { usePageTimeTracking } from '@/hooks/useTimeTracking';
import { Pencil, ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';

import manifest from '../data/image-manifest.json';

const categoryImageMap: Record<string, string[]> = (manifest as { sketches?: Record<string, string[]> }).sketches ?? {};
const allSketches: string[] = Object.values(categoryImageMap).flat();

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor((i * 7 + 3) % (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const shuffledSketches = shuffleArray([...allSketches].sort());

const availableCategories = Object.keys(categoryImageMap).sort((a, b) => {
  const yearA = parseInt(a.match(/\d{4}/)?.[0] || '0');
  const yearB = parseInt(b.match(/\d{4}/)?.[0] || '0');

  if (yearA && yearB) {
    return yearB - yearA;
  }
  if (yearA) return -1;
  if (yearB) return 1;
  return a.localeCompare(b);
});

const INITIAL_SKETCH_COUNT = 30;

const Sketching = () => {
  usePageTimeTracking('sketching');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<{ images: string[]; index: number } | null>(null);
  const [displayCount, setDisplayCount] = useState(INITIAL_SKETCH_COUNT);
  const [numCols, setNumCols] = useState(3);
  const prevDisplayCountRef = useRef(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const prev = {
      title: document.title,
      desc: document.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
      canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
    };
    document.title = 'Sketching | Vinay Badhan';
    document.querySelector('meta[name="description"]')?.setAttribute('content', "Sketch gallery by Vinay Badhan — pencil drawings, portraits, and observations on paper.");
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://vinayb21-work.github.io/sketching');
    return () => {
      document.title = prev.title;
      document.querySelector('meta[name="description"]')?.setAttribute('content', prev.desc);
      document.querySelector('link[rel="canonical"]')?.setAttribute('href', prev.canonical);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const updateCols = () => {
      if (window.innerWidth < 768) setNumCols(1);
      else if (window.innerWidth < 1024) setNumCols(2);
      else setNumCols(3);
    };
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  useEffect(() => {
    prevDisplayCountRef.current = displayCount;
  }, [displayCount]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
    } else {
      touchStartX.current = null;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    if (e.changedTouches.length !== 1) {
      touchStartX.current = null;
      return;
    }

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    prevDisplayCountRef.current = 0;
    setDisplayCount(INITIAL_SKETCH_COUNT);
  }, [selectedCategory]);

  const getSketches = (): string[] => {
    if (selectedCategory === 'All') {
      return shuffledSketches;
    }
    return categoryImageMap[selectedCategory] || [];
  };

  const sketches = getSketches();

  const openLightbox = (imageIndex: number) => {
    setLightboxImage({ images: sketches, index: imageIndex });
  };

  const closeLightbox = useCallback(() => setLightboxImage(null), []);

  const nextImage = useCallback(() => {
    setLightboxImage(prev => {
      if (!prev) return null;
      return {
        ...prev,
        index: (prev.index + 1) % prev.images.length
      };
    });
  }, []);

  const prevImage = useCallback(() => {
    setLightboxImage(prev => {
      if (!prev) return null;
      return {
        ...prev,
        index: (prev.index - 1 + prev.images.length) % prev.images.length
      };
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxImage) return;

      switch (e.key) {
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'Escape':
          closeLightbox();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, nextImage, prevImage, closeLightbox]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-rose-50 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
      <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-sm dark:shadow-slate-800/50 sticky top-0 z-50 transition-colors duration-300">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <main className="flex-grow">
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Pencil className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">Sketching</h1>
              <p className="text-xl text-slate-600 dark:text-slate-400">
                Pencil on paper — portraits, places, and quiet observations
              </p>
            </div>
          </div>
        </section>

        {availableCategories.length > 0 && (
          <section className="pb-8">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    variant={selectedCategory === 'All' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory('All')}
                  >
                    All ({allSketches.length})
                  </Button>
                  {availableCategories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category.replace(/_/g, ' ')} ({categoryImageMap[category].length})
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="pb-20">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              {sketches.length > 0 ? (
                <>
                  <div className="flex gap-4">
                    {Array.from({ length: numCols }, (_, colIndex) => (
                      <div key={colIndex} className="flex flex-col gap-4 flex-1 min-w-0">
                        {sketches.slice(0, displayCount)
                          .map((sketch, index) => ({ sketch, index }))
                          .filter(({ index }) => index % numCols === colIndex)
                          .map(({ sketch, index }) => (
                            <div
                              key={`${selectedCategory}-${index}`}
                              className={`group cursor-pointer${index >= prevDisplayCountRef.current ? ' animate-fade-in' : ''}`}
                              onClick={() => openLightbox(index)}
                            >
                              <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                                <img
                                  src={sketch}
                                  alt={`Sketch ${index + 1}`}
                                  loading="lazy"
                                  className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                              </div>
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>

                  {displayCount < sketches.length && (
                    <div className="text-center mt-8">
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => setDisplayCount(prev => Math.min(prev + 30, sketches.length))}
                      >
                        Load More ({sketches.length - displayCount} remaining)
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-20">
                  <div className="w-24 h-24 mx-auto mb-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                    <Pencil className="w-12 h-12 text-slate-400" />
                  </div>
                  <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-4">Coming Soon</h2>
                  <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    Sketch gallery is being curated. Check back soon for drawings from the sketchbook!
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={closeLightbox}
          >
            <X className="w-8 h-8" />
          </button>

          <button
            className="absolute left-4 text-white hover:text-gray-300 transition-colors p-2"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <img
            src={lightboxImage.images[lightboxImage.index]}
            alt="Sketch"
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />

          <button
            className="absolute right-4 text-white hover:text-gray-300 transition-colors p-2"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="absolute bottom-4 text-white text-sm">
            {lightboxImage.index + 1} / {lightboxImage.images.length}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Sketching;
