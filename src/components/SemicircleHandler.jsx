// src/components/SemicircleHandler.jsx
import { useEffect } from "react";

export default function SemicircleHandler() {
  useEffect(() => {
    const textScroll = document.getElementById("text-scroll");
    const semicircle = document.getElementById("semicircle");

    if (!textScroll || !semicircle) return;

    const handleScroll = () => {
      const scrollTop = textScroll.scrollTop;
      const maxScroll = textScroll.scrollHeight - textScroll.clientHeight;
      const scrollFraction = scrollTop / maxScroll;
      const rotation = scrollFraction * 360;

      semicircle.style.transform = `rotate(${rotation}deg)`;
    };

    textScroll.addEventListener("scroll", handleScroll);
    return () => textScroll.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
