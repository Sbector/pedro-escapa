import { useState, useEffect, useRef } from "react";

export default function RandomImage({ images }) {
  const [current, setCurrent] = useState(
    () => Math.floor(Math.random() * images.length)
  );
  const [fade, setFade] = useState(true);
  const [paused, setPaused] = useState(false);
  const inactivityTimeout = useRef(null);

  const changeImage = () => {
    setFade(false);
    setTimeout(() => {
      let next;
      do {
        next = Math.floor(Math.random() * images.length);
      } while (next === current);
      setCurrent(next);
      setFade(true);
    }, 1000); // duración de fade
  };

  // Manejo del intervalo para cambio automático
  useEffect(() => {
    if (paused) return; // no hacer nada si está pausado

    const interval = setInterval(() => {
      changeImage();
    }, 5000); // cada 5 segundos

    return () => clearInterval(interval);
  }, [paused, current, images.length]);

  // Detectar movimiento y pausar
  const handleMouseMove = () => {
    setPaused(true);
    clearTimeout(inactivityTimeout.current);

    // Reactivar tras 2 segundos sin movimiento
    inactivityTimeout.current = setTimeout(() => {
      setPaused(false);
    }, 2000);
  };

  return (
    <div
      className="h-full w-full flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove} // para touch también
    >
      <img
        src={images[current].src}
        width={images[current].width}
        height={images[current].height}
        alt=""
        className={`h-full w-auto object-contain transition-opacity duration-1000 ease-in-out ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        style={{ cursor: "default" }}
      />
    </div>
  );
}
