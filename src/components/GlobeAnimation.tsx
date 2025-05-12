
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GlobeAnimation = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);
    
    // Lights
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x9b5de5, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create globe
    const globeGeometry = new THREE.SphereGeometry(2, 64, 64);
    
    // Material with wireframe for globe
    const globeMaterial = new THREE.MeshPhongMaterial({
      color: 0x00b4d8,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);
    
    // Create dots on the globe for information nodes
    const infoNodes = new THREE.Group();
    const nodeCount = 100;
    
    for (let i = 0; i < nodeCount; i++) {
      // Random position on sphere surface
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      
      const nodeGeometry = new THREE.SphereGeometry(0.03, 8, 8);
      const nodeMaterial = new THREE.MeshBasicMaterial({ 
        color: Math.random() > 0.5 ? 0x00b4d8 : 0x9b5de5
      });
      
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      
      node.position.x = 2 * Math.sin(phi) * Math.cos(theta);
      node.position.y = 2 * Math.sin(phi) * Math.sin(theta);
      node.position.z = 2 * Math.cos(phi);
      
      infoNodes.add(node);
    }
    
    scene.add(infoNodes);
    
    // Create connections between random nodes
    const connectionsGroup = new THREE.Group();
    
    for (let i = 0; i < 30; i++) {
      const nodeA = Math.floor(Math.random() * nodeCount);
      const nodeB = Math.floor(Math.random() * nodeCount);
      
      if (nodeA !== nodeB) {
        const pointA = infoNodes.children[nodeA].position;
        const pointB = infoNodes.children[nodeB].position;
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([pointA, pointB]);
        const lineMaterial = new THREE.LineBasicMaterial({ 
          color: 0x36eee0, 
          transparent: true,
          opacity: 0.3
        });
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        connectionsGroup.add(line);
      }
    }
    
    scene.add(connectionsGroup);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Slow rotation
      globe.rotation.y += 0.002;
      infoNodes.rotation.y += 0.002;
      connectionsGroup.rotation.y += 0.002;
      
      // Pulsate connections
      const time = Date.now() * 0.001;
      connectionsGroup.children.forEach((line, i) => {
        const material = line.material as THREE.LineBasicMaterial;
        material.opacity = 0.2 + 0.1 * Math.sin(time + i * 0.1);
      });
      
      renderer.render(scene, camera);
    };
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      
      // Dispose resources
      globeGeometry.dispose();
      globeMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
};

export default GlobeAnimation;
