"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  value: string | File | null; // URL string or File object
  onChange: (file: File | string | null) => void;
  accept?: Record<string, string[]>;
  maxSize?: number;
  label?: string;
}

export const FileUpload = ({
  value,
  onChange,
  accept = { "image/*": [] },
  maxSize = 5 * 1024 * 1024, // 5MB
  label = "Drag & drop an image here, or click to select",
}: FileUploadProps) => {
  const [isUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setError(null);
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      onChange(file);
    },
    [onChange]
  );

  // Helper to get preview URL
  const getPreviewUrl = () => {
    if (!value) return "";
    if (typeof value === "string") return value;
    return URL.createObjectURL(value);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    maxFiles: 1,
  });

  return (
    <div className="w-full">
      {value ? (
        <div className="relative group rounded-[15px] border border-black/10 overflow-hidden aspect-video bg-white/50 flex items-center justify-center">
          <Image
            src={getPreviewUrl()}
            alt="Uploaded preview"
            layout="fill"
            objectFit="contain"
            className="p-2"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              aria-label="Remove image"
              onClick={() => onChange(null)}
              className="bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`flex flex-col items-center justify-center min-h-[150px] rounded-[15px] border-2 border-dashed transition-colors cursor-pointer px-4 py-6 text-center
            ${isDragActive ? "border-primary bg-primary/5" : "border-black/20 hover:border-primary/50 bg-white/50"}
            ${error ? "border-red-500 bg-red-50/50" : ""}
          `}
        >
          <input {...getInputProps()} />
          <UploadCloud className={`w-8 h-8 mb-3 ${isDragActive ? "text-primary" : "text-muted"}`} />
          
          {isUploading ? (
            <div className="text-sm font-medium text-primary flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
              Uploading...
            </div>
          ) : (
            <>
              <p className="text-sm font-medium text-foreground">{label}</p>
              <p className="text-xs text-muted mt-1">
                SVG, PNG, JPG or GIF (max. {Math.round(maxSize / 1024 / 1024)}MB)
              </p>
            </>
          )}
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
};
