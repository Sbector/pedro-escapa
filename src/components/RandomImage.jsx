import { useState, useEffect, useRef } from "react"

export default function RandomImage({ images, alt = "Obra de Pedro Escapa" }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [paused, setPaused] = useState(false)
  const [opacity, setOpacity] = useState(0)
  const inactivityTimeout = useRef(null)
  const availableImagesRef = useRef([])
  const preloadedImageRef = useRef(null)
  const timeoutsRef = useRef([])
  const [isInitialized, setIsInitialized] = useState(false)

  const later = (fn, ms) => {
    const id = setTimeout(fn, ms)
    timeoutsRef.current.push(id)
    return id
  }

  useEffect(() => {
    if (!images?.length) return
    const randomIndex = Math.floor(Math.random() * images.length)
    setCurrentIndex(randomIndex)
    availableImagesRef.current = [...images.keys()].filter((i) => i !== randomIndex)
    setIsInitialized(true)
    const id = setTimeout(() => setOpacity(1), 100)
    timeoutsRef.current.push(id)
    // Respeta reduced-motion: no auto-rotar
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setPaused(true)
    }
    return () => {
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
      clearTimeout(inactivityTimeout.current)
    }
  }, [])

  const getNextImageIndex = () => {
    if (availableImagesRef.current.length === 0) {
      availableImagesRef.current = [...images.keys()].filter((i) => i !== currentIndex)
    }
    const randomIndex = Math.floor(Math.random() * availableImagesRef.current.length)
    const nextIndex = availableImagesRef.current[randomIndex]
    availableImagesRef.current.splice(randomIndex, 1)
    return nextIndex
  }

  const changeImage = () => {
    if (isLoading) return
    if (!images?.length) return

    const nextIndex = getNextImageIndex()
    if (nextIndex == null) return
    setIsLoading(true)
    setOpacity(0)

    const imgPreload = new Image()
    imgPreload.src = images[nextIndex].src

    imgPreload.onload = () => {
      preloadedImageRef.current = imgPreload
      later(() => {
        setCurrentIndex(nextIndex)
        setIsLoading(false)
        later(() => setOpacity(1), 50)
      }, 400)
    }

    imgPreload.onerror = () => {
      console.warn(`Failed to load image: ${images[nextIndex].src}`)
      setIsLoading(false)
      setOpacity(1)
      later(changeImage, 100)
    }
  }

  useEffect(() => {
    if (paused || isLoading || !isInitialized) return
    const interval = setInterval(changeImage, 3000)
    return () => clearInterval(interval)
  }, [paused, isLoading, currentIndex, isInitialized])

  useEffect(() => {
    if (images.length <= 1 || !isInitialized) return

    const nextIndex = availableImagesRef.current[0] || getNextImageIndex()
    const imgPreload = new Image()
    imgPreload.src = images[nextIndex].src
  }, [currentIndex, isInitialized])

  const handleMouseMove = () => {
    // No reanudar si el usuario prefiere reduced-motion
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return
    setPaused(true)
    clearTimeout(inactivityTimeout.current)
    inactivityTimeout.current = setTimeout(() => setPaused(false), 1000)
  }

  if (!images?.length) return null

  return (
    <div
      className="h-full w-full flex items-center justify-center overflow-hidden relative"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
    >
      <img
        key={currentIndex}
        src={images[currentIndex].src || "/placeholder.svg"}
        srcSet={images[currentIndex].srcSet}
        sizes={images[currentIndex].sizes}
        alt={alt}
        decoding="async"
        fetchpriority="high"
        className="absolute h-full w-auto object-contain"
        style={{
          opacity: isInitialized ? opacity : 0,
          transition: "opacity 0.4s ease-in-out",
        }}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}
