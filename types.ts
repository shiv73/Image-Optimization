
export type UserPlan = 'free' | 'payg' | 'unlimited';

export interface ProcessedImage {
  id: string;
  name: string;
  originalSize: number;
  processedSize: number;
  url: string;
  file: Blob;
}

export interface ProcessingOptions {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  useWebWorker: boolean;
  initialQuality: number;
}
