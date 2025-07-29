import type { CollectionMetadata, ImageMetadata } from "../types/images";
import fs from 'fs';
import path from 'path';

// Función para cargar metadatos de una colección específica
export async function loadCollectionMetadata(categoria: string, slug: string): Promise<CollectionMetadata | null> {
  try {
    // Construir la ruta al archivo JSON
    const metadataPath = path.join(process.cwd(), 'src', 'lib', 'collections', `${categoria}-${slug}.json`);
    console.log(`Intentando cargar metadatos desde: ${metadataPath}`);
    
    // Leer el archivo JSON
    const fileContent = fs.readFileSync(metadataPath, 'utf-8');
    const metadata = JSON.parse(fileContent);
    
    console.log(`✅ Metadatos cargados exitosamente para ${categoria}/${slug}`);
    return metadata;
  } catch (error) {
    console.warn(`No se encontraron metadatos para ${categoria}/${slug}:`, error);
    return null;
  }
}

// Función para obtener metadatos de una imagen específica por nombre de archivo
export function getImageMetadata(metadata: CollectionMetadata, filename: string): ImageMetadata | null {
  return metadata.images.find(img => img.filename === filename) || null;
}

// Función para obtener metadatos de una imagen por índice
export function getImageMetadataByIndex(metadata: CollectionMetadata, index: number): ImageMetadata | null {
  return metadata.images[index] || null;
}

// Función para obtener la descripción de la colección
export function getCollectionAbout(metadata: CollectionMetadata): string {
  return metadata.about || "";
} 