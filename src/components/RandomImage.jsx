import { useState, useEffect, useRef } from "react"

export default function RandomImage({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [paused, setPaused] = useState(false)
  const [opacity, setOpacity] = useState(0)
  const inactivityTimeout = useRef(null)
  const availableImagesRef = useRef([])
  const preloadedImageRef = useRef(null)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * images.length)
    setCurrentIndex(randomIndex)
    availableImagesRef.current = [...images.keys()].filter((i) => i !== randomIndex)
    setIsInitialized(true)
    setTimeout(() => setOpacity(1), 100)
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

    const nextIndex = getNextImageIndex()
    setIsLoading(true)
    setOpacity(0)

    const imgPreload = new Image()
    imgPreload.src = images[nextIndex].src

    imgPreload.onload = () => {
      preloadedImageRef.current = imgPreload
      setTimeout(() => {
        setCurrentIndex(nextIndex)
        setIsLoading(false)
        setTimeout(() => setOpacity(1), 50)
      }, 400)
    }

    imgPreload.onerror = () => {
      console.warn(`Failed to load image: ${images[nextIndex].src}`)
      setIsLoading(false)
      setOpacity(1)
      setTimeout(changeImage, 100)
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
    setPaused(true)
    clearTimeout(inactivityTimeout.current)
    inactivityTimeout.current = setTimeout(() => setPaused(false), 1000)
  }

  return (
    <div
      className="h-full w-full flex items-center justify-center overflow-hidden relative"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
    >
      <img
        key={currentIndex}
        src={images[currentIndex].src || "/placeholder.svg"}
        alt=""
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
