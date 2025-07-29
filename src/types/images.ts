export interface ImageMetadata {
  filename: string;
  title: string;
  description: string;
}

export interface CollectionMetadata {
  category: string;
  collection: string;
  about: string;
  images: ImageMetadata[];
}

export interface ImageData {
  src: any;
  alt: string;
  title?: string;
  description?: string;
  width?: number;
  height?: number;
} 