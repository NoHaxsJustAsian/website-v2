import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { QuadraticBezierCurve3 } from "three/src/extras/curves/QuadraticBezierCurve3.js";

// Post-processing imports
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

// Define the component's props
interface ParticleArtsProps {
  particleCount?: number;
  connectionCount?: number;
  className?: string;
  onComplete?: () => void; // New: Callback when transition is complete
}

// Particle class definition
class Particle {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  acceleration: THREE.Vector3;
  hue: number;
  targetPosition: THREE.Vector3;
  initialPosition: THREE.Vector3; // Store initial position
  startPosition: THREE.Vector3;   // Store position at transition start

  constructor(center: THREE.Vector3, initialRadius: number, targetRadius: number) {
    // Generate target position with uniform distribution within a sphere
    const angle1 = Math.random() * Math.PI * 2;
    const angle2 = Math.acos(2 * Math.random() - 1); // Uniform distribution
    const distance = Math.cbrt(Math.random()) * targetRadius; // Cube root for uniform distribution

    this.targetPosition = new THREE.Vector3(
      center.x + Math.cos(angle1) * Math.sin(angle2) * distance,
      center.y + Math.sin(angle1) * Math.sin(angle2) * distance,
      center.z + Math.cos(angle2) * distance
    );

    // Generate initial position within initialRadius
    const initAngle1 = Math.random() * Math.PI * 2;
    const initAngle2 = Math.acos(2 * Math.random() - 1);
    const initDistance = Math.cbrt(Math.random()) * initialRadius;

    this.initialPosition = new THREE.Vector3(
      center.x + Math.cos(initAngle1) * Math.sin(initAngle2) * initDistance,
      center.y + Math.sin(initAngle1) * Math.sin(initAngle2) * initDistance,
      center.z + Math.cos(initAngle2) * initDistance
    );

    // Initialize mesh at the initial position
    const geometry = new THREE.SphereGeometry(0.5, 8, 8); // Small sphere
    const hue = Math.random() * 60 + 180;
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(`hsl(${hue}, 100%, 70%)`),
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(this.initialPosition); // Start at initial position

    this.velocity = new THREE.Vector3(
      (Math.random() * 2 - 1),
      (Math.random() * 2 - 1),
      (Math.random() * 2 - 1)
    );
    this.acceleration = new THREE.Vector3();
    this.hue = hue;

    this.startPosition = this.mesh.position.clone(); // Initialize startPosition
  }

  /**
   * Update the particle's position and velocity.
   * @param center - The central point for gravity.
   * @param repellingForce - The force to apply (set to zero as mouse interaction is removed).
   * @param overrideForces - If true, only apply the repellingForce.
   */
  update(
    center: THREE.Vector3,
    repellingForce: THREE.Vector3,
    overrideForces: boolean = false
  ) {
    if (overrideForces) {
      // Override other forces and apply only the repelling force
      this.acceleration.copy(repellingForce);
    } else {
      // Apply gravity towards the center + randomness
      const dx = center.x - this.mesh.position.x;
      const dy = center.y - this.mesh.position.y;
      const dz = center.z - this.mesh.position.z;
      const gravity = 0.0009; // Gravitational constant
      const randomness = new THREE.Vector3(
        Math.random() * 0.05 - 0.025,
        Math.random() * 0.05 - 0.025,
        Math.random() * 0.05 - 0.025
      );

      this.acceleration
        .set(dx * gravity, dy * gravity, dz * gravity)
        .add(randomness)
        .add(repellingForce);
    }

    // Update velocity and position
    this.velocity.add(this.acceleration);
    this.mesh.position.add(this.velocity);

    // Boundary conditions
    const distanceFromCenter = center.distanceTo(this.mesh.position);
    if (distanceFromCenter > 180) {
      this.velocity.multiplyScalar(-0.7);
    }

    // Update color hue
    this.hue += Math.random() * 0.2;
    if (this.hue >= 240) this.hue = 180;
    (this.mesh.material as THREE.MeshBasicMaterial).color.setHSL(
      this.hue / 360,
      1,
      0.7
    );
  }
}

// Connection class definition
class Connection {
  p1: Particle;
  p2: Particle;
  color: THREE.Color;
  line: Line2 | null;
  controlPoint: THREE.Vector3; // Fixed control point for stability

  // NEW: Reuse a single curve instance
  curve: QuadraticBezierCurve3;

  constructor(p1: Particle, p2: Particle) {
    this.p1 = p1;
    this.p2 = p2;
    const rand = Math.random();
    this.color =
      rand < 0.33
        ? new THREE.Color(0xffffff)
        : rand < 0.66
        ? new THREE.Color(0x0096ff)
        : new THREE.Color(0x0064c8);
    this.line = null;

    // Create a fixed control point for the curve
    this.controlPoint = p1.targetPosition
      .clone()
      .lerp(p2.targetPosition, 0.5)
      .add(
        new THREE.Vector3(
          (Math.random() - 0.5) * 20, // Fixed randomness
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        )
      );

    // Instantiate a single curve we can reuse
    this.curve = new QuadraticBezierCurve3(
      this.p1.mesh.position.clone(),
      this.controlPoint.clone(),
      this.p2.mesh.position.clone()
    );
  }

  /**
   * Update our existing curve's points instead of creating a new curve.
   */
  updateCurve() {
    this.curve.v0.copy(this.p1.mesh.position);
    this.curve.v1.copy(this.controlPoint);
    this.curve.v2.copy(this.p2.mesh.position);
  }
}

