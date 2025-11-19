import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const TorusBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // CLEANUP: Remove any existing canvases to prevent duplicates
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    // Set up scene
    const scene = new THREE.Scene();

    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 4;

    // Set up renderer with transparency
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // Transparent background
    mountRef.current.appendChild(renderer.domElement);

    // Add thick torus geometry with green color to match theme
    const geometry = new THREE.TorusGeometry(1.5, 0.6, 24, 100);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x00ff41,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const torus = new THREE.Mesh(geometry, material);
    
    // Position torus to the right
    torus.position.x = 5.5;
    torus.position.y = 3;
    
    scene.add(torus);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.005;
      torus.rotation.y += 0.008;
      torus.rotation.z += 0.003;
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        position: 'fixed',
        top: 0,
        right: 0,
        width: '500px',
        height: '300px',
        pointerEvents: 'none',
        zIndex: 0
      }} 
    />
  );
};

export default TorusBackground;

