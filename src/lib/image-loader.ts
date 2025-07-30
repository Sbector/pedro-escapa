// Alternativa más elegante: crear un loader de imágenes
export async function loadAllImages() {
  const imageModules = await Promise.all([
    // 98-01 series
    import("@assets/images/bidimensional/98-01/01.webp"),
    import("@assets/images/bidimensional/98-01/02.webp"),
    import("@assets/images/bidimensional/98-01/03.webp"),
    import("@assets/images/bidimensional/98-01/04.webp"),
    import("@assets/images/bidimensional/98-01/05.webp"),
    import("@assets/images/bidimensional/98-01/06.webp"),
    import("@assets/images/bidimensional/98-01/07.webp"),
    // Escaleras series
    import("@assets/images/bidimensional/escaleras/01.webp"),
    import("@assets/images/bidimensional/escaleras/02.webp"),
    import("@assets/images/bidimensional/escaleras/03.webp"),
    import("@assets/images/bidimensional/escaleras/04.webp"),
    import("@assets/images/bidimensional/escaleras/05.webp"),
    import("@assets/images/bidimensional/escaleras/06.webp"),
    import("@assets/images/bidimensional/escaleras/07.webp"),
  ])

  return imageModules.map((module) => module.default)
}

export function getRandomImageFromLoaded(images: any[]): any {
  const randomIndex = Math.floor(Math.random() * images.length)
  return images[randomIndex]
}
