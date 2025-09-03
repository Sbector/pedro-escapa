import { useState, useEffect, useRef } from "react";

const LeftArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.46 283.46" className="size-8 text-black hover:text-gray-600 fill-current">
    <polygon points="84.77 141.74 85.9 142.87 85.9 142.87 197.57 255.41 198.7 254.27 87.03 141.73 198.7 29.19 197.57 28.06 85.9 140.6 85.9 140.59 84.77 141.73 84.77 141.73 84.77 141.74" fill="currentColor" stroke="black" strokeWidth="4" />
  </svg>
);

const RightArrow = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.46 283.46" className="size-8 text-black hover:text-gray-600 fill-current">
    <polygon points="198.7 141.73 197.57 140.59 197.57 140.6 85.9 28.06 84.77 29.19 196.44 141.73 84.77 254.27 85.9 255.41 197.57 142.87 197.57 142.87 198.7 141.74 198.69 141.73 198.7 141.73" fill="currentColor" stroke="black" strokeWidth="4" />
  </svg>
);

export default function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const scrollToIndex = (index) => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const item = carousel.children[index];
    if (item) item.scrollIntoView({ behavior: 'smooth', inline: 'start' });
    setCurrentIndex(index);
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1 >= images.length ? 0 : currentIndex + 1;
    scrollToIndex(nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex = currentIndex - 1 < 0 ? images.length - 1 : currentIndex - 1;
    scrollToIndex(prevIndex);
  };

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let closestIndex = 0;
    let closestDistance = Infinity;

    Array.from(carousel.children).forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const distance = Math.abs(rect.left - carousel.getBoundingClientRect().left);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setCurrentIndex(closestIndex);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
      return () => carousel.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="h-full w-full">
      <ul
        ref={carouselRef}
        className="h-full w-full py-8 lg:py-32 flex flex-row space-x-32 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth no-scrollbar touch-pan-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((image, index) => (
          <li key={index} className="snap-start min-w-full flex flex-col justify-center items-center relative bg-white">
            <img
              src={image.imageRoute.src}
              alt=""
              width={image.width}
              height={image.height}
              className="max-h-full object-contain"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <p className="text-xs font-light tracking-widest text-center static mt-8 lg:absolute lg:bottom-0 lg:translate-y-16 lg:mt-0">
              <span className="font-bold uppercase pr-1">{image.title || ""}</span>
              {image.description || ""}
            </p>
          </li>
        ))}
      </ul>

      <button onClick={handlePrevious} className="hidden md:flex absolute top-1/2 left-0 -translate-y-1/2 rounded-full p-2 cursor-pointer" aria-label="Anterior">
        <LeftArrow />
      </button>

      <button onClick={handleNext} className="hidden md:flex absolute top-1/2 right-0 -translate-y-1/2 rounded-full p-2 cursor-pointer" aria-label="Siguiente">
        <RightArrow />
      </button>
    </div>
  );
}
