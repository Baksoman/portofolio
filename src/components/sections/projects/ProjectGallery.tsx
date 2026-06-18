'use client';

import { useState, useEffect } from 'react';
import RingCarousel from './RingCarousel';

interface ProjectGalleryProps {
  folderUrl: string;
  projectTitle: string;
  fileName?: string[];
  maxImages?: number;
}

export default function ProjectGallery({ folderUrl, projectTitle, fileName, maxImages = 20 }: ProjectGalleryProps) {
  const [items, setItems] = useState<Array<{ id: string; image: string; title: string }>>([]);

  useEffect(() => {
    const loadImages = async () => {
      // Jika ada fileName array, pakai itu
      if (fileName && fileName.length > 0) {
        const validImages = [];
        for (let i = 0; i < fileName.length; i++) {
          const imagePath = `${folderUrl}/${fileName[i]}`;
          try {
            const response = await fetch(imagePath, { method: 'HEAD' });
            if (response.ok) {
              validImages.push({
                id: `${projectTitle}-${i}`,
                image: imagePath,
                title: `${projectTitle} - ${fileName[i]}`,
              });
            }
          } catch {
            // Skip jika file tidak ada
          }
        }
        setItems(validImages.length >= 3 ? validImages : validImages.concat(Array(3 - validImages.length).fill(validImages[0] || { id: 'placeholder', image: '', title: '' })));
        return;
      }

      // Fallback ke iterasi numerik (backward compatible)
      const validImages = [];
      for (let i = 1; i <= maxImages; i++) {
        const imagePath = `${folderUrl}/${i}.webp`;
        try {
          const response = await fetch(imagePath, { method: 'HEAD' });
          if (response.ok) {
            validImages.push({
              id: `${projectTitle}-${i}`,
              image: imagePath,
              title: ``,
            });
          } else {
            break;
          }
        } catch {
          break;
        }
      }
      setItems(validImages.length >= 3 ? validImages : validImages.concat(Array(3 - validImages.length).fill(validImages[0] || { id: 'placeholder', image: '', })));
    };

    loadImages();
  }, [folderUrl, projectTitle, fileName, maxImages]);

  if (items.length === 0) return <div className="flex items-center justify-center h-96">Loading...</div>;

  return <RingCarousel items={items} />;
}
