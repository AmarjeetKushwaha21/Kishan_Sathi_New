import { useRef, useState } from 'react';
import { FiCamera, FiFile, FiImage, FiTrash2, FiUploadCloud } from 'react-icons/fi';
import { motion } from 'framer-motion';

import Button from '@/components/ui/Button';
import { cn } from '@/utils/cn';

export default function UploadZone({ preview, onSelect, onAnalyse, disabled }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState(null);

  function handleFile(file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file (JPG, PNG or WEBP).');
      return;
    }
    setError(null);
    const objectUrl = URL.createObjectURL(file);
    onSelect?.(objectUrl);
  }

  function clear() {
    if (inputRef.current) inputRef.current.value = '';
    onSelect?.(null);
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload a leaf image for AI detection"
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={(event) => {
          if ((event.key === 'Enter' || event.key === ' ') && !disabled) inputRef.current?.click();
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragOver(false);
          handleFile(event.dataTransfer.files?.[0]);
        }}
        className={cn(
          'focus-ring group relative flex cursor-pointer flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border-2 border-dashed p-8 text-center transition sm:p-10',
          dragOver
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 bg-white hover:border-primary-400 hover:bg-primary-50/40',
          disabled && 'pointer-events-none opacity-60'
        )}
      >
        {preview ? (
          <>
            <motion.img
              key={preview}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={preview}
              alt="Selected leaf for disease detection"
              className="max-h-64 rounded-xl object-cover shadow-card"
            />
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                clear();
              }}
              aria-label="Remove selected image"
              className="focus-ring absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/90 text-red-500 shadow-soft transition hover:bg-red-50"
            >
              <FiTrash2 aria-hidden="true" />
            </button>
          </>
        ) : (
          <>
            <motion.span
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-3xl text-white shadow-card"
            >
              <FiUploadCloud aria-hidden="true" className="group-hover:animate-float" />
            </motion.span>
            <div>
              <p className="font-display text-base font-semibold text-gray-900">
                {dragOver ? 'Drop the image here' : 'Drag & drop a leaf image'}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                or <span className="font-semibold text-primary-600">browse</span> from your phone
              </p>
              <p className="mt-2 text-[11px] text-gray-400">JPG, PNG or WEBP · max 10 MB · clear photos work best</p>
            </div>
          </>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-sky-50 px-2.5 py-1 text-[11px] font-semibold text-sky-700">
          <FiCamera aria-hidden="true" /> Use your camera
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary-50 px-2.5 py-1 text-[11px] font-semibold text-primary-700">
          <FiImage aria-hidden="true" /> Hold 30 cm away
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-accent-50 px-2.5 py-1 text-[11px] font-semibold text-accent-700">
          <FiFile aria-hidden="true" /> Good lighting
        </span>
      </div>

      {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}

      {preview && !disabled && (
        <div className="mt-4 flex justify-end">
          <Button type="button" onClick={onAnalyse} disabled={disabled}>
            Analyse this leaf
          </Button>
        </div>
      )}
    </div>
  );
}