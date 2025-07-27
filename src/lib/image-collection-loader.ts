import { getImage } from "astro:assets";

// Definir el tipo para los datos de imagen
export interface ImageData {
  src: any;
  alt: string;
  title?: string;
  description?: string;
}

// Función para cargar todas las imágenes de una colección específica
export async function loadCollectionImages(categoria: string, slug: string): Promise<ImageData[]> {
  const images: ImageData[] = [];
  
  try {
    // Mapear las rutas según categoria y slug
    const imagePath = `@assets/images/${categoria}/${slug}`;
    
    // Cargar imágenes según la colección
    if (categoria === "bidimensional") {
      if (slug === "98-01" || slug === "89-01") {
        // Cargar imágenes de la serie 98-01/89-01
        const imageModules = await Promise.all([
          import("@assets/images/bidimensional/98-01/01.webp"),
          import("@assets/images/bidimensional/98-01/02.webp"),
          import("@assets/images/bidimensional/98-01/03.webp"),
          import("@assets/images/bidimensional/98-01/04.webp"),
          import("@assets/images/bidimensional/98-01/05.webp"),
          import("@assets/images/bidimensional/98-01/06.webp"),
          import("@assets/images/bidimensional/98-01/07.webp"),
        ]);
        
        imageModules.forEach((module, index) => {
          images.push({
            src: module.default,
            alt: `${slug} - Imagen ${index + 1}`,
            title: `Obra ${index + 1}`,
            description: `Ejemplo de ficha técnica. 000 x 000 cm.`
          });
        });
      } 
      else if (slug === "escaleras") {
        // Cargar imágenes de escaleras
        const imageModules = await Promise.all([
          import("@assets/images/bidimensional/escaleras/01.webp"),
          import("@assets/images/bidimensional/escaleras/02.webp"),
          import("@assets/images/bidimensional/escaleras/03.webp"),
          import("@assets/images/bidimensional/escaleras/04.webp"),
          import("@assets/images/bidimensional/escaleras/05.webp"),
          import("@assets/images/bidimensional/escaleras/06.webp"),
          import("@assets/images/bidimensional/escaleras/07.webp"),
        ]);
        
        imageModules.forEach((module, index) => {
          images.push({
            src: module.default,
            alt: `Escaleras - Imagen ${index + 1}`,
            title: `Escaleras ${index + 1}`,
            description: `Serie Escaleras. 000 x 000 cm.`
          });
        });
      }
    }
    
    // Aquí puedes agregar más categorías en el futuro
    // else if (categoria === "interacciones") { ... }
    
  } catch (error) {
    console.warn(`No se pudieron cargar las imágenes para ${categoria}/${slug}:`, error);
  }
  
  return images;
}

// Función para optimizar las imágenes cargadas
export async function optimizeImages(images: ImageData[]) {
  const optimizedImages = await Promise.all(
    images.map(async (imageData) => {
      const optimizedImage = await getImage({
        src: imageData.src,
        format: 'webp',
        quality: 85,
        width: 1200, // Ajusta según tus necesidades
      });
      
      return {
        ...imageData,
        src: optimizedImage.src,
        width: optimizedImage.attributes.width,
        height: optimizedImage.attributes.height,
      };
    })
  );
  
  return optimizedImages;
}