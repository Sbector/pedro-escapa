// Lista de todas las imágenes disponibles en bidimensional
export const bidimensionalImages = [
  // Imágenes de 98-01
  "/images/bidimensional/98-01/01.webp",
  "/images/bidimensional/98-01/02.webp",
  "/images/bidimensional/98-01/03.webp",
  "/images/bidimensional/98-01/04.webp",
  "/images/bidimensional/98-01/05.webp",
  "/images/bidimensional/98-01/06.webp",
  "/images/bidimensional/98-01/07.webp",

  // Imágenes de escaleras
  "/images/bidimensional/escaleras/01.webp",
  "/images/bidimensional/escaleras/02.webp",
  "/images/bidimensional/escaleras/03.webp",
  "/images/bidimensional/escaleras/04.webp",
  "/images/bidimensional/escaleras/05.webp",
  "/images/bidimensional/escaleras/06.webp",
  "/images/bidimensional/escaleras/07.webp",
]

// Función para obtener una imagen aleatoria
export function getRandomImage(): string {
  const randomIndex = Math.floor(Math.random() * bidimensionalImages.length)
  return bidimensionalImages[randomIndex]
}

// Función para obtener la siguiente imagen en secuencia
export function getNextImage(currentImage: string): string {
  const currentIndex = bidimensionalImages.indexOf(currentImage)
  const nextIndex = (currentIndex + 1) % bidimensionalImages.length
  return bidimensionalImages[nextIndex]
}

// Función para obtener la imagen anterior en secuencia
export function getPreviousImage(currentImage: string): string {
  const currentIndex = bidimensionalImages.indexOf(currentImage)
  const previousIndex = currentIndex === 0 ? bidimensionalImages.length - 1 : currentIndex - 1
  return bidimensionalImages[previousIndex]
}
