import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { QuadraticBezierCurve3 } from "three/src/extras/curves/QuadraticBezierCurve3.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

interface ParticleArtsProps {
  particleCount?: number;
  connectionCount?: number;
  className?: string;
  onComplete?: () => void;
}

/**
 * 1) Precompute a global array of random offsets.
 *    This is a one-time cost, not repeated every frame.
 */
const RANDOM_COUNT = 1000;
const randomOffsets: THREE.Vector3[] = [];
for (let i = 0; i < RANDOM_COUNT; i++) {
  // Equivalent to your old (Math.random() * 0.05 - 0.025) * 60
  const x = (Math.random() * 0.05 - 0.025) * 60;
  const y = (Math.random() * 0.05 - 0.025) * 60;
  const z = (Math.random() * 0.05 - 0.025) * 60;
  randomOffsets.push(new THREE.Vector3(x, y, z));
}

/**
 * Helper function to retrieve the next random vector
 * from our precomputed array, cycling if we hit the end.
 */
let globalRandomIndex = 0;
function getNextRandomOffset(): THREE.Vector3 {
  const vec = randomOffsets[globalRandomIndex];
  globalRandomIndex = (globalRandomIndex + 1) % RANDOM_COUNT;
  return vec;
}

class Particle {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  acceleration: THREE.Vector3;
  hue: number;
  targetPosition: THREE.Vector3;
  initialPosition: THREE.Vector3;
  startPosition: THREE.Vector3;

  constructor(center: THREE.Vector3, initialRadius: number, targetRadius: number) {
    const angle1 = Math.random() * Math.PI * 2;
    const angle2 = Math.acos(2 * Math.random() - 1);
    const distance = Math.cbrt(Math.random()) * targetRadius;
    this.targetPosition = new THREE.Vector3(
      center.x + Math.cos(angle1) * Math.sin(angle2) * distance,
      center.y + Math.sin(angle1) * Math.sin(angle2) * distance,
      center.z + Math.cos(angle2) * distance
    );

    const initAngle1 = Math.random() * Math.PI * 2;
    const initAngle2 = Math.acos(2 * Math.random() - 1);
    const initDistance = Math.cbrt(Math.random()) * initialRadius;
    this.initialPosition = new THREE.Vector3(
      center.x + Math.cos(initAngle1) * Math.sin(initAngle2) * initDistance,
      center.y + Math.sin(initAngle1) * Math.sin(initAngle2) * initDistance,
      center.z + Math.cos(initAngle2) * initDistance
    );

    const geometry = new THREE.SphereGeometry(0.5, 8, 8);
    const hueVal = Math.random() * 60 + 180;
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color(`hsl(${hueVal}, 100%, 70%)`),
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(this.initialPosition);

    // Larger initial velocity for time-based updates
    this.velocity = new THREE.Vector3(
      (Math.random() * 2 - 1) * 90,
      (Math.random() * 2 - 1) * 90,
      (Math.random() * 2 - 1) * 90
    );

    this.acceleration = new THREE.Vector3();
    this.hue = hueVal;
    this.startPosition = this.mesh.position.clone();
  }

  /**
   * Now we replace the repeated Math.random() calls
   * with getNextRandomOffset() from our precomputed array.
   */
  update(
    center: THREE.Vector3,
    repellingForce: THREE.Vector3,
    overrideForces: boolean,
    dt: number
  ) {
    if (overrideForces) {
      this.acceleration.copy(repellingForce);
    } else {
      const gravity = 5.5;
      const dx = center.x - this.mesh.position.x;
      const dy = center.y - this.mesh.position.y;
      const dz = center.z - this.mesh.position.z;

      // Instead of calling Math.random each time, we get from the precomputed array:
      const randomOffset = getNextRandomOffset();

      this.acceleration
        .set(dx * gravity, dy * gravity, dz * gravity)
        .add(randomOffset)
        .add(repellingForce);
    }

    this.velocity.addScaledVector(this.acceleration, dt);
    this.mesh.position.addScaledVector(this.velocity, dt);

    const dist = center.distanceTo(this.mesh.position);
    if (dist > 200) {
      this.velocity.multiplyScalar(-0.5);
    }

    // We can keep the hue shift as is
    this.hue += Math.random() * 0.2;
    if (this.hue >= 240) this.hue = 180;
    (this.mesh.material as THREE.MeshBasicMaterial).color.setHSL(
      this.hue / 360,
      1,
      0.7
    );
  }
}

