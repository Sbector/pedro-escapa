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

  // Precarga con el mismo srcSet que usa el <img> en pantalla
  const preloadResponsive = (target, onload, onerror) => {
    const imgPreload = new Image()
    const data = images[target]
    if (data.srcSet) {
      imgPreload.srcset = data.srcSet
      imgPreload.sizes = data.sizes
    }
    imgPreload.src = data.src
    if (onload) imgPreload.onload = onload
    if (onerror) imgPreload.onerror = onerror
    return imgPreload
  }

  const takeRandomFromPool = (exclude) => {
    if (availableImagesRef.current.length === 0) {
      availableImagesRef.current = [...images.keys()].filter((i) => i !== exclude)
    }
    const randomIndex = Math.floor(Math.random() * availableImagesRef.current.length)
    const nextIndex = availableImagesRef.current[randomIndex]
    availableImagesRef.current.splice(randomIndex, 1)
    return nextIndex
  }

  useEffect(() => {
    if (!images?.length) return
    // Primera imagen siempre aleatoria por visita: se elige al azar,
    // se precarga completa y recién entonces aparece con fade suave.
    // (Hay una espera breve en blanco; es el costo de no repetir imagen.)
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    if (reduceMotion) setPaused(true)

    let cancelled = false
    let attempts = 0
    const pickFirst = () => {
      if (cancelled) return
      if (attempts >= 3) {
        // Último recurso: mostrar la primera sin precargar
        setCurrentIndex(0)
        setIsInitialized(true)
        later(() => setOpacity(1), 50)
        return
      }
      attempts += 1
      const target = takeRandomFromPool(-1)
      if (target == null) return
      setIsLoading(true)
      preloadResponsive(
        target,
        () => {
          if (cancelled) return
          setCurrentIndex(target)
          setIsLoading(false)
          setIsInitialized(true)
          later(() => setOpacity(1), 50)
        },
        () => {
          if (cancelled) return
          setIsLoading(false)
          pickFirst()
        }
      )
    }
    pickFirst()
    return () => {
      cancelled = true
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

    const imgPreload = preloadResponsive(nextIndex)

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
    preloadResponsive(nextIndex)
  }, [currentIndex, isInitialized])

  const handleMouseMove = () => {
    // No reanudar si el usuario prefiere reduced-motion
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return
    setPaused(true)
    clearTimeout(inactivityTimeout.current)
    inactivityTimeout.current = setTimeout(() => setPaused(false), 1000)
  }

  if (!images?.length) return null

  const current = images[currentIndex] || images[0]

  return (
    <div
      className="h-full w-full flex items-center justify-center overflow-hidden relative"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
    >
      {isInitialized && (
      <img
        key={currentIndex}
        src={current.src || "/placeholder.svg"}
        srcSet={current.srcSet}
        sizes={current.sizes}
        alt={alt}
        decoding="async"
        fetchpriority="high"
        className="absolute h-full w-auto object-contain"
        style={{
          opacity,
          transition: "opacity 0.4s ease-in-out",
        }}
        onLoad={() => setIsLoading(false)}
      />
      )}
    </div>
  )
}
