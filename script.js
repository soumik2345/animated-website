(() => {
  const canvas = document.getElementById('animation-canvas');
  const ctx = canvas.getContext('2d');

  const FRAME_COUNT = 300;
  const FOLDER = 'Building_and_flat_video_generation_341254f2_1080p-jpg-frames';

  const getFramePath = (index) => {
    const padded = String(index).padStart(3, '0');
    return `${FOLDER}/ezgif-frame-${padded}.jpg`;
  };

  // Cache and state
  const images = new Array(FRAME_COUNT + 1);
  const isLoaded = new Array(FRAME_COUNT + 1).fill(false);
  let loadedCount = 0;

  let currentFrame = 1;
  let targetFrame = 1;
  let isAnimating = false;
  let lastDrawnFrame = -1;

  // Handle Retina displays and window resizing
  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    renderFrame(Math.round(currentFrame));
  }

  window.addEventListener('resize', resizeCanvas);

  // Find the closest loaded frame to avoid any blank flashes
  function getBestAvailableFrame(index) {
    const target = Math.max(1, Math.min(FRAME_COUNT, Math.round(index)));
    if (isLoaded[target] && images[target]) {
      return images[target];
    }

    for (let offset = 1; offset < FRAME_COUNT; offset++) {
      const left = target - offset;
      if (left >= 1 && isLoaded[left] && images[left]) {
        return images[left];
      }
      const right = target + offset;
      if (right <= FRAME_COUNT && isLoaded[right] && images[right]) {
        return images[right];
      }
    }

    return null;
  }

  // Draw frame with 'cover' aspect ratio
  function renderFrame(frameIndex) {
    const img = getBestAvailableFrame(frameIndex);
    if (!img) return;

    const cw = canvas.width;
    const ch = canvas.height;

    const hRatio = cw / img.naturalWidth;
    const vRatio = ch / img.naturalHeight;
    const ratio = Math.max(hRatio, vRatio);

    const renderW = img.naturalWidth * ratio;
    const renderH = img.naturalHeight * ratio;
    const offsetX = (cw - renderW) / 2;
    const offsetY = (ch - renderH) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

    // Subtle 2px progress bar on canvas while loading all frames
    if (loadedCount < FRAME_COUNT) {
      const progress = loadedCount / FRAME_COUNT;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.fillRect(0, 0, cw * progress, 3 * (window.devicePixelRatio || 1));
    }

    lastDrawnFrame = frameIndex;
  }

  // Smooth lerp loop
  function tick() {
    const ease = 0.12;
    const diff = targetFrame - currentFrame;

    if (Math.abs(diff) > 0.005) {
      currentFrame += diff * ease;
      renderFrame(currentFrame);
      requestAnimationFrame(tick);
    } else {
      currentFrame = targetFrame;
      renderFrame(currentFrame);
      isAnimating = false;
    }
  }

  function startAnimationLoop() {
    if (!isAnimating) {
      isAnimating = true;
      requestAnimationFrame(tick);
    }
  }

  // Scroll handler
  function onScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

    if (maxScroll <= 0) return;

    const scrollFraction = Math.max(0, Math.min(1, scrollY / maxScroll));
    targetFrame = 1 + scrollFraction * (FRAME_COUNT - 1);

    startAnimationLoop();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Preloading system
  function preloadImages() {
    // 1. Prioritize frame 1
    const frame1 = new Image();
    frame1.src = getFramePath(1);
    frame1.onload = () => {
      images[1] = frame1;
      isLoaded[1] = true;
      loadedCount++;
      resizeCanvas();
      startAnimationLoop();
    };

    // 2. Queue remaining frames concurrently
    const queue = [];
    for (let i = 2; i <= FRAME_COUNT; i++) {
      queue.push(i);
    }

    const CONCURRENCY = 8;
    let nextIdx = 0;

    function loadNext() {
      if (nextIdx >= queue.length) return;

      const frameNumber = queue[nextIdx++];
      const img = new Image();
      img.src = getFramePath(frameNumber);

      img.onload = () => {
        images[frameNumber] = img;
        isLoaded[frameNumber] = true;
        loadedCount++;

        // If this newly loaded frame matches what's needed right now, re-render
        if (Math.abs(Math.round(currentFrame) - frameNumber) <= 1) {
          renderFrame(currentFrame);
        }

        loadNext();
      };

      img.onerror = () => {
        loadNext();
      };
    }

    for (let c = 0; c < CONCURRENCY; c++) {
      loadNext();
    }
  }

  // Initialize
  resizeCanvas();
  preloadImages();
  onScroll();
})();
