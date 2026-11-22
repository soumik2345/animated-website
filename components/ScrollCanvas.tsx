'use client';

import React, { useEffect, useRef, useState } from 'react';
import { MoveDown } from 'lucide-react';

const TOTAL_FRAMES = 300;

const getFramePath = (index: number) => {
  const clamped = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(index)));
  const padded = String(clamped).padStart(3, '0');
  return `/frames/ezgif-frame-${padded}.jpg`;
};

// Calculate opacity and transform for story texts along the scroll timeline
function getTextAnimation(progress: number, start: number, peakStart: number, peakEnd: number, end: number) {
  if (progress < start || progress > end) {
    return {
      opacity: 0,
      transform: progress < start ? 'translate3d(0, 14px, 0)' : 'translate3d(0, -14px, 0)',
      pointerEvents: 'none' as const,
      visibility: 'hidden' as const,
    };
  }

  let opacity = 1;
  let translateY = 0;

  if (progress < peakStart) {
    const ratio = (progress - start) / (peakStart - start);
    opacity = ratio;
    translateY = 14 * (1 - ratio);
  } else if (progress > peakEnd) {
    const ratio = (end - progress) / (end - peakEnd);
    opacity = Math.max(0, ratio);
    translateY = -14 * (1 - ratio);
  }

  return {
    opacity,
    transform: `translate3d(0, ${Math.round(translateY)}px, 0)`,
    pointerEvents: (opacity > 0.4 ? 'auto' : 'none') as 'auto' | 'none',
    visibility: (opacity > 0.01 ? 'visible' : 'hidden') as 'visible' | 'hidden',
    transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
  };
}

