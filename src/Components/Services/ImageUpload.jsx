// ImageUpload.jsx
// Drag-and-drop / click-to-upload image zone.
// Props:
//   label    – field label string
//   preview  – optional URL of uploaded image to show
//   onChange – called with the File object when a file is selected

import { useRef } from "react";

export default function ImageUpload({ label = "Service Imagery", preview, onChange }) {
  const inputRef = useRef(null);

  function handleFile(file) {
    if (file && onChange) onChange(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="relative group">
      <label className="block text-sm font-bold text-on-surface-variant mb-3 font-label">
        {label}
      </label>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="w-full aspect-video bg-surface-container-high rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/40 group-hover:border-primary/40 transition-colors cursor-pointer overflow-hidden"
      >
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-cover" />
        ) : (
          <>
            <span className="material-symbols-outlined text-4xl text-outline mb-2">
              add_photo_alternate
            </span>
            <p className="text-sm text-on-surface-variant">Drag and drop or click to upload</p>
            <p className="text-xs text-outline mt-1">Recommended: 1600×900px JPG or PNG</p>
          </>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
    </div>
  );
}
