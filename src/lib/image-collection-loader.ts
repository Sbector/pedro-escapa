import { getImage } from "astro:assets";
import type { ImageData } from "../types/images";
import { loadCollectionMetadata, getImageMetadataByIndex } from "./collection-metadata";

// Mapeo de colecciones a sus funciones de import de imágenes
const collectionImageImports: Record<string, () => Promise<any[]>> = {
  // Bidimensional
  "bidimensional-98-01": async () => [
    (await import("@assets/images/bidimensional/98-01/01.webp")).default,
    (await import("@assets/images/bidimensional/98-01/02.webp")).default,
    (await import("@assets/images/bidimensional/98-01/03.webp")).default,
    (await import("@assets/images/bidimensional/98-01/04.webp")).default,
    (await import("@assets/images/bidimensional/98-01/05.webp")).default,
    (await import("@assets/images/bidimensional/98-01/06.webp")).default,
    (await import("@assets/images/bidimensional/98-01/07.webp")).default,
  ],
  "bidimensional-escaleras": async () => [
    (await import("@assets/images/bidimensional/escaleras/01.webp")).default,
    (await import("@assets/images/bidimensional/escaleras/02.webp")).default,
    (await import("@assets/images/bidimensional/escaleras/03.webp")).default,
    (await import("@assets/images/bidimensional/escaleras/04.webp")).default,
    (await import("@assets/images/bidimensional/escaleras/05.webp")).default,
    (await import("@assets/images/bidimensional/escaleras/06.webp")).default,
    (await import("@assets/images/bidimensional/escaleras/07.webp")).default,
  ],
  "bidimensional-composicion": async () => [
    (await import("@assets/images/bidimensional/composicion/01.webp")).default,
    (await import("@assets/images/bidimensional/composicion/02.webp")).default,
    (await import("@assets/images/bidimensional/composicion/03.webp")).default,
    (await import("@assets/images/bidimensional/composicion/04.webp")).default,
    (await import("@assets/images/bidimensional/composicion/05.webp")).default,
    (await import("@assets/images/bidimensional/composicion/06.webp")).default,
  ],
  "bidimensional-consejos": async () => [
    (await import("@assets/images/bidimensional/consejos/01.webp")).default,
    (await import("@assets/images/bidimensional/consejos/02.webp")).default,
    (await import("@assets/images/bidimensional/consejos/03.webp")).default,
    (await import("@assets/images/bidimensional/consejos/04.webp")).default,
    (await import("@assets/images/bidimensional/consejos/05.webp")).default,
    (await import("@assets/images/bidimensional/consejos/06.webp")).default,
    (await import("@assets/images/bidimensional/consejos/07.webp")).default,
  ],
  "bidimensional-mixta-sobre-escaleras": async () => [
    (await import("@assets/images/bidimensional/mixta-sobre-escaleras/1.webp")).default,
    (await import("@assets/images/bidimensional/mixta-sobre-escaleras/02.webp")).default,
    (await import("@assets/images/bidimensional/mixta-sobre-escaleras/03.webp")).default,
    (await import("@assets/images/bidimensional/mixta-sobre-escaleras/04.webp")).default,
    (await import("@assets/images/bidimensional/mixta-sobre-escaleras/05.webp")).default,
    (await import("@assets/images/bidimensional/mixta-sobre-escaleras/06.webp")).default,
    (await import("@assets/images/bidimensional/mixta-sobre-escaleras/07.webp")).default,
  ],
  "bidimensional-papeleria-y-almazen": async () => [
    (await import("@assets/images/bidimensional/papeleria-y-almazen/01.webp")).default,
    (await import("@assets/images/bidimensional/papeleria-y-almazen/02.webp")).default,
    (await import("@assets/images/bidimensional/papeleria-y-almazen/03.webp")).default,
    (await import("@assets/images/bidimensional/papeleria-y-almazen/04.webp")).default,
    (await import("@assets/images/bidimensional/papeleria-y-almazen/05.webp")).default,
    (await import("@assets/images/bidimensional/papeleria-y-almazen/06.webp")).default,
    (await import("@assets/images/bidimensional/papeleria-y-almazen/07.webp")).default,
    (await import("@assets/images/bidimensional/papeleria-y-almazen/08.webp")).default,
  ],
  
  // Interacciones
  "interacciones-colegages": async () => [
    (await import("@assets/images/interacciones/colegages/01.webp")).default,
    (await import("@assets/images/interacciones/colegages/02.webp")).default,
    (await import("@assets/images/interacciones/colegages/04.webp")).default,
    (await import("@assets/images/interacciones/colegages/05.webp")).default,
    (await import("@assets/images/interacciones/colegages/06.webp")).default,
    (await import("@assets/images/interacciones/colegages/07.webp")).default,
  ],
  "interacciones-arquitectura": async () => [
    (await import("@assets/images/interacciones/arquitectura/01.webp")).default,
    (await import("@assets/images/interacciones/arquitectura/02.webp")).default,
    (await import("@assets/images/interacciones/arquitectura/03.webp")).default,
    (await import("@assets/images/interacciones/arquitectura/04.webp")).default,
    (await import("@assets/images/interacciones/arquitectura/05.webp")).default,
    (await import("@assets/images/interacciones/arquitectura/06.webp")).default,
    (await import("@assets/images/interacciones/arquitectura/07.webp")).default,
  ],
  "interacciones-a-quien-corresponda": async () => [
    (await import("@assets/images/interacciones/a-quien-corresponda/01.webp")).default,
    (await import("@assets/images/interacciones/a-quien-corresponda/02.webp")).default,
    (await import("@assets/images/interacciones/a-quien-corresponda/03.webp")).default,
    (await import("@assets/images/interacciones/a-quien-corresponda/04.webp")).default,
    (await import("@assets/images/interacciones/a-quien-corresponda/05.webp")).default,
    (await import("@assets/images/interacciones/a-quien-corresponda/06.webp")).default,
    (await import("@assets/images/interacciones/a-quien-corresponda/07.webp")).default,
    (await import("@assets/images/interacciones/a-quien-corresponda/08.webp")).default,
    (await import("@assets/images/interacciones/a-quien-corresponda/09.webp")).default,
    (await import("@assets/images/interacciones/a-quien-corresponda/10.webp")).default,
    (await import("@assets/images/interacciones/a-quien-corresponda/11.webp")).default,
    (await import("@assets/images/interacciones/a-quien-corresponda/12.webp")).default,
  ],
  "interacciones-abstraccion-figurativa": async () => [
    (await import("@assets/images/interacciones/abstraccion-figurativa/01.webp")).default,
    (await import("@assets/images/interacciones/abstraccion-figurativa/07.webp")).default,
  ],
  
  // Papelería
  // Volúmenes
  "volumenes-volumenes": async () => [
    (await import("@assets/images/volumenes/01b.webp")).default,
    (await import("@assets/images/volumenes/02.webp")).default,
    (await import("@assets/images/volumenes/03.webp")).default,
    (await import("@assets/images/volumenes/05.webp")).default,
    (await import("@assets/images/volumenes/05b.webp")).default,
    (await import("@assets/images/volumenes/07b.webp")).default,
    (await import("@assets/images/volumenes/08.webp")).default,
    (await import("@assets/images/volumenes/09.webp")).default,
    (await import("@assets/images/volumenes/11.webp")).default,
    (await import("@assets/images/volumenes/11b.webp")).default,
    (await import("@assets/images/volumenes/12.webp")).default,
    (await import("@assets/images/volumenes/12b.webp")).default,
    (await import("@assets/images/volumenes/13.webp")).default,
    (await import("@assets/images/volumenes/14.webp")).default,
    (await import("@assets/images/volumenes/15.webp")).default,
    (await import("@assets/images/volumenes/16.webp")).default,
    (await import("@assets/images/volumenes/16b.webp")).default,
  ],
  "papeleria-torculo": async () => [
    (await import("@assets/images/papeleria/torculo/1.webp")).default,
    (await import("@assets/images/papeleria/torculo/2.webp")).default,
    (await import("@assets/images/papeleria/torculo/4.webp")).default,
    (await import("@assets/images/papeleria/torculo/5.webp")).default,
    (await import("@assets/images/papeleria/torculo/6.webp")).default,
    (await import("@assets/images/papeleria/torculo/7.webp")).default,
    (await import("@assets/images/papeleria/torculo/8.webp")).default,
    (await import("@assets/images/papeleria/torculo/10.webp")).default,
    (await import("@assets/images/papeleria/torculo/11.webp")).default,
    (await import("@assets/images/papeleria/torculo/12.webp")).default,
    (await import("@assets/images/papeleria/torculo/14.webp")).default,
    (await import("@assets/images/papeleria/torculo/15.webp")).default,
    (await import("@assets/images/papeleria/torculo/16.webp")).default,
    (await import("@assets/images/papeleria/torculo/17.webp")).default,
    (await import("@assets/images/papeleria/torculo/18.webp")).default,
    (await import("@assets/images/papeleria/torculo/19.webp")).default,
    (await import("@assets/images/papeleria/torculo/20.webp")).default,
    (await import("@assets/images/papeleria/torculo/21.webp")).default,
  ],
  "papeleria-shakers": async () => [
    (await import("@assets/images/papeleria/shakers/01.webp")).default,
  ],
  "papeleria-papeleria-y-almazen": async () => [
    (await import("@assets/images/papeleria/papeleria-y-almazen/01.webp")).default,
    (await import("@assets/images/papeleria/papeleria-y-almazen/02.webp")).default,
    (await import("@assets/images/papeleria/papeleria-y-almazen/03.webp")).default,
    (await import("@assets/images/papeleria/papeleria-y-almazen/04.webp")).default,
    (await import("@assets/images/papeleria/papeleria-y-almazen/05.webp")).default,
    (await import("@assets/images/papeleria/papeleria-y-almazen/06.webp")).default,
    (await import("@assets/images/papeleria/papeleria-y-almazen/07.webp")).default,
    (await import("@assets/images/papeleria/papeleria-y-almazen/08.webp")).default,
    (await import("@assets/images/papeleria/papeleria-y-almazen/09.webp")).default,
    (await import("@assets/images/papeleria/papeleria-y-almazen/10.webp")).default,
    (await import("@assets/images/papeleria/papeleria-y-almazen/11.webp")).default,
    (await import("@assets/images/papeleria/papeleria-y-almazen/12.webp")).default,
    (await import("@assets/images/papeleria/papeleria-y-almazen/13.webp")).default,
  ],
};

export async function loadCollectionImages(categoria: string, slug: string): Promise<ImageData[]> {
  const images: ImageData[] = [];
  
  try {
    const metadata = await loadCollectionMetadata(categoria, slug);
    const collectionKey = `${categoria}-${slug}`;
    
    console.log(`📁 Cargando imágenes para ${collectionKey}...`);
    
    const imageImportFunction = collectionImageImports[collectionKey];
    
    if (!imageImportFunction) {
      console.warn(`❌ No se encontró configuración de imágenes para ${collectionKey}`);
      return images;
    }
    
    const imageModules = await imageImportFunction();
    
    imageModules.forEach((module, index) => {
      const imageMetadata = metadata ? getImageMetadataByIndex(metadata, index) : null;
      
      console.log(`✅ Imagen ${index + 1}: Título: "${imageMetadata?.title || 'Sin título'}"`);
      
      images.push({
        src: module,
        alt: `${slug} - Imagen ${index + 1}`,
        title: imageMetadata?.title || "",
        description: imageMetadata?.description || ""
      });
    });
    
    console.log(`🎉 Cargadas ${images.length} imágenes para ${categoria}/${slug}`);
    
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