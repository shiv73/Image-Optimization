
import { useState, useCallback } from 'react';
import { ProcessedImage, ProcessingOptions } from '../types';

// These are loaded from CDN in index.html
declare const imageCompression: any;
declare const JSZip: any;

export const useImageProcessor = () => {
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [processingState, setProcessingState] = useState<'idle' | 'processing' | 'done'>('idle');

  const processImages = useCallback(async (files: File[], options: ProcessingOptions) => {
    if (!files.length) return;
    
    setProcessingState('processing');
    setProcessedImages([]);

    const newProcessedImages: ProcessedImage[] = [];

    for (const file of files) {
      try {
        const compressedFile = await imageCompression(file, options);
        
        newProcessedImages.push({
          id: `${file.name}-${new Date().getTime()}`,
          name: compressedFile.name,
          originalSize: file.size,
          processedSize: compressedFile.size,
          url: URL.createObjectURL(compressedFile),
          file: compressedFile,
        });
      } catch (error) {
        console.error(`Could not process file ${file.name}:`, error);
      }
    }

    setProcessedImages(newProcessedImages);
    setProcessingState('done');
  }, []);

  const downloadAllAsZip = useCallback(async () => {
    if (processedImages.length === 0) return;

    const zip = new JSZip();
    processedImages.forEach((image) => {
      zip.file(image.name, image.file);
    });

    try {
      const content = await zip.generateAsync({ type: 'blob' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = 'optimized-images.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to create zip file", error);
    }
  }, [processedImages]);

  return {
    processedImages,
    processingState,
    processImages,
    downloadAllAsZip,
  };
};
