"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function MatrixBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Floating binary/hex particles ──────────────────────────────
    const PARTICLE_COUNT = 320;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities: number[] = [];
    const opacities = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      velocities.push(
        (Math.random() - 0.5) * 0.003,
        -Math.random() * 0.006 - 0.002,
        0
      );
      opacities[i] = Math.random() * 0.6 + 0.1;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x00ff88,
      size: 0.04,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── Wireframe dodecahedron (rotating) ──────────────────────────
    const dodecGeo = new THREE.DodecahedronGeometry(1.4, 0);
    const edgesGeo = new THREE.EdgesGeometry(dodecGeo);
    const edgesMat = new THREE.LineBasicMaterial({
      color: 0x00ccff,
      transparent: true,
      opacity: 0.12,
    });
    const dodec = new THREE.LineSegments(edgesGeo, edgesMat);
    dodec.position.set(-3.5, 1.2, -2);
    scene.add(dodec);

    // ── Wireframe icosahedron ──────────────────────────────────────
    const icoGeo = new THREE.IcosahedronGeometry(0.9, 0);
    const icoEdgesGeo = new THREE.EdgesGeometry(icoGeo);
    const icoMat = new THREE.LineBasicMaterial({
      color: 0x7700ff,
      transparent: true,
      opacity: 0.14,
    });
    const ico = new THREE.LineSegments(icoEdgesGeo, icoMat);
    ico.position.set(3.8, -1.0, -1.5);
    scene.add(ico);

    // ── Grid plane (circuit board look) ───────────────────────────
    const gridHelper = new THREE.GridHelper(24, 24, 0x003322, 0x001a11);
    gridHelper.position.y = -3.5;
    gridHelper.material.transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.18;
    scene.add(gridHelper);

    // ── Connecting lines (node graph) ────────────────────────────
    const nodeCount = 18;
    const nodePositions: THREE.Vector3[] = [];
    for (let i = 0; i < nodeCount; i++) {
      nodePositions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 4 - 2
        )
      );
    }

    const linePoints: number[] = [];
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < 4.5) {
          linePoints.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(linePoints), 3)
    );
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00ff88,
      transparent: true,
      opacity: 0.08,
    });
    const graph = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(graph);

    // ── Node dots ─────────────────────────────────────────────────
    const nodeDotGeo = new THREE.BufferGeometry();
    const nodeArr = new Float32Array(nodeCount * 3);
    nodePositions.forEach((v, i) => {
      nodeArr[i * 3] = v.x;
      nodeArr[i * 3 + 1] = v.y;
      nodeArr[i * 3 + 2] = v.z;
    });
    nodeDotGeo.setAttribute("position", new THREE.BufferAttribute(nodeArr, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: 0x00ff88,
      size: 0.07,
      transparent: true,
      opacity: 0.5,
    });
    const nodeDots = new THREE.Points(nodeDotGeo, nodeMat);
    scene.add(nodeDots);

    // ── Animation ─────────────────────────────────────────────────
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // rotate wireframes
      dodec.rotation.x = elapsed * 0.09;
      dodec.rotation.y = elapsed * 0.13;
      ico.rotation.x = elapsed * -0.11;
      ico.rotation.y = elapsed * 0.08;

      // drift particles downward, reset when out of view
      const pos = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos[i * 3 + 0] += velocities[i * 3 + 0];
        pos[i * 3 + 1] += velocities[i * 3 + 1];
        // wrap
        if (pos[i * 3 + 1] < -6) {
          pos[i * 3 + 1] = 6;
          pos[i * 3 + 0] = (Math.random() - 0.5) * 20;
        }
      }
      particleGeo.attributes.position.needsUpdate = true;

      // pulse opacity
      particleMat.opacity = 0.28 + Math.sin(elapsed * 0.7) * 0.06;

      // slow pan camera
      camera.position.x = Math.sin(elapsed * 0.04) * 0.4;
      camera.position.y = Math.cos(elapsed * 0.03) * 0.2;

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize handler ────────────────────────────────────────────
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      [particleGeo, dodecGeo, edgesGeo, icoGeo, icoEdgesGeo,
       lineGeo, nodeDotGeo, gridHelper.geometry].forEach((g) => g.dispose());
      [particleMat, edgesMat, icoMat, lineMat, nodeMat].forEach((m) => m.dispose());
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}