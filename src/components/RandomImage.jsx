import { useState, useRef } from "react";

// Lerp para suavizar
function lerp(a, b, t) {
  return a + (b - a) * t;
}

export default function RandomImage({ images }) {
  const [current, setCurrent] = useState(
    () => Math.floor(Math.random() * images.length)
  );
  const [fadeKey, setFadeKey] = useState(0);

  const lastPos = useRef({ x: 0, y: 0, time: Date.now() });
  const smoothSpeed = useRef(0);
  const lastChange = useRef(Date.now());

  const changeImage = () => {
    let next;
    do {
      next = Math.floor(Math.random() * images.length);
    } while (next === current);
    setCurrent(next);
    setFadeKey((k) => k + 1);
    lastChange.current = Date.now();
  };

  const handleMove = (x, y, isTouch = false) => {
    const now = Date.now();
    const dx = x - lastPos.current.x;
    const dy = y - lastPos.current.y;
    const dt = (now - lastPos.current.time) / 1000; // seg

    lastPos.current = { x, y, time: now };
    if (dt === 0) return;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const speed = distance / dt; // px/seg
    smoothSpeed.current = lerp(smoothSpeed.current, speed, 0.15);

    // Parámetros distintos para touch y mouse
    const cooldown = isTouch ? 400 : 300;
    const speedThreshold = isTouch ? 150 : 350;

    if (
      smoothSpeed.current > speedThreshold &&
      now - lastChange.current > cooldown
    ) {
      changeImage();
    }
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientX, e.clientY, false);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY, true);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    lastPos.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
  };

  return (
    <div
      className="h-full w-full flex items-center justify-center cursor-pointer overflow-hidden"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
    >
      <img
        key={fadeKey}
        src={images[current].src}
        width={images[current].width}
        height={images[current].height}
        alt=""
        className="h-full w-auto object-contain transition-opacity duration-500 ease-in-out opacity-100"
      />
    </div>
  );
}