export default function ScrollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);

  // Frame references
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES + 1).fill(null));
  const isLoadedRef = useRef<boolean[]>(new Array(TOTAL_FRAMES + 1).fill(false));
  const lastDrawnFrameRef = useRef<number>(-1);

  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // High quality smoothing without subpixel blur
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Nearest loaded frame lookup
    const getBestFrame = (target: number): HTMLImageElement | null => {
      if (isLoadedRef.current[target] && imagesRef.current[target]) {
        return imagesRef.current[target];
      }
      for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
        const left = target - offset;
        if (left >= 1 && isLoadedRef.current[left] && imagesRef.current[left]) {
          return imagesRef.current[left];
        }
        const right = target + offset;
        if (right <= TOTAL_FRAMES && isLoadedRef.current[right] && imagesRef.current[right]) {
          return imagesRef.current[right];
        }
      }
      return null;
    };

    // Draw frame: 100% FULLSCREEN COVER on both mobile and desktop (NO black gaps anywhere)
    const render = (frameIdx: number) => {
      const target = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(frameIdx)));

      // Avoid unnecessary duplicate redraws
      if (target === lastDrawnFrameRef.current) return;

      const img = getBestFrame(target);
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      if (cw === 0 || ch === 0) return;

      // Full cover aspect ratio: fills the entire viewport edge-to-edge
      const hRatio = cw / img.naturalWidth;
      const vRatio = ch / img.naturalHeight;
      const ratio = Math.max(hRatio, vRatio);

      // Exact integer rounding stops any moiré / wavy shimmer completely
      const renderW = Math.round(img.naturalWidth * ratio);
      const renderH = Math.round(img.naturalHeight * ratio);
      const offsetX = Math.round((cw - renderW) / 2);
      const offsetY = Math.round((ch - renderH) / 2);

      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
      lastDrawnFrameRef.current = target;
    };

    let lastW = 0;
    let lastH = 0;

    // Resize canvas to full viewport with device pixel ratio
    const handleResize = () => {
      const newW = window.innerWidth;
      const newH = window.innerHeight;

      if (newW === lastW && Math.abs(newH - lastH) < 80) return;
      lastW = newW;
      lastH = newH;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(newW * dpr);
      canvas.height = Math.round(newH * dpr);
      canvas.style.width = `${newW}px`;
      canvas.style.height = `${newH}px`;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      lastDrawnFrameRef.current = -1;
      render(Math.round(currentFrameRef.current));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Smooth lerp loop
    const tick = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      const ease = 0.15;

      if (Math.abs(diff) > 0.005) {
        currentFrameRef.current += diff * ease;
        render(currentFrameRef.current);
        requestAnimationFrame(tick);
      } else {
        currentFrameRef.current = targetFrameRef.current;
        render(currentFrameRef.current);
        isAnimatingRef.current = false;
      }
    };

    const startAnimation = () => {
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        requestAnimationFrame(tick);
      }
    };

    // Scroll listener
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));

      setScrollProgress(progress);
      targetFrameRef.current = 1 + progress * (TOTAL_FRAMES - 1);
      startAnimation();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Preload sequence
    const loadSingleFrame = (idx: number) => {
      if (imagesRef.current[idx]) return;
      const img = new Image();
      img.src = getFramePath(idx);
      img.onload = () => {
        imagesRef.current[idx] = img;
        isLoadedRef.current[idx] = true;
        if (Math.abs(Math.round(currentFrameRef.current) - idx) <= 1) {
          lastDrawnFrameRef.current = -1;
          render(currentFrameRef.current);
        }
      };
    };

    // Immediately load frame 1 and render
    const frame1 = new Image();
    frame1.src = getFramePath(1);
    frame1.onload = () => {
      imagesRef.current[1] = frame1;
      isLoadedRef.current[1] = true;
      lastDrawnFrameRef.current = -1;
      render(1);

      // Preload all frames in background
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        loadSingleFrame(i);
      }
    };

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="spatial-experience" ref={containerRef} className="relative w-full h-[480vh] sm:h-[540vh] bg-background">
      {/* Sticky Fullscreen Canvas Viewport (100dvh full viewport, ZERO black bars) */}
      <div className="sticky top-0 w-full h-[100dvh] sm:h-screen overflow-hidden bg-background">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          style={{ width: '100%', height: '100%', display: 'block' }}
        />

        {/* Narrative Texts Layer: 100% Transparent, ZERO Boxes, Pure Clean Text */}
        <div className="absolute inset-0 px-6 sm:px-14 md:px-20 flex items-center pointer-events-none">

          {/* Text 1: LEFT-ALIGNED (0.00 to 0.22) */}
          <div
            style={getTextAnimation(scrollProgress, 0.0, 0.0, 0.16, 0.22)}
            className="absolute left-6 right-6 sm:right-auto sm:left-14 md:left-20 sm:max-w-xl text-left bg-transparent border-0 p-0 shadow-none"
          >
            <div className="text-[10px] sm:text-xs font-mono tracking-widest text-accent uppercase mb-2 [text-shadow:_0_2px_10px_rgba(0,0,0,1)]">
              Atelier Verve // Private Estates
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white mb-3 leading-[1.1] [text-shadow:_0_3px_16px_rgba(0,0,0,1)]">
              Sculpted Light.<br />
              Monolithic Grace.
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-neutral-100 font-light leading-relaxed mb-4 max-w-md [text-shadow:_0_2px_12px_rgba(0,0,0,1)]">
              A private vertical estate composed of raw stone, low-iron structural glazing, and cantilevered living pavilions.
            </p>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-200 [text-shadow:_0_2px_8px_rgba(0,0,0,1)]">
              <MoveDown className="w-3.5 h-3.5 text-accent animate-bounce" />
              <span>SCROLL DOWN TO EXPLORE</span>
            </div>
          </div>

          {/* Text 2: RIGHT-ALIGNED on desktop, clean on mobile (0.25 to 0.48) */}
          <div
            style={getTextAnimation(scrollProgress, 0.25, 0.31, 0.42, 0.48)}
            className="absolute left-6 right-6 sm:left-auto sm:right-14 md:right-20 sm:max-w-xl text-left bg-transparent border-0 p-0 shadow-none"
          >
            <div className="text-[10px] sm:text-xs font-mono tracking-widest text-accent uppercase mb-2 [text-shadow:_0_2px_10px_rgba(0,0,0,1)]">
              Our Lineage // 18 Years of Mastery
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-white mb-3 leading-[1.12] [text-shadow:_0_3px_16px_rgba(0,0,0,1)]">
              Eighteen Years of Distinction.
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-neutral-100 font-light leading-relaxed mb-5 max-w-md [text-shadow:_0_2px_12px_rgba(0,0,0,1)]">
              With ateliers in London, Zurich, and Tokyo, Verve Atelier has completed 24 landmark residential towers globally.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-3 border-t border-white/30 text-center font-mono max-w-sm">
              <div>
                <span className="block text-2xl sm:text-3xl font-light text-white tabular-nums [text-shadow:_0_2px_10px_rgba(0,0,0,1)]">24</span>
                <span className="text-[9px] sm:text-[10px] text-neutral-300 uppercase mt-0.5 block [text-shadow:_0_2px_6px_rgba(0,0,0,1)]">Towers</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-light text-white tabular-nums [text-shadow:_0_2px_10px_rgba(0,0,0,1)]">18</span>
                <span className="text-[9px] sm:text-[10px] text-neutral-300 uppercase mt-0.5 block [text-shadow:_0_2px_6px_rgba(0,0,0,1)]">Awards</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-light text-white tabular-nums [text-shadow:_0_2px_10px_rgba(0,0,0,1)]">100%</span>
                <span className="text-[9px] sm:text-[10px] text-neutral-300 uppercase mt-0.5 block [text-shadow:_0_2px_6px_rgba(0,0,0,1)]">Bespoke</span>
              </div>
            </div>
          </div>

          {/* Text 3: LEFT-ALIGNED (0.50 to 0.73) */}
          <div
            style={getTextAnimation(scrollProgress, 0.50, 0.56, 0.67, 0.73)}
            className="absolute left-6 right-6 sm:right-auto sm:left-14 md:left-20 sm:max-w-xl text-left bg-transparent border-0 p-0 shadow-none"
          >
            <div className="text-[10px] sm:text-xs font-mono tracking-widest text-accent uppercase mb-2 [text-shadow:_0_2px_10px_rgba(0,0,0,1)]">
              Spatial Philosophy // Permanence
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-white mb-3 leading-[1.12] [text-shadow:_0_3px_16px_rgba(0,0,0,1)]">
              Generational Longevity.
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-neutral-100 font-light leading-relaxed mb-4 max-w-md [text-shadow:_0_2px_12px_rgba(0,0,0,1)]">
              True luxury is acoustic stillness, filtered natural airflow, and authentic stone. Powered by deep geothermal arrays.
            </p>
            <div className="space-y-1.5 text-xs font-mono text-neutral-200 [text-shadow:_0_2px_6px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 shadow-[0_0_8px_#c5a880]" />
                <span>Zero-Emission Geothermal Climate Loops</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 shadow-[0_0_8px_#c5a880]" />
                <span>Sub-Millimeter Acoustic Dampening (Rw 54 dB)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 shadow-[0_0_8px_#c5a880]" />
                <span>Saint-Gobain Low-Iron Museum Glass</span>
              </div>
            </div>
          </div>

          {/* Text 4: RIGHT-ALIGNED on desktop, clean on mobile (0.75 to 0.97) */}
          <div
            style={getTextAnimation(scrollProgress, 0.75, 0.81, 0.92, 0.97)}
            className="absolute left-6 right-6 sm:left-auto sm:right-14 md:right-20 sm:max-w-xl text-left bg-transparent border-0 p-0 shadow-none"
          >
            <div className="text-[10px] sm:text-xs font-mono tracking-widest text-accent uppercase mb-2 [text-shadow:_0_2px_10px_rgba(0,0,0,1)]">
              Private Advisory // Bespoke Services
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-tight text-white mb-3 leading-[1.12] [text-shadow:_0_3px_16px_rgba(0,0,0,1)]">
              Turnkey Stewardship.
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-neutral-100 font-light leading-relaxed mb-4 max-w-md [text-shadow:_0_2px_12px_rgba(0,0,0,1)]">
              Acquisitions are managed exclusively through private family office desks. Our in-house architectural team tailors internal configurations and private gallery lighting.
            </p>
            <div className="inline-flex items-center gap-2 pt-3 border-t border-white/30 text-xs font-mono text-neutral-200 [text-shadow:_0_2px_6px_rgba(0,0,0,1)]">
              <span className="text-accent uppercase tracking-wider">
                Explore Selected Residences Below
              </span>
              <MoveDown className="w-3.5 h-3.5 text-accent animate-bounce" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
