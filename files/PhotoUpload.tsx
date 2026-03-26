"use client";

import { useRef, useState, useCallback } from "react";

export interface PhotoFile {
  id: string;
  file: File;
  preview: string;
  name: string;
  size: number;
}

interface PhotoUploadProps {
  photos: PhotoFile[];
  onChange: (photos: PhotoFile[]) => void;
  maxPhotos?: number;
}

const MAX_SIZE_MB = 5;

export default function PhotoUpload({ photos, onChange, maxPhotos = 3 }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFiles = useCallback(
    (files: FileList | File[]) => {
      setError(null);
      const arr = Array.from(files);
      const remaining = maxPhotos - photos.length;
      if (remaining <= 0) {
        setError(`Maximum ${maxPhotos} photos autorisées.`);
        return;
      }
      const accepted: PhotoFile[] = [];
      for (const file of arr.slice(0, remaining)) {
        if (!file.type.startsWith("image/")) {
          setError("Seules les images sont acceptées (JPG, PNG, WEBP).");
          continue;
        }
        if (file.size > MAX_SIZE_MB * 1024 * 1024) {
          setError(`Chaque photo doit faire moins de ${MAX_SIZE_MB} Mo.`);
          continue;
        }
        accepted.push({
          id: `${Date.now()}-${Math.random()}`,
          file,
          preview: URL.createObjectURL(file),
          name: file.name,
          size: file.size,
        });
      }
      if (accepted.length) onChange([...photos, ...accepted]);
    },
    [photos, onChange, maxPhotos]
  );

  const removePhoto = (id: string) => {
    const updated = photos.filter((p) => p.id !== id);
    URL.revokeObjectURL(photos.find((p) => p.id === id)?.preview ?? "");
    onChange(updated);
    setError(null);
  };

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );

  const movePhoto = (from: number, to: number) => {
    const next = [...photos];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onChange(next);
  };

  const slots = Array.from({ length: maxPhotos });

  return (
    <div className="space-y-4">
      {/* Slots visuels */}
      <div className="grid grid-cols-3 gap-3">
        {slots.map((_, i) => {
          const photo = photos[i];
          return (
            <div
              key={i}
              className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                photo
                  ? "border-emerald-400 shadow-md"
                  : i === photos.length
                  ? "border-dashed border-emerald-400 bg-emerald-50 cursor-pointer hover:bg-emerald-100"
                  : "border-dashed border-zinc-200 bg-zinc-50"
              }`}
              onClick={() => !photo && i === photos.length && inputRef.current?.click()}
            >
              {photo ? (
                <>
                  <img
                    src={photo.preview}
                    alt={photo.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay controls */}
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors group flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); removePhoto(photo.id); }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm shadow-lg hover:bg-red-600"
                      title="Supprimer"
                    >
                      ✕
                    </button>
                    {i > 0 && (
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); movePhoto(i, i - 1); }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 bg-white/90 text-zinc-700 rounded-full flex items-center justify-center text-sm shadow-lg hover:bg-white"
                        title="Déplacer à gauche"
                      >
                        ←
                      </button>
                    )}
                    {i < photos.length - 1 && (
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); movePhoto(i, i + 1); }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 bg-white/90 text-zinc-700 rounded-full flex items-center justify-center text-sm shadow-lg hover:bg-white"
                        title="Déplacer à droite"
                      >
                        →
                      </button>
                    )}
                  </div>
                  {/* Badge photo principale */}
                  {i === 0 && (
                    <div className="absolute top-2 left-2 bg-emerald-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                      Photo principale
                    </div>
                  )}
                  {/* Numéro */}
                  <div className="absolute bottom-2 right-2 w-5 h-5 bg-black/50 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full gap-1 select-none pointer-events-none">
                  {i === photos.length ? (
                    <>
                      <span className="text-2xl">📷</span>
                      <span className="text-xs font-semibold text-emerald-600">
                        {i === 0 ? "Ajouter photo" : "Ajouter"}
                      </span>
                      <span className="text-[10px] text-zinc-400">JPG / PNG / WEBP</span>
                    </>
                  ) : (
                    <span className="text-xl text-zinc-300">+</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Zone drag & drop */}
      {photos.length < maxPhotos && (
        <div
          className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer ${
            dragging
              ? "border-emerald-500 bg-emerald-50 scale-[1.01]"
              : "border-zinc-300 bg-zinc-50 hover:border-emerald-400 hover:bg-emerald-50/50"
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-3xl">{dragging ? "⬇️" : "🖼️"}</span>
            <p className="text-sm font-semibold text-zinc-700">
              {dragging ? "Relâchez pour ajouter" : "Glissez vos photos ici"}
            </p>
            <p className="text-xs text-zinc-400">
              ou <span className="text-emerald-600 font-semibold underline">cliquez pour parcourir</span> — max {MAX_SIZE_MB} Mo/photo · {maxPhotos - photos.length} emplacement{maxPhotos - photos.length > 1 ? "s" : ""} disponible{maxPhotos - photos.length > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      )}

      {/* Input caché */}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={(e) => e.target.files && processFiles(e.target.files)}
      />

      {/* Erreur */}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <span>⚠️</span> {error}
        </p>
      )}

      {/* Compteur */}
      <p className="text-xs text-zinc-400 text-right">
        {photos.length}/{maxPhotos} photo{photos.length > 1 ? "s" : ""}
      </p>
    </div>
  );
}
