import { ResourceApiResponse } from 'cloudinary';

export type CloudinaryResource = ResourceApiResponse['resources'][number];

export interface ImageData {
  public_id: string;
  src: string;
  width: number;
  height: number;
  format: string;
  alt?: string;
  title?: string;
}