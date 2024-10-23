import React, { useRef, useEffect, useState } from 'react';

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
    this.vx = (Math.random() * 2 - 1) * 1.5;
    this.vy = (Math.random() * 2 - 1) * 1.5;
    this.ax = 0;
    this.ay = 0;
    this.radius = Math.random() * 2 + 1;
    this.hue = Math.random() * 240 + 180; // Blue spectrum (180-240)
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

    const gravity = 0.002;
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
      this.x += dxCursor * 0.02 * force;
      this.y += dyCursor * 0.02 * force;
    }
  }
}

class Connection {
  p1: Particle;
  p2: Particle;
  style: string; // Style will define if the line is white, blue, or transparent

  constructor(p1: Particle, p2: Particle) {
    this.p1 = p1;
    this.p2 = p2;

    // Randomly assign a style for the connection line
    const rand = Math.random();
    if (rand < 0.33) {
      this.style = 'white'; // Solid white line
    } else if (rand < 0.66) {
      this.style = 'blue'; // Solid blue line
    } else {
      this.style = 'transparentBlue'; // Transparent bluish line
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    let gradient = ctx.createLinearGradient(this.p1.x, this.p1.y, this.p2.x, this.p2.y);

    if (this.style === 'white') {
      // Solid white line
      ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
    } else if (this.style === 'blue') {
      // Solid blue line
      ctx.strokeStyle = 'rgba(0, 150, 255, 1)';
    } else {
      // Transparent bluish line
      ctx.strokeStyle = 'rgba(0, 150, 255, 0.2)';
    }

    const midX = (this.p1.x + this.p2.x) / 2 + (Math.random() * 50 - 25);
    const midY = (this.p1.y + this.p2.y) / 2 + (Math.random() * 50 - 25);

    ctx.beginPath();
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.quadraticCurveTo(midX, midY, this.p2.x, this.p2.y); // Scribbly connection
    ctx.strokeStyle = gradient;
    ctx.lineWidth = Math.random() * 2 + 0.5;
    ctx.stroke();
  }
}

interface BouncingDotsProps {
  particleCount?: number;
  connectionCount?: number;
  interactionRadius?: number;
  edgeDelay?: number;
}

const BouncingDots: React.FC<BouncingDotsProps> = ({
  particleCount = 200,
  connectionCount = 100,
  interactionRadius = 100,
  edgeDelay = 5000,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

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
        setDimensions({ width, height });
      }
    };

    setCanvasSize();

    const resizeObserver = new ResizeObserver(() => {
      setCanvasSize();
    });

    resizeObserver.observe(container);

    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = event.clientX - rect.left;
      mouseY = event.clientY - rect.top;
    };

    const particles: Particle[] = [];
    const connections: Connection[] = [];

    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const radius = Math.min(dimensions.width, dimensions.height) / 3;

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

    let animationFrameId: number;

    const animate = () => {
      if (!ctx) return;

      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update(centerX, centerY, radius, mouseX, mouseY);
        particle.draw(ctx);
      });

      connections.forEach((connection) => connection.draw(ctx));

      animationFrameId = requestAnimationFrame(animate);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
    };
  }, [
    dimensions.width,
    dimensions.height,
    particleCount,
    connectionCount,
    interactionRadius,
    edgeDelay,
  ]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
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

export default BouncingDots;
