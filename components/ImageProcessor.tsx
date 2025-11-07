
import React, { useState, useCallback, useRef } from 'react';
import { UserPlan, ProcessedImage, ProcessingOptions } from '../types';
import { useImageProcessor } from '../hooks/useImageProcessor';
import { UploadIcon } from './icons/UploadIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { ProcessingSpinner } from './icons/ProcessingSpinner';

interface ImageProcessorProps {
  userPlan: UserPlan;
  imageCount: number;
  setImageCount: (count: number) => void;
}

const ImageProcessor: React.FC<ImageProcessorProps> = ({ userPlan, imageCount, setImageCount }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [options, setOptions] = useState<ProcessingOptions>({
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    initialQuality: 0.8,
  });
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { processedImages, processingState, processImages, downloadAllAsZip } = useImageProcessor();

  const handleFiles = (newFiles: FileList | null) => {
    if (newFiles) {
      const imageFiles = Array.from(newFiles).filter(file => file.type.startsWith('image/'));
      setFiles(prev => [...prev, ...imageFiles]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleFiles(e.target.files);
  };

  const onButtonClick = () => {
    inputRef.current?.click();
  };
  
  const handleSubmit = async () => {
    if (userPlan === 'free' && imageCount + files.length > 10) {
      alert(`Free trial allows up to 10 images. You have ${10 - imageCount} images left.`);
      return;
    }
    
    await processImages(files, options);
    setImageCount(imageCount + files.length);
    setFiles([]);
  };
  
  const getRemainingImages = () => {
    if (userPlan === 'unlimited') return 'Unlimited';
    if (userPlan === 'free') return Math.max(0, 10 - imageCount);
    return 'N/A';
  }

  const canProcess = files.length > 0 && processingState !== 'processing';

  return (
    <section id="image-processor" className="py-20 sm:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left: Upload */}
            <div className="md:col-span-1">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Upload Images</h3>
              <form onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()} className="h-full">
                <input ref={inputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleChange} />
                <label 
                  onClick={onButtonClick}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${dragActive ? 'border-primary bg-indigo-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'}`}>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                    <UploadIcon />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                  </div>
                </label>
              </form>
              <div className="mt-4 text-center text-sm text-gray-600">
                <p>Images remaining: <span className="font-bold text-primary">{getRemainingImages()}</span></p>
              </div>
            </div>

            {/* Right: Settings */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Optimization Settings</h3>
              <div className="space-y-6">
                <div>
                  <label htmlFor="quality" className="block text-sm font-medium text-gray-700">Compression Quality: <span className="font-semibold text-primary">{options.initialQuality * 100}%</span></label>
                  <input
                    type="range"
                    id="quality"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={options.initialQuality}
                    onChange={(e) => setOptions({ ...options, initialQuality: parseFloat(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                </div>
                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-gray-700">Max Width/Height: <span className="font-semibold text-primary">{options.maxWidthOrHeight}px</span></label>
                  <input
                    type="range"
                    id="size"
                    min="500"
                    max="4000"
                    step="100"
                    value={options.maxWidthOrHeight}
                    onChange={(e) => setOptions({ ...options, maxWidthOrHeight: parseInt(e.target.value) })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                </div>
              </div>
              <button 
                onClick={handleSubmit} 
                disabled={!canProcess}
                className={`w-full mt-8 py-3 px-4 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300 ${canProcess ? 'bg-primary hover:bg-primary-hover' : 'bg-gray-400 cursor-not-allowed'}`}>
                  {processingState === 'processing' ? <ProcessingSpinner /> : `Optimize ${files.length} Image(s)`}
              </button>
            </div>
          </div>

          {/* Uploaded Files Preview */}
          {files.length > 0 && (
            <div className="mt-8">
              <h4 className="font-semibold text-lg mb-2">To Be Processed:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {files.map((file, index) => (
                  <div key={index} className="relative">
                    <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-24 object-cover rounded-lg" />
                    <p className="text-xs truncate mt-1">{file.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Processed Images */}
          {processedImages.length > 0 && (
            <div className="mt-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Results</h3>
                <button
                  onClick={downloadAllAsZip}
                  className="bg-secondary text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-all duration-300 flex items-center"
                >
                  <DownloadIcon />
                  <span className="ml-2">Download All (.zip)</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {processedImages.map(image => (
                  <div key={image.id} className="bg-gray-50 p-4 rounded-lg border">
                    <img src={image.url} alt={image.name} className="w-full h-40 object-contain rounded-md bg-white mb-4" />
                    <p className="font-semibold text-sm truncate">{image.name}</p>
                    <div className="text-xs text-gray-600 mt-2">
                      <p>Original: <span className="font-medium">{(image.originalSize / 1024).toFixed(1)} KB</span></p>
                      <p>Optimized: <span className="font-medium text-green-600">{(image.processedSize / 1024).toFixed(1)} KB</span></p>
                      <p>Reduction: <span className="font-medium text-red-500">{(((image.originalSize - image.processedSize) / image.originalSize) * 100).toFixed(0)}%</span></p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ImageProcessor;
