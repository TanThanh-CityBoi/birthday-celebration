import { useEffect, useRef } from 'react';

interface Rocket {
  x: number; y: number; vy: number;
  color: string; trail: { x: number; y: number }[];
}

interface Spark {
  x: number; y: number; vx: number; vy: number;
  life: number; maxLife: number; color: string; size: number;
}

const FW_COLORS = ['#f472b6','#ec4899','#fbbf24','#c084fc','#fb7185','#ffffff','#f9a8d4','#a78bfa','#34d399','#60a5fa'];
const rand = (a: number, b: number) => Math.random() * (b - a) + a;

function explode(x: number, y: number, sparks: Spark[]) {
  const color = FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)];
  const color2 = FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)];
  const count = Math.floor(rand(70, 120));
  for (let i = 0; i < count; i++) {
    const a = rand(0, Math.PI * 2);
    const speed = rand(1.5, 7);
    sparks.push({
      x, y,
      vx: Math.cos(a) * speed,
      vy: Math.sin(a) * speed,
      life: rand(50, 100), maxLife: rand(50, 100),
      color: i % 3 === 0 ? color2 : color,
      size: rand(2, 4.5),
    });
  }
}

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rockets = useRef<Rocket[]>([]);
  const sparks = useRef<Spark[]>([]);
  const frame = useRef(0);
  const nextLaunch = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const loop = () => {
      ctx.fillStyle = 'rgba(253,226,242,0.16)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      if (now > nextLaunch.current && rockets.current.length < 4) {
        rockets.current.push({
          x: rand(canvas.width * 0.15, canvas.width * 0.85),
          y: canvas.height + 10,
          vy: rand(-14, -9),
          color: FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)],
          trail: [],
        });
        nextLaunch.current = now + rand(600, 1600);
      }

      rockets.current = rockets.current.filter(r => {
        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 14) r.trail.shift();
        r.y += r.vy;
        r.vy += 0.25;

        for (let i = 0; i < r.trail.length; i++) {
          const ratio = i / r.trail.length;
          ctx.beginPath();
          ctx.arc(r.trail[i].x, r.trail[i].y, 2.5 * ratio, 0, Math.PI * 2);
          ctx.fillStyle = r.color;
          ctx.globalAlpha = ratio * 0.8;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
        ctx.beginPath();
        ctx.arc(r.x, r.y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        if (r.vy >= 0) {
          explode(r.x, r.y, sparks.current);
          return false;
        }
        return true;
      });

      sparks.current = sparks.current.filter(s => {
        s.x += s.vx; s.y += s.vy;
        s.vy += 0.09; s.vx *= 0.98;
        s.life -= 1;
        const ratio = s.life / s.maxLife;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * ratio, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = ratio;
        ctx.fill();
        ctx.globalAlpha = 1;
        return s.life > 0;
      });

      frame.current = requestAnimationFrame(loop);
    };

    frame.current = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(frame.current); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-canvas"
      style={{ zIndex: 2 }}
      aria-hidden="true"
    />
  );
}
