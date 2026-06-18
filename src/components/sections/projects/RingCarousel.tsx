'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface RingCarouselProps {
  items: Array<{
    id: string;
    image: string;
    title: string;
  }>;
}

const AUTO_ROTATE_SPEED = 0.006;
const DRAG_THRESHOLD = 6;

function getCardSize() {
  if (typeof window === 'undefined') return { w: 480, h: 270 };
  const vw = window.innerWidth;
  const w = Math.min(Math.max(vw * 0.32, 280), 520);
  const h = Math.round(w * (9 / 16));
  return { w, h };
}

export default function RingCarousel({ items }: RingCarouselProps) {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [cardSize, setCardSize] = useState({ w: 480, h: 270 });
  const [zoomedId, setZoomedId] = useState<string | null>(null);
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set());

  const rotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoverRef = useRef(false);
  const startXRef = useRef(0);
  const startRotRef = useRef(0);
  const hasDraggedRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => setCardSize(getCardSize());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Slide-fade-up: stagger tiap card saat mount
  useEffect(() => {
    if (items.length === 0) return;
    items.forEach((item, i) => {
      const delay = 80 + i * 60;
      const timer = setTimeout(() => {
        setVisibleCards(prev => new Set(prev).add(item.id));
      }, delay);
      return () => clearTimeout(timer);
    });
  }, [items]);

  const N = Math.max(items.length, 3);
  const angle = 360 / N;
  const GAP = Math.round(cardSize.w * 0.08);
  const radius = Math.round(
    (cardSize.w / 2 + GAP) / Math.tan((angle * Math.PI) / 180 / 2)
  );

  const tick = useCallback((time: number) => {
    if (lastTimeRef.current === null) lastTimeRef.current = time;
    const delta = time - lastTimeRef.current;
    lastTimeRef.current = time;

    if (!isDraggingRef.current && !isHoverRef.current) {
      rotationRef.current += AUTO_ROTATE_SPEED * delta;
    }

    setRotation(rotationRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);

  const handleSceneMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.clientX;
    startRotRef.current = rotationRef.current;
  };

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const delta = e.clientX - startXRef.current;
      if (Math.abs(delta) > DRAG_THRESHOLD) {
        hasDraggedRef.current = true;
        setIsDragging(true);
      }
      if (hasDraggedRef.current) {
        rotationRef.current = startRotRef.current - delta * 0.3;
      }
    };
    const up = () => {
      isDraggingRef.current = false;
      setTimeout(() => {
        hasDraggedRef.current = false;
        setIsDragging(false);
      }, 10);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true;
    hasDraggedRef.current = false;
    startXRef.current = e.touches[0].clientX;
    startRotRef.current = rotationRef.current;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return;
    const delta = e.touches[0].clientX - startXRef.current;
    if (Math.abs(delta) > DRAG_THRESHOLD) hasDraggedRef.current = true;
    if (hasDraggedRef.current) {
      rotationRef.current = startRotRef.current - delta * 0.3;
    }
  };
  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    setTimeout(() => {
      hasDraggedRef.current = false;
      setIsDragging(false);
    }, 10);
  };

  const handleCardClick = (id: string) => {
    if (hasDraggedRef.current) return;
    setZoomedId(prev => (prev === id ? null : id));
  };

  const handleZoomClose = () => setZoomedId(null);

  useEffect(() => {
    if (!zoomedId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Hanya consume event kalau zoom sedang terbuka —
        // stop propagation supaya ProjectOverlay tidak ikut close
        e.stopImmediatePropagation();
        setZoomedId(null);
      }
    };
    // capture: true agar handler ini jalan lebih dulu dari listener lain
    window.addEventListener('keydown', onKey, { capture: true });
    return () => window.removeEventListener('keydown', onKey, { capture: true });
  }, [zoomedId]);

  const zoomedItem = items.find(item => item.id === zoomedId);

  return (
    <>
      <div
        style={{
          width: '100%',
          maxWidth: '100vw',
          padding: '1rem',
          display: 'grid',
          placeItems: 'center',
          perspective: '2400px',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)',
          maskImage:
            'linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)',
          cursor: isDragging ? 'grabbing' : 'default',
          overflow: 'hidden',
          userSelect: 'none',
        }}
        onMouseDown={handleSceneMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          style={{
            position: 'relative',
            width: cardSize.w,
            height: cardSize.h,
            transformStyle: 'preserve-3d',
            transform: `rotateY(${rotation}deg)`,
            transition: 'none',
            pointerEvents: 'none',
          }}
        >
          {items.map((item, i) => {
            const isVisible = visibleCards.has(item.id);
            return (
              <div
                key={item.id}
                style={{
                  position: 'absolute',
                  top: 0, left: 0,
                  width: '100%', height: '100%',
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${i * angle}deg)`,
                  pointerEvents: 'none',
                }}
              >
                <div
                  onClick={() => handleCardClick(item.id)}
                  onMouseEnter={() => { isHoverRef.current = true; }}
                  onMouseLeave={() => { isHoverRef.current = false; }}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: 16,
                    overflow: 'hidden',
                    boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
                    transform: `translateZ(-${radius}px) translateY(${isVisible ? 0 : 18}px)`,
                    opacity: isVisible ? 1 : 0,
                    transition: 'opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
                    backfaceVisibility: 'hidden',
                    willChange: 'transform, opacity',
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover', pointerEvents: 'none' }}
                    draggable={false}
                    sizes={`${cardSize.w}px`}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 100%)',
                    padding: '1.5rem 1rem 0.75rem',
                  }}>
                    <p style={{
                      color: '#fff',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      margin: 0,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {zoomedItem && (
        <div
          onClick={handleZoomClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              width: 'min(80vw, 960px)',
              aspectRatio: '16 / 9',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
              animation: 'zoomIn 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <Image
              src={zoomedItem.image}
              alt={zoomedItem.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="80vw"
              priority
            />
            <div style={{
              position: 'absolute',
              bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
              padding: '2rem 1.5rem 1rem',
            }}>
              <p style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, margin: 0 }}>
                {zoomedItem.title}
              </p>
            </div>
            <button
              onClick={handleZoomClose}
              style={{
                position: 'absolute',
                top: '0.75rem', right: '0.75rem',
                width: '2.25rem', height: '2.25rem',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(6px)',
                color: '#fff',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✕
            </button>
          </div>

          <style>{`
            @keyframes fadeIn {
              from { opacity: 0; } to { opacity: 1; }
            }
            @keyframes zoomIn {
              from { transform: scale(0.88); opacity: 0; }
              to   { transform: scale(1);    opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </>
  );
}