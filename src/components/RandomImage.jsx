import { useState, useEffect, useRef } from "react";

export default function RandomImage({ images }) {
  const [current, setCurrent] = useState(
    () => Math.floor(Math.random() * images.length)
  );
  const [fade, setFade] = useState(true);
  const [paused, setPaused] = useState(false);
  const inactivityTimeout = useRef(null);

  const changeImage = () => {
    setFade(false); // fade out

    setTimeout(() => {
      // Elegir siguiente imagen distinta
      let next;
      do {
        next = Math.floor(Math.random() * images.length);
      } while (next === current);

      // Crear imagen JS para pre-cargar
      const imgPreload = new Image();
      imgPreload.src = images[next].src;

      imgPreload.onload = () => {
        // Cuando cargue, cambia la imagen y hace fade in
        setCurrent(next);
        setFade(true);
      };

      // Opcional: manejar error de carga
      imgPreload.onerror = () => {
        // Si falla, mantén la actual y haz fade in para no dejar la pantalla vacía
        setFade(true);
      };
    }, 1000); // duración fade out (igual que CSS)
  };

  // Manejo intervalo cambio automático
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      changeImage();
    }, 5000);

    return () => clearInterval(interval);
  }, [paused, current, images.length]);

  // Pausar y reactivar al mover mouse o touch
  const handleMouseMove = () => {
    setPaused(true);
    clearTimeout(inactivityTimeout.current);

    inactivityTimeout.current = setTimeout(() => {
      setPaused(false);
    }, 2000);
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
        className={`h-full w-auto object-contain transition-opacity duration-1000 ease-in-out ${
          fade ? "opacity-100" : "opacity-0"
        }`}
        style={{ cursor: "default" }}
      />
    </div>
  );
}
