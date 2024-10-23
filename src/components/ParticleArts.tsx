import React, { useRef, useEffect } from 'react';

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  radius: number;
  hue: number;
  color: string;

  constructor(centerX: number, centerY: number, radius: number) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * radius;

    this.x = centerX + Math.cos(angle) * distance;
    this.y = centerY + Math.sin(angle) * distance;
    this.vx = (Math.random() * 2 - 1) * 2;
    this.vy = (Math.random() * 2 - 1) * 1.5;
    this.ax = 0;
    this.ay = 0;
    this.radius = Math.random() * 2 + 1;
    this.hue = Math.random() * 240 + 180;
    this.color = `hsl(${this.hue}, 100%, 70%)`;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.restore();
  }

  update(centerX: number, centerY: number, radius: number, mouseX: number, mouseY: number) {
    const dx = centerX - this.x;
    const dy = centerY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const gravity = 0.0005;
    const randomness = Math.random() * 0.2 - 0.1;
    this.ax = dx * gravity + randomness;
    this.ay = dy * gravity + randomness;

    this.vx += this.ax;
    this.vy += this.ay;

    this.x += this.vx + randomness;
    this.y += this.vy + randomness;

    if (distance > radius) {
      this.vx *= -0.9 + randomness * 2;
      this.vy *= -0.9 + randomness * 2;
    }

    this.hue += Math.random() * 0.2;
    if (this.hue >= 240) this.hue = 180;
    this.color = `hsl(${this.hue}, 100%, 70%)`;

    const dxCursor = this.x - mouseX;
    const dyCursor = this.y - mouseY;
    const distanceToCursor = Math.sqrt(dxCursor * dxCursor + dyCursor * dyCursor);

    if (distanceToCursor < 100) {
      const force = 100 / distanceToCursor;
      this.x += dxCursor * 0.05 * force;
      this.y += dyCursor * 0.05 * force;
    }
  }
}

class Connection {
  p1: Particle;
  p2: Particle;
  style: string;

  constructor(p1: Particle, p2: Particle) {
    this.p1 = p1;
    this.p2 = p2;

    const rand = Math.random();
    if (rand < 0.25) {
      this.style = 'white';
    } else if (rand < 0.5) {
      this.style = 'blue';
    } else if (rand < 0.75) {
      this.style = 'gradient';
    } else {
      this.style = 'anotherBlue';
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.style === 'white') {
      ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
    } else if (this.style === 'blue') {
      ctx.strokeStyle = 'rgba(0, 150, 255, 1)';
    } else if (this.style === 'anotherBlue') {
      ctx.strokeStyle = 'rgba(0, 100, 200, 1)';
    } else {
      const gradient = ctx.createLinearGradient(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
      gradient.addColorStop(0, 'rgba(0, 150, 255, 1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 1)'); 
      ctx.strokeStyle = gradient;
    }

    // Adding randomness to the connection lines
    const midX = (this.p1.x + this.p2.x) / 2 + (Math.random() * 50 - 25);
    const midY = (this.p1.y + this.p2.y) / 2 + (Math.random() * 50 - 25);

    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.quadraticCurveTo(midX, midY, this.p2.x, this.p2.y);
    ctx.lineWidth = Math.random() * 2 + 0.5;
    ctx.stroke();
  }
}

interface ParticleArtsProps {
  particleCount?: number;
  connectionCount?: number;
  interactionRadius?: number;
  edgeDelay?: number;
  style?: React.CSSProperties;
}

const ParticleArts: React.FC<ParticleArtsProps> = ({
  particleCount = 200,
  connectionCount = 100,
  style = {},
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) {
      console.error("Canvas or container is not available.");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Failed to get canvas context.");
      return;
    }

    const setCanvasSize = () => {
      if (container) {
        const { width, height } = container.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
      }
    };

    setCanvasSize();

    const resizeObserver = new ResizeObserver(() => {
      setCanvasSize();
    });

    resizeObserver.observe(container);

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = event.clientX - rect.left;
      mouseRef.current.y = event.clientY - rect.top;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const particles: Particle[] = [];
    const connections: Connection[] = [];

    const initializeParticles = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) / 3;

      particles.length = 0;
      connections.length = 0;

      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(centerX, centerY, radius));
      }

      for (let i = 0; i < connectionCount; i++) {
        const p1 = particles[Math.floor(Math.random() * particles.length)];
        const p2 = particles[Math.floor(Math.random() * particles.length)];
        if (p1 !== p2) {
          connections.push(new Connection(p1, p2));
        }
      }
    };

    initializeParticles();

    let animationFrameId: number;

    const animate = () => {
      if (!ctx) return;

      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) / 3;

      particles.forEach((particle) => {
        particle.update(centerX, centerY, radius, mouseRef.current.x, mouseRef.current.y);
        particle.draw(ctx);
      });

      connections.forEach((connection) => connection.draw(ctx));

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
    };
  }, [particleCount, connectionCount]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
};

export default ParticleArts;
