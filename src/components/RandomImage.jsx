import { useState, useEffect, useRef } from "react";

export default function RandomImage({ images }) {
  const [current, setCurrent] = useState(() =>
    Math.floor(Math.random() * images.length)
  );
  const [fade, setFade] = useState(true);
  const [paused, setPaused] = useState(false);
  const inactivityTimeout = useRef(null);

  // Lista dinámica que se va vaciando hasta reiniciarse
  const availableImagesRef = useRef([...images.keys()].filter(i => i !== current));

  const getNextImageIndex = () => {
    if (availableImagesRef.current.length === 0) {
      // Reiniciar baraja (excepto la actual para evitar repetición inmediata)
      availableImagesRef.current = [...images.keys()].filter(i => i !== current);
    }
    const randomIndex = Math.floor(Math.random() * availableImagesRef.current.length);
    const nextIndex = availableImagesRef.current[randomIndex];
    availableImagesRef.current.splice(randomIndex, 1);
    return nextIndex;
  };

  const changeImage = () => {
    setFade(false); // fade out

    setTimeout(() => {
      const next = getNextImageIndex();
      const imgPreload = new Image();
      imgPreload.src = images[next].src;

      imgPreload.onload = () => {
        setCurrent(next);
        setFade(true);
      };
      imgPreload.onerror = () => {
        setFade(true);
      };
    }, 800); // ← duración del fade out
  };

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(changeImage, 3000); // ← tiempo entre cambios
    return () => clearInterval(interval);
  }, [paused, current, images.length]);

  const handleMouseMove = () => {
    setPaused(true);
    clearTimeout(inactivityTimeout.current);
    inactivityTimeout.current = setTimeout(() => setPaused(false), 1000);
  };

  return (
    <div
      className="h-full w-full flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
    >
      <img
        src={images[current].src}
        width={images[current].width}
        height={images[current].height}
        alt=""
        className={`h-full w-auto object-contain transition-opacity duration-800 ease-in-out ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        style={{ cursor: "default" }}
      />
    </div>
  );
}