class Connection {
  p1: Particle;
  p2: Particle;
  color: THREE.Color;
  line: Line2 | null;
  controlPoint: THREE.Vector3;
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
    this.controlPoint = p1.targetPosition
      .clone()
      .lerp(p2.targetPosition, 0.5)
      .add(
        new THREE.Vector3(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 20
        )
      );
    this.curve = new QuadraticBezierCurve3(
      this.p1.mesh.position.clone(),
      this.controlPoint.clone(),
      this.p2.mesh.position.clone()
    );
  }

  updateCurve() {
    this.curve.v0.copy(this.p1.mesh.position);
    this.curve.v1.copy(this.controlPoint);
    this.curve.v2.copy(this.p2.mesh.position);
  }
}

const easeOutQuad = (t: number) => t * (2 - t);

const ParticleArts3D: React.FC<ParticleArtsProps> = ({
  particleCount = 200,
  connectionCount = 75,
  className,
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const isMobile = window.innerWidth <= 768;
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      1,
      1000
    );
    camera.position.z = isMobile ? 500 : 400;

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(container.clientWidth, container.clientHeight),
      1.2,
      0.3,
      0.9
    );
    composer.addPass(bloomPass);

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

    // Create connections
    for (let i = 0; i < connectionCount; i++) {
      const p1 = particles[Math.floor(Math.random() * particles.length)];
      const p2 = particles[Math.floor(Math.random() * particles.length)];
      if (p1 !== p2) {
        const connection = new Connection(p1, p2);
        connections.push(connection);
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

    function onResize() {
      if (container) {
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
    }
    }

    window.addEventListener("resize", onResize);
    onResize();

    const initialClusterDuration = 1500;
    const transitionDuration = 500;
    const transitionRef = { startTime: performance.now(), done: false };
    let transitionStartPositionsCaptured = false;
    let prevTime = performance.now();

    function animate() {
      requestAnimationFrame(animate);

      const currentTime = performance.now();
      let dt = (currentTime - prevTime) / 1000;
      prevTime = currentTime;
      if (dt > 0.1) dt = 0.1;

      const elapsedTime = currentTime - transitionRef.startTime;

      if (elapsedTime < initialClusterDuration) {
        particles.forEach((p) => {
          p.update(center, new THREE.Vector3(0, 0, 0), false, dt);
        });
      } else if (
        elapsedTime >= initialClusterDuration &&
        elapsedTime < initialClusterDuration + transitionDuration
      ) {
        if (!transitionStartPositionsCaptured) {
          particles.forEach((p) => {
            p.startPosition.copy(p.mesh.position);
          });
          transitionStartPositionsCaptured = true;
        }
        const transitionElapsed = elapsedTime - initialClusterDuration;
        const progress = easeOutQuad(Math.min(transitionElapsed / transitionDuration, 1));
        particles.forEach((p) => {
          const newPos = p.startPosition.clone().lerp(p.targetPosition, progress);
          p.mesh.position.copy(newPos);
        });
      } else if (
        elapsedTime >= initialClusterDuration + transitionDuration &&
        !transitionRef.done
      ) {
        particles.forEach((p) => {
          p.mesh.position.copy(p.targetPosition);
        });
        transitionRef.done = true;
        if (onComplete) onComplete();
      } else {
        particles.forEach((p) => {
          p.update(center, new THREE.Vector3(0, 0, 0), false, dt);
        });
      }

      connections.forEach((connection) => {
        if (connection.line) {
          connection.updateCurve();
          const pts = connection.curve.getPoints(20);
          const posArray: number[] = [];
          pts.forEach((pt) => {
            posArray.push(pt.x, pt.y, pt.z);
          });
          (connection.line.geometry as LineGeometry).setPositions(posArray);
          connection.line.computeLineDistances();
          (connection.line.material as LineMaterial).needsUpdate = true;
        }
      });

      composer.render();
    }

    animate();

    return () => {
      window.removeEventListener("resize", onResize);
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
