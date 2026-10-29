import confetti from 'canvas-confetti';

/**
 * Multi-stage celebration fireworks using canvas-confetti
 */
export function fireGrandCelebration() {
  const duration = 4.5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 35, spread: 360, ticks: 70, zIndex: 100 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  // Initial energetic center burst
  confetti({
    particleCount: 120,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#ff4081', '#ff8fab', '#ffd166', '#06d6a0', '#118ab2', '#a06cd5'],
  });

  // Dual side cannons loop
  const interval: ReturnType<typeof setInterval> = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 45 * (timeLeft / duration);

    // Left cannon
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.25), y: Math.random() - 0.2 },
      colors: ['#ff007f', '#ff70a6', '#ffd670', '#e9ff70', '#70d6ff'],
    });

    // Right cannon
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.75, 0.9), y: Math.random() - 0.2 },
      colors: ['#ff5400', '#ff0054', '#9e0059', '#ffbd00', '#390099'],
    });
  }, 250);

  // Star bursts
  setTimeout(() => {
    confetti({
      particleCount: 40,
      spread: 60,
      shapes: ['star'],
      scalar: 1.2,
      origin: { y: 0.5 },
      colors: ['#FFE600', '#FFB703', '#FFFFFF'],
    });
  }, 400);
}

/**
 * Localized burst when popping a balloon
 */
export function fireBalloonPopConfetti(clientX: number, clientY: number, colorHue: number) {
  const x = clientX / window.innerWidth;
  const y = clientY / window.innerHeight;

  confetti({
    particleCount: 28,
    spread: 70,
    startVelocity: 18,
    ticks: 45,
    origin: { x, y },
    colors: [
      `hsl(${colorHue}, 100%, 60%)`,
      `hsl(${(colorHue + 30) % 360}, 90%, 65%)`,
      '#ffffff',
      '#ffe066',
    ],
  });
}

/**
 * Gentle golden sparkles for candle blown out or gifts
 */
export function fireWishSparkles() {
  confetti({
    particleCount: 50,
    spread: 80,
    startVelocity: 22,
    origin: { y: 0.45 },
    colors: ['#ffd166', '#ffb703', '#fff3b0', '#ffffff'],
    shapes: ['star', 'circle'],
    scalar: 0.9,
  });
}
