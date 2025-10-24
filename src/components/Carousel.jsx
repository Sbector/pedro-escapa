import { useState, useEffect, useRef } from "react";

const VolumeOn = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
       className="size-6 fill-current text-white">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03z"/>
  </svg>
);

const VolumeOff = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
       className="size-6 fill-current text-white">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.06c1.48-.74 2.5-2.26 2.5-4.03zM3 9v6h4l5 5V4L7 9H3z"/>
    <line x1="19" y1="5" x2="5" y2="19" stroke="white" strokeWidth="2"/>
  </svg>
);

const MuteButton = ({ videoRef }) => {
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <button
      onClick={toggleMute}
      className="absolute bottom-3 right-3"
    >
      {muted ? <VolumeOff /> : <VolumeOn />}
    </button>
  );
};


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

export default function Carousel({ items, mode = "single" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const videoRef = useRef(null); // 👈 referencia al video actual

  const scrollToIndex = (index) => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const item = carousel.children[index];
    if (item) item.scrollIntoView({ behavior: "smooth", inline: "start" });
    setCurrentIndex(index);
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1 >= items.length ? 0 : currentIndex + 1;
    scrollToIndex(nextIndex);
  };

  const handlePrevious = () => {
    const prevIndex = currentIndex - 1 < 0 ? items.length - 1 : currentIndex - 1;
    scrollToIndex(prevIndex);
  };

  const handleScroll = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let closestIndex = 0;
    let closestDistance = Infinity;

    Array.from(carousel.children).forEach((item, index) => {
      const rect = item.getBoundingClientRect();
      const distance = Math.abs(
        rect.left - carousel.getBoundingClientRect().left
      );
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
      carousel.addEventListener("scroll", handleScroll);
      return () => carousel.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="h-full w-full">
      <ul
        ref={carouselRef}
        className={`h-full w-full py-8 lg:py-32 flex flex-row 
        ${mode === "double" ? "gap-0" : "gap-8"} 
        overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth no-scrollbar`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item, index) => (
          <li
            key={index}
            className={`snap-start flex flex-col justify-center items-center relative bg-white
            ${mode === "double" ? "basis-1/2 flex-shrink-0 px-4" : "min-w-full"}
          `}
          >
            {item.imageRoute ? (
              <img
                src={item.imageRoute.src}
                alt=""
                width={item.width}
                height={item.height}
                className="max-h-full object-contain"
                loading={index === 0 ? "eager" : "lazy"}
              />
            ) : item.videoRoute ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  src={item.videoRoute}
                  autoPlay
                  muted
                  playsInline
                  loop
                  className="h-[637px] object-contain"
                />
                {/* 👇 Mini botón para mute/unmute */}
                <MuteButton videoRef={videoRef} />
              </div>
            ) : null}

            <p className="text-xs font-light tracking-widest text-center static mt-8 lg:absolute lg:bottom-0 lg:translate-y-16 lg:mt-0">
              <span className="font-bold uppercase pr-1">
                {item.title || ""}
              </span>
              {item.description || ""}
            </p>
          </li>
        ))}
      </ul>

      {/* Flechas */}
      <button
        onClick={handlePrevious}
        className="hidden md:flex absolute top-1/2 left-0 -translate-y-1/2 rounded-full p-2 cursor-pointer"
        aria-label="Anterior"
      >
        <LeftArrow />
      </button>

      <button
        onClick={handleNext}
        className="hidden md:flex absolute top-1/2 right-0 -translate-y-1/2 rounded-full p-2 cursor-pointer"
        aria-label="Siguiente"
      >
        <RightArrow />
      </button>
    </div>
  );
}