// Easing function for smooth transition
const easeOutQuad = (t: number) => t * (2 - t);

// Main React component
const ParticleArts3D: React.FC<ParticleArtsProps> = ({
  particleCount = 200,
  connectionCount = 75,
  className,
  onComplete, // Destructure onComplete from props
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const isMobile = window.innerWidth <= 768;

    // Initialize renderer
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      1,
      1000
    );
    camera.position.z = isMobile ? 500 : 400;

    // Initialize post-processing
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // UnrealBloomPass
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      1.2, // strength
      0.3, // radius
      0.9  // threshold
    );
    composer.addPass(bloomPass);

    // Particles + Connections
    const particles: Particle[] = [];
    const connections: Connection[] = [];
    const center = new THREE.Vector3(0, 0, 0);

    const targetRadius = isMobile ? 100 : 150;
    const initialRadius = isMobile ? 10 : 20;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
      const particle = new Particle(center, initialRadius, targetRadius);
      particles.push(particle);
      scene.add(particle.mesh);
    }

    // Create connections + line objects
    for (let i = 0; i < connectionCount; i++) {
      const p1 = particles[Math.floor(Math.random() * particles.length)];
      const p2 = particles[Math.floor(Math.random() * particles.length)];
      if (p1 !== p2) {
        const connection = new Connection(p1, p2);
        connections.push(connection);

        // Build line geometry once
        const points = connection.curve.getPoints(10);
        const positions: number[] = [];
        points.forEach((pt) => {
          positions.push(pt.x, pt.y, pt.z);
        });

        const lineGeometry = new LineGeometry();
        lineGeometry.setPositions(positions);

        const lineMaterial = new LineMaterial({
          color: connection.color.getHex(),
          linewidth: 2.5,
          transparent: true,
          opacity: 0.6,
          depthTest: true,
          blending: THREE.AdditiveBlending,
        });
        lineMaterial.resolution.set(container.clientWidth, container.clientHeight);

        const line = new Line2(lineGeometry, lineMaterial);
        line.computeLineDistances();
        scene.add(line);

        connection.line = line;
      }
    }

    // Handle initial resizing
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    composer.setSize(container.clientWidth, container.clientHeight);
    bloomPass.setSize(container.clientWidth, container.clientHeight);

    connections.forEach((conn) => {
      if (conn.line && conn.line.material) {
        (conn.line.material as LineMaterial).resolution.set(
          container.clientWidth,
          container.clientHeight
        );
      }
    });

    // Transition timings
    const initialClusterDuration = 1500;
    const transitionDuration = 500;
    const transitionRef = {
      startTime: performance.now(),
      done: false,
    };
    let transitionStartPositionsCaptured = false;

    // Animation loop
    const animate = () => {
      const currentTime = performance.now();
      const elapsedTime = currentTime - transitionRef.startTime;

      if (elapsedTime < initialClusterDuration) {
        // Phase 1: initial cluster
        particles.forEach((particle) => {
          particle.update(center, new THREE.Vector3(0, 0, 0), false);
        });
      } else if (
        elapsedTime >= initialClusterDuration &&
        elapsedTime < initialClusterDuration + transitionDuration
      ) {
        // Phase 2: transition
        if (!transitionStartPositionsCaptured) {
          particles.forEach((particle) => {
            particle.startPosition.copy(particle.mesh.position);
          });
          transitionStartPositionsCaptured = true;
        }

        const transitionElapsed = elapsedTime - initialClusterDuration;
        const progress = easeOutQuad(Math.min(transitionElapsed / transitionDuration, 1));

        particles.forEach((particle) => {
          const newPosition = particle.startPosition.clone().lerp(particle.targetPosition, progress);
          particle.mesh.position.copy(newPosition);
        });
      } else if (
        elapsedTime >= initialClusterDuration + transitionDuration &&
        !transitionRef.done
      ) {
        // Phase 3: transition complete
        particles.forEach((particle) => {
          particle.mesh.position.copy(particle.targetPosition);
        });
        transitionRef.done = true;
        if (onComplete) onComplete();
      } else {
        // Phase 4: normal update
        particles.forEach((particle) => {
          particle.update(center, new THREE.Vector3(0, 0, 0), false);
        });
      }

      // Update connections
      connections.forEach((connection) => {
        const { line } = connection;
        if (line) {
          // Reuse existing curve instead of creating a new one
          connection.updateCurve();

          // Get updated curve points
          const points = connection.curve.getPoints(20);
          const positions: number[] = [];
          points.forEach((pt) => {
            positions.push(pt.x, pt.y, pt.z);
          });

          // Update geometry
          (line.geometry as LineGeometry).setPositions(positions);
          line.computeLineDistances();
          (line.material as LineMaterial).needsUpdate = true;
        }
      });

      // Render with post-processing
      composer.render();
      requestAnimationFrame(animate);
    };
    animate();

    // Cleanup on unmount
    return () => {
      renderer.dispose();
      composer.dispose();
      scene.traverse((object) => {
        if ((object as any).geometry) (object as any).geometry.dispose();
        if ((object as any).material) (object as any).material.dispose();
      });
    };
  }, [particleCount, connectionCount, onComplete]);

  return (
    <div
      ref={containerRef}
      className={`fixed top-0 left-0 w-full h-full ${className}`}
    />
  );
};

export default ParticleArts3D;
