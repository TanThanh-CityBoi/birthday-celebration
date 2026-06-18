import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  rotation: number; rotationSpeed: number;
  scale: number; opacity: number;
  type: 'heart' | 'flower' | 'petal' | 'star';
  color: string; size: number;
  wobble: number; wobbleSpeed: number; wobbleOffset: number;
}

const COLORS = ['#f472b6','#ec4899','#db2777','#f9a8d4','#fb7185','#fda4af','#fbbf24','#c084fc','#ff6b9d','#ff8fab'];
const TYPES: Particle['type'][] = ['heart','flower','petal','star'];
const rand = (a: number, b: number) => Math.random() * (b - a) + a;

function makeParticle(w: number): Particle {
  const type = TYPES[Math.floor(Math.random() * TYPES.length)];
  return {
    x: rand(-50, w + 50), y: rand(-120, -20),
    vx: rand(-0.6, 0.6), vy: rand(0.8, 2.2),
    rotation: rand(0, 360), rotationSpeed: rand(-2, 2),
    scale: rand(0.5, 1.4), opacity: rand(0.6, 1.0), type,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    size: type === 'heart' ? rand(14, 28) : type === 'flower' ? rand(16, 30) : type === 'petal' ? rand(10, 22) : rand(12, 22),
    wobble: 0, wobbleSpeed: rand(0.02, 0.06), wobbleOffset: rand(0, Math.PI * 2),
  };
}

function drawHeart(ctx: CanvasRenderingContext2D, s: number, c: string) {
  const r = s / 2;
  ctx.fillStyle = c; ctx.beginPath();
  ctx.moveTo(0, r * 0.3);
  ctx.bezierCurveTo(0, -r * 0.3, -r, -r * 0.3, -r, r * 0.3);
  ctx.bezierCurveTo(-r, r * 0.9, 0, r * 1.3, 0, r * 1.5);
  ctx.bezierCurveTo(0, r * 1.3, r, r * 0.9, r, r * 0.3);
  ctx.bezierCurveTo(r, -r * 0.3, 0, -r * 0.3, 0, r * 0.3);
  ctx.fill();
}

function drawFlower(ctx: CanvasRenderingContext2D, s: number, c: string) {
  ctx.fillStyle = c;
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    ctx.beginPath();
    ctx.ellipse(Math.cos(a) * s * 0.4, Math.sin(a) * s * 0.4, s * 0.35, s * 0.22, a, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath(); ctx.arc(0, 0, s * 0.22, 0, Math.PI * 2); ctx.fill();
}

function drawPetal(ctx: CanvasRenderingContext2D, s: number, c: string) {
  ctx.fillStyle = c;
  ctx.beginPath(); ctx.ellipse(0, 0, s * 0.3, s * 0.6, 0, 0, Math.PI * 2); ctx.fill();
}

function drawStar(ctx: CanvasRenderingContext2D, s: number, c: string) {
  ctx.fillStyle = c; ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = (i * Math.PI) / 5 - Math.PI / 2;
    const r = i % 2 === 0 ? s * 0.55 : s * 0.22;
    if (i === 0) ctx.moveTo(Math.cos(a) * r, Math.sin(a) * r);
    else ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  ctx.closePath(); ctx.fill();
}

export default function ParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const frame = useRef(0);
  const lastSpawn = useRef(0);

  const init = useCallback((w: number) => {
    particles.current = Array.from({ length: 35 }, () => {
      const p = makeParticle(w);
      p.y = Math.random() * window.innerHeight;
      return p;
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    init(canvas.width);

    let t = 0;
    const loop = (ts: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t++;

      if (ts - lastSpawn.current > 320 && particles.current.length < 65) {
        particles.current.push(makeParticle(canvas.width));
        lastSpawn.current = ts;
      }

      particles.current = particles.current.filter(p => p.y < canvas.height + 80);

      for (const p of particles.current) {
        p.wobble = Math.sin(t * p.wobbleSpeed + p.wobbleOffset) * 1.2;
        p.x += p.vx + p.wobble;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.scale(p.scale, p.scale);

        if (p.type === 'heart') drawHeart(ctx, p.size, p.color);
        else if (p.type === 'flower') drawFlower(ctx, p.size, p.color);
        else if (p.type === 'petal') drawPetal(ctx, p.size, p.color);
        else drawStar(ctx, p.size, p.color);

        ctx.restore();
      }

      frame.current = requestAnimationFrame(loop);
    };

    frame.current = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(frame.current); window.removeEventListener('resize', resize); };
  }, [init]);

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
}
