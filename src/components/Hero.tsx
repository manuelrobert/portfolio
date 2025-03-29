'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const Hero = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasWebGLSupport, setHasWebGLSupport] = useState(true);
  const [usingSoftwareRenderer, setUsingSoftwareRenderer] = useState(false);

  // Add enhanced function to create CSS background gradient animation as fallback
  const createCSSFallbackAnimation = (container: HTMLDivElement) => {
    console.log('Creating CSS fallback animation for Firefox...');
    
    // Clear any existing content
    container.innerHTML = '';
    
    // Create background container
    const backgroundContainer = document.createElement('div');
    backgroundContainer.className = 'css-fallback-animation';
    Object.assign(backgroundContainer.style, {
      position: 'absolute',
      inset: '0',
      overflow: 'hidden',
      width: '100%',
      height: '100%',
      zIndex: '-1',
    });
    
    // Create 5 gradient orbs that will move around slowly
    for (let i = 0; i < 5; i++) {
      const orb = document.createElement('div');
      
      // Random properties for each orb
      const size = 20 + Math.random() * 30; // 20-50% of container
      const x = Math.random() * 80; // 0-80% position
      const y = Math.random() * 80; // 0-80% position
      const hue = Math.floor(Math.random() * 60) + 180; // Blue-green hues (180-240)
      
      // Set styles
      Object.assign(orb.style, {
        position: 'absolute',
        width: `${size}%`,
        height: `${size}%`,
        borderRadius: '50%',
        background: `radial-gradient(circle, hsla(${hue}, 70%, 60%, 0.15), hsla(${hue}, 70%, 40%, 0.03))`,
        filter: 'blur(40px)',
        transform: `translate(${x}%, ${y}%)`,
        animation: `float-${i} ${20 + i * 5}s infinite alternate ease-in-out`,
        opacity: '0.7',
      });
      
      // Create unique keyframe animation for each orb
      const keyframes = document.createElement('style');
      keyframes.innerHTML = `
        @keyframes float-${i} {
          0% { transform: translate(${x}%, ${y}%) rotate(0deg); }
          33% { transform: translate(${(x + 20) % 80}%, ${(y + 30) % 80}%) rotate(120deg); }
          66% { transform: translate(${(x + 40) % 80}%, ${(y + 10) % 80}%) rotate(240deg); }
          100% { transform: translate(${x}%, ${y}%) rotate(360deg); }
        }
      `;
      document.head.appendChild(keyframes);
      
      backgroundContainer.appendChild(orb);
    }
    
    // Add some stars for a similar effect to WebGL
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      const size = 1 + Math.random() * 2; // 1-3px stars
      const x = Math.random() * 100; // 0-100% position
      const y = Math.random() * 100; // 0-100% position
      const delay = Math.random() * 5; // 0-5s animation delay
      const duration = 3 + Math.random() * 7; // 3-10s animation duration
      
      // Set star styles
      Object.assign(star.style, {
        position: 'absolute',
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})`, // Semi-transparent white
        left: `${x}%`,
        top: `${y}%`,
        animation: `twinkle ${duration}s infinite ${delay}s`,
      });
      
      backgroundContainer.appendChild(star);
    }
    
    // Add twinkle animation for stars
    const starAnimation = document.createElement('style');
    starAnimation.innerHTML = `
      @keyframes twinkle {
        0%, 100% { opacity: 0.2; transform: scale(0.8); }
        50% { opacity: 1; transform: scale(1.2); }
      }
    `;
    document.head.appendChild(starAnimation);
    
    // Add "shooting stars" with CSS
    const shootingStar = document.createElement('div');
    const shootingDelay = Math.random() * 3;
    
    Object.assign(shootingStar.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      zIndex: '0',
    });
    
    for (let i = 0; i < 8; i++) {
      const trail = document.createElement('div');
      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      const angle = Math.random() * 180;
      const speed = 3 + Math.random() * 7; // 3-10s
      const trailDelay = i * 2 + shootingDelay;
      
      Object.assign(trail.style, {
        position: 'absolute',
        width: '2px',
        height: '100px',
        backgroundImage: 'linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.8), transparent)',
        left: `${startX}%`,
        top: `${startY}%`,
        transform: `rotate(${angle}deg)`,
        animation: `shooting ${speed}s linear infinite ${trailDelay}s`,
      });
      
      shootingStar.appendChild(trail);
    }
    
    // Add shooting star animation
    const shootingAnimation = document.createElement('style');
    shootingAnimation.innerHTML = `
      @keyframes shooting {
        0% { transform: translateX(0) translateY(0) rotate(var(--angle, 30deg)); opacity: 0; }
        1% { opacity: 1; }
        10% { transform: translateX(calc(var(--distance, 100px) * 0.3)) translateY(calc(var(--distance, 100px) * 0.3)) rotate(var(--angle, 30deg)); opacity: 1; }
        100% { transform: translateX(var(--distance, 200px)) translateY(var(--distance, 200px)) rotate(var(--angle, 30deg)); opacity: 0; }
      }
    `;
    document.head.appendChild(shootingAnimation);
    
    backgroundContainer.appendChild(shootingStar);
    container.appendChild(backgroundContainer);
    
    console.log('CSS fallback animation created successfully');
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Enhanced WebGL support detection
    const detectWebGLCapabilities = (): { supported: boolean; software: boolean } => {
      try {
        const canvas = document.createElement('canvas');
        
        // Try WebGL2 first, then WebGL1
        let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
        
        try {
          // First try WebGL2 with explicit attributes for Firefox
          gl = canvas.getContext('webgl2', {
            alpha: true,
            antialias: true,
            depth: true,
            failIfMajorPerformanceCaveat: false, // Setting to false is better for Firefox compatibility
            powerPreference: 'default',
            premultipliedAlpha: true,
            preserveDrawingBuffer: false,
            stencil: false
          }) as WebGL2RenderingContext | null;
        } catch (e) {
          console.warn('WebGL2 initialization failed, trying WebGL1:', e);
        }
        
        if (!gl) {
          try {
            // Fallback to WebGL1 with explicit attributes for Firefox
            gl = canvas.getContext('webgl', {
              alpha: true,
              antialias: true,
              depth: true,
              failIfMajorPerformanceCaveat: false,
              powerPreference: 'default',
              premultipliedAlpha: true,
              preserveDrawingBuffer: false,
              stencil: false
            }) as WebGLRenderingContext | null;
          } catch (e) {
            console.warn('WebGL1 initialization failed:', e);
          }
        }
        
        if (!gl) {
          try {
            // Last resort: try experimental-webgl for older browsers
            gl = canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;
          } catch (e) {
            console.warn('Experimental WebGL initialization failed:', e);
          }
        }
        
        if (!gl) {
          return { supported: false, software: false };
        }
        
        // Check if we're using software rendering
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
          const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
          
          // Log for debugging
          console.log('WebGL Renderer:', renderer);
          console.log('WebGL Vendor:', vendor);
          
          // Check for software renderers
          const isSoftware = 
            /SwiftShader|Software|Microsoft Basic Render/i.test(renderer) || 
            /Google|Microsoft/i.test(vendor);
            
          return { supported: true, software: isSoftware };
        }
        
        return { supported: true, software: false };
      } catch (error) {
        console.error('Error detecting WebGL capabilities:', error);
        return { supported: false, software: false };
      }
    };
    
    // Check WebGL capabilities
    const { supported, software } = detectWebGLCapabilities();
    
    if (!supported || software) {
      if (!supported) {
        console.error('WebGL not supported');
        setHasWebGLSupport(false);
      }
      
      if (software) {
        console.warn('Using software WebGL renderer - falling back to CSS animation');
        setUsingSoftwareRenderer(true);
        setHasWebGLSupport(false);
      }
      
      // Create CSS fallback animation
      if (mountRef.current) {
        createCSSFallbackAnimation(mountRef.current);
      }
      
      return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    
    // Renderer setup with error handling
    let renderer: THREE.WebGLRenderer;
    
    try {
      // Create renderer with enhanced options for Firefox compatibility
      renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: false, // Changed to false for better Firefox compatibility
        precision: 'highp', // Try high precision first
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
        stencil: false
      });
      
      // Fallback to medium precision if needed
      if (!renderer) {
        console.warn('Failed with highp precision, trying mediump');
        renderer = new THREE.WebGLRenderer({ 
          alpha: true,
          antialias: true,
          powerPreference: 'default',
          failIfMajorPerformanceCaveat: false,
          precision: 'mediump',
          premultipliedAlpha: true
        });
      }
      
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.setClearColor(0x000000, 0); // Transparent background
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
      
      // Check if we can append the renderer
      if (mountRef.current) {
        try {
          mountRef.current.innerHTML = ''; // Clear any existing content
          mountRef.current.appendChild(renderer.domElement);
        } catch (error) {
          console.error('Error appending renderer to DOM:', error);
          setHasWebGLSupport(false);
          createCSSFallbackAnimation(mountRef.current);
          return;
        }
      }
    } catch (error) {
      console.error('Error creating WebGL renderer:', error);
      setHasWebGLSupport(false);
      if (mountRef.current) {
        createCSSFallbackAnimation(mountRef.current);
      }
      return;
    }

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add point light similar to Skills.tsx
    const pointLight = new THREE.PointLight(0x5f9ea0, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    // Create particles similar to Skills.tsx but with optimized count for Firefox
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800; // Reduced from 1500 for Firefox performance
    
    const positionArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      // Position (larger spread for hero section)
      positionArray[i] = (Math.random() - 0.5) * 20;
      
      // Color (using similar palette as the Skills section)
      if (i % 3 === 0) {
        // Red component (for primary color)
        colorArray[i] = 0.5 + Math.random() * 0.2;
      } else if (i % 3 === 1) {
        // Green component (for secondary color)
        colorArray[i] = 0.2 + Math.random() * 0.2;
      } else {
        // Blue component (for accent color)
        colorArray[i] = 0.7 + Math.random() * 0.3;
      }
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    // Material for particles
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05, // Slightly larger for visibility with fewer particles
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      alphaTest: 0.001,
      opacity: 0.8
    });
    
    // Create points
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Create distant starfield with optimized counts
    const createStarfield = () => {
      // Create several star layers with different sizes, colors and distances
      const createStarLayer = (count: number, size: number, distance: number, colorBase: number) => {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);
        
        // Create star color palette
        const colorPalette = [
          new THREE.Color(0xffffff), // White
          new THREE.Color(0xaaaaff), // Light blue
          new THREE.Color(0xffffaa), // Light yellow
          new THREE.Color(0xddddff)  // Very light blue
        ];
        
        for (let i = 0; i < count; i++) {
          // Position stars in a sphere around the camera
          const radius = distance * (0.8 + Math.random() * 0.4); // Some variation in distance
          const theta = Math.random() * Math.PI * 2; // Horizontal angle
          const phi = Math.acos(2 * Math.random() - 1); // Vertical angle (ensures uniform distribution)
          
          positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
          positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          positions[i * 3 + 2] = radius * Math.cos(phi);
          
          // Random size variation
          sizes[i] = size * (0.7 + Math.random() * 0.6);
          
          // Random color from palette
          const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
          // Add subtle color variation
          const hsl = { h: 0, s: 0, l: 0 };
          color.getHSL(hsl);
          // Adjust hue slightly
          const adjustedColor = new THREE.Color().setHSL(
            hsl.h + (Math.random() * 0.1 - 0.05),
            hsl.s,
            hsl.l + (Math.random() * 0.2 - 0.1)
          );
          
          colors[i * 3] = adjustedColor.r;
          colors[i * 3 + 1] = adjustedColor.g;
          colors[i * 3 + 2] = adjustedColor.b;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        
        // Use a simplified shader material for Firefox compatibility
        const starMaterial = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            pixelRatio: { value: Math.min(window.devicePixelRatio, 2) } // Limit pixel ratio
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            void main() {
              vColor = color;
              // Simplified position variation for Firefox
              vec3 pos = position;
              // Reduce complexity of math operations for Firefox
              pos.x += sin(time * 0.0005 + position.z * 0.1) * 0.1;
              pos.y += cos(time * 0.0007 + position.x * 0.1) * 0.1;
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (30.0 / -mvPosition.z) * pixelRatio; // Reduced from 50.0
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            void main() {
              // Simplified circular point with soft edges for Firefox
              vec2 center = gl_PointCoord - 0.5;
              float dist = length(center);
              if (dist > 0.5) discard;
              
              // Simplified glow for Firefox
              float strength = 1.0 - dist * 2.0;
              strength = pow(strength, 1.2); // Reduced from 1.5
              
              gl_FragColor = vec4(vColor, strength);
            }
          `,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending
        });
        
        const stars = new THREE.Points(geometry, starMaterial);
        scene.add(stars);
        
        return { stars, material: starMaterial };
      };
      
      // Create multiple star layers with reduced counts for Firefox
      return [
        createStarLayer(1000, 0.5, 50, 0xffffff), // Reduced from 2000
        createStarLayer(500, 0.8, 40, 0xaaaaff),  // Reduced from 1000
        createStarLayer(250, 1.2, 30, 0xffffee),  // Reduced from 500
        createStarLayer(100, 1.6, 20, 0xffffff)   // Reduced from 200
      ];
    };
    
    const starLayers = createStarfield();
    
    // Create particle systems with different properties - reduced counts for Firefox
    const createParticleSystem = (
      count: number, 
      size: number, 
      color: number,
      opacity: number,
      spread: number
    ) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);
      
      for (let i = 0; i < count * 3; i += 3) {
        // Position in a sphere
        const radius = Math.random() * spread;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);
        
        // Random velocities for animation - reduced for Firefox
        velocities[i] = (Math.random() - 0.5) * 0.003;     // Reduced from 0.005
        velocities[i + 1] = (Math.random() - 0.5) * 0.003; // Reduced from 0.005
        velocities[i + 2] = (Math.random() - 0.5) * 0.003; // Reduced from 0.005
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      // Store velocities for animation
      geometry.userData = { velocities };
      
      const material = new THREE.PointsMaterial({
        size,
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      
      return new THREE.Points(geometry, material);
    };
    
    // Create multiple particle systems with reduced counts for Firefox
    const particleSystems = [
      // Main particles (teal)
      createParticleSystem(250, 0.05, 0x5f9ea0, 0.7, 8), // Reduced from 500
      // Secondary particles (purple)
      createParticleSystem(75, 0.07, 0x9370db, 0.6, 6),  // Reduced from 150
      // Accent particles (light blue)
      createParticleSystem(35, 0.09, 0x87ceeb, 0.5, 4)   // Reduced from 75
    ];
    
    particleSystems.forEach(system => scene.add(system));
    
    // Create occasional shooting stars
    const shootingStars = {
      active: [] as {
        mesh: THREE.Mesh;
        startTime: number;
        duration: number;
        startPosition: THREE.Vector3;
        endPosition: THREE.Vector3;
        trail: THREE.Mesh;
      }[],
      geometry: new THREE.SphereGeometry(0.2, 8, 8),
      material: new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.8
      }),
      trailGeometry: new THREE.PlaneGeometry(0.1, 2),
      trailMaterial: new THREE.MeshBasicMaterial({
        color: 0xaaccff,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      }),
      createNew: () => {
        // Only create new shooting stars occasionally and if we're not already at the limit
        if (Math.random() > 0.005 || shootingStars.active.length >= 3) return;
        
        const shootingStar = new THREE.Mesh(shootingStars.geometry, shootingStars.material.clone());
        
        // Random start position far away
        const startPos = new THREE.Vector3(
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 80
        );
        startPos.normalize().multiplyScalar(30 + Math.random() * 20);
        
        // End position in same direction but closer
        const endPos = startPos.clone().multiplyScalar(0.2);
        
        // Create trail
        const trail = new THREE.Mesh(shootingStars.trailGeometry, shootingStars.trailMaterial.clone());
        
        // Add to scene
        shootingStar.position.copy(startPos);
        scene.add(shootingStar);
        scene.add(trail);
        
        // Duration between 1-2.5 seconds
        const duration = 1000 + Math.random() * 1500;
        
        shootingStars.active.push({
          mesh: shootingStar,
          startTime: Date.now(),
          duration: duration,
          startPosition: startPos,
          endPosition: endPos,
          trail: trail
        });
      },
      update: () => {
        const now = Date.now();
        
        // Try to create new shooting stars
        shootingStars.createNew();
        
        // Update existing shooting stars
        shootingStars.active = shootingStars.active.filter(star => {
          const elapsed = now - star.startTime;
          const progress = Math.min(elapsed / star.duration, 1);
          
          if (progress >= 1) {
            // Remove if complete
            scene.remove(star.mesh);
            scene.remove(star.trail);
            return false;
          }
          
          // Update position
          const pos = new THREE.Vector3().lerpVectors(
            star.startPosition,
            star.endPosition,
            progress
          );
          star.mesh.position.copy(pos);
          
          // Fade out near the end
          if (progress > 0.8) {
            const fade = 1 - (progress - 0.8) * 5;
            if (star.mesh.material instanceof THREE.MeshBasicMaterial) {
              star.mesh.material.opacity = fade * 0.8;
            }
            if (star.trail.material instanceof THREE.MeshBasicMaterial) {
              star.trail.material.opacity = fade * 0.4;
            }
          }
          
          // Update trail
          // Calculate direction
          const dir = star.endPosition.clone().sub(star.startPosition).normalize();
          // Calculate the trail midpoint (slightly behind the star)
          const midpoint = pos.clone().sub(dir.clone().multiplyScalar(1));
          
          star.trail.position.copy(midpoint);
          // Make trail face the direction of travel
          star.trail.lookAt(star.startPosition);
          // Scale trail based on speed (more progress = faster = longer trail)
          const speedFactor = 1 + progress * 2;
          star.trail.scale.set(1, speedFactor, 1);
          
          return true;
        });
      }
    };
    
    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop with requestAnimationFrame ID tracking
    let animationFrameId: number;
    let time = 0;
    
    const animate = () => {
      try {
        animationFrameId = requestAnimationFrame(animate);
        time += 0.01;
        
        // Rotate particles (from Skills.tsx) - using simplified rotation for Firefox
        particles.rotation.y += 0.001 * 5;
        particles.rotation.x += 0.0006 * 5;
        
        // Update shooting stars - limit frequency of updates in Firefox
        if (time % 0.05 < 0.01) { // Only update every few frames
          shootingStars.update();
        }
        
        // Update star layer shaders with less frequent updates for Firefox
        if (time % 0.02 < 0.01) { // Reduce update frequency
          starLayers.forEach(layer => {
            if (layer.material instanceof THREE.ShaderMaterial) {
              layer.material.uniforms.time.value = time * 1000;
            }
          });
        }
        
        // Rotate the scene container slowly - reduced rotation speed for Firefox
        scene.rotation.y += 0.0002;
        scene.rotation.x += 0.0001;
        
        // Animate particles with their velocities - limit updates for Firefox
        particleSystems.forEach(system => {
          const positions = (system.geometry.attributes.position as THREE.BufferAttribute).array;
          const velocities = system.geometry.userData.velocities;
          
          // Only update a portion of particles each frame for better performance in Firefox
          const updateCount = Math.floor(positions.length / 9); // Update 1/3 of particles per frame
          const startIdx = Math.floor((time * 100) % 3) * updateCount * 3;
          const endIdx = Math.min(startIdx + updateCount * 3, positions.length);
          
          for (let i = startIdx; i < endIdx; i += 3) {
            // Apply velocity with smaller step for Firefox
            positions[i] += velocities[i] * 0.8;
            positions[i + 1] += velocities[i + 1] * 0.8;
            positions[i + 2] += velocities[i + 2] * 0.8;
            
            // Constrain to boundary - if particle goes too far, reset it
            const distance = Math.sqrt(
              positions[i] * positions[i] + 
              positions[i + 1] * positions[i + 1] + 
              positions[i + 2] * positions[i + 2]
            );
            
            if (distance > 10) {
              // Reset to a random position closer to the center
              const radius = Math.random() * 5;
              const theta = Math.random() * Math.PI * 2;
              const phi = Math.random() * Math.PI;
              
              positions[i] = radius * Math.sin(phi) * Math.cos(theta);
              positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
              positions[i + 2] = radius * Math.cos(phi);
            }
          }
          
          system.geometry.attributes.position.needsUpdate = true;
        });
        
        // Subtle movement based on mouse position - less responsive for better Firefox performance
        if (time % 0.05 < 0.01) { // Only update every few frames
          particleSystems.forEach((system, index) => {
            system.rotation.z += 0.0005 * (index + 1) * 0.5; // Reduced rotation speed
            system.position.x = mousePosition.x * 0.05 * (index + 1); // Reduced movement
            system.position.y = mousePosition.y * 0.05 * (index + 1); // Reduced movement
          });
        }
        
        // Add subtle mouse interaction for particles - reduce sensitivity for Firefox
        if (mousePosition.x !== 0 && mousePosition.y !== 0) {
          particles.rotation.x += mousePosition.y * 0.00005; // Reduced sensitivity
          particles.rotation.y += mousePosition.x * 0.00005; // Reduced sensitivity
        }
        
        // Render the scene safely
        renderer.render(scene, camera);
      } catch (error) {
        console.error('Animation error:', error);
        cancelAnimationFrame(animationFrameId);
        setHasWebGLSupport(false);
        if (mountRef.current) {
          createCSSFallbackAnimation(mountRef.current);
        }
      }
    };
    
    // Start the animation
    try {
      animate();
    } catch (error) {
      console.error('Error starting animation:', error);
      setHasWebGLSupport(false);
      if (mountRef.current) {
        createCSSFallbackAnimation(mountRef.current);
      }
    }
    
    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      try {
        camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      } catch (error) {
        console.error('Resize error:', error);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (typeof animationFrameId === 'number') {
        cancelAnimationFrame(animationFrameId);
      }
      
      try {
        if (mountRef.current && renderer.domElement && renderer.domElement.parentNode) {
          mountRef.current.removeChild(renderer.domElement);
        }
        
        // Dispose resources
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        particles.geometry.dispose();
        if (particles.material instanceof THREE.Material) {
          particles.material.dispose();
        }
        
        // Dispose resources
        particleSystems.forEach(system => {
          system.geometry.dispose();
          if (system.material instanceof THREE.Material) {
            system.material.dispose();
          }
        });
        
        // Clean up starfield
        starLayers.forEach(layer => {
          layer.stars.geometry.dispose();
          if (layer.stars.material instanceof THREE.Material) {
            layer.stars.material.dispose();
          }
        });
        
        // Clean up shooting stars
        shootingStars.active.forEach(star => {
          scene.remove(star.mesh);
          scene.remove(star.trail);
          star.mesh.geometry.dispose();
          if (star.mesh.material instanceof THREE.Material) {
            star.mesh.material.dispose();
          }
          star.trail.geometry.dispose();
          if (star.trail.material instanceof THREE.Material) {
            star.trail.material.dispose();
          }
        });
        shootingStars.geometry.dispose();
        shootingStars.material.dispose();
        shootingStars.trailGeometry.dispose();
        shootingStars.trailMaterial.dispose();
        
        renderer.dispose();
      } catch (error) {
        console.error('Cleanup error:', error);
      }
    };
  }, [mousePosition]);

  return (
    <section
      id="about"
      className="section relative overflow-hidden bg-gradient-to-b from-gray-light to-background"
    >
      {/* Three.js animation background */}
      <div 
        ref={mountRef}
        className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden"
        aria-hidden="true"
      />
      
      {/* Fallback/supplementary background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-[-2]">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-40 right-1/4 w-48 h-48 bg-accent/10 rounded-full filter blur-3xl"></div>
      </div>

      {/* Main content with a higher z-index to appear above the animation */}
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 flex flex-col gap-6">
            <div>
              <div className="inline-block mb-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-semibold">
                Senior Software Engineer & DevOps Expert
              </div>
              <h1 className="heading-xl mb-4 animate-fade-in">
                <span className="text-gradient">Libin Mathew</span>
              </h1>
              <h2 className="text-xl font-semibold text-gray-dark mb-6 animate-fade-in-delay-1">
                Building scalable systems and cloud infrastructure
              </h2>
              <p className="text-lg mb-8 animate-fade-in-delay-2 max-w-xl">
                Results-driven Node.js Backend Developer with extensive DevOps
                expertise focused on TypeScript, AWS CDK, and cloud
                infrastructure automation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-3">
              <a
                href="mailto:libinmathewancheril@gmail.com"
                className="btn btn-primary focus-ring group"
                aria-label="Email Libin Mathew"
              >
                Contact Me
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>

            <div className="flex flex-wrap gap-6 mt-4 animate-fade-in-delay-4">
              <div className="flex items-center gap-2 bg-gray-light/60 p-2.5 px-3 rounded-full border border-gray/40 backdrop-blur-sm">
                <Image
                  src="/icons/location.svg"
                  alt="Location"
                  width={18}
                  height={18}
                  className="text-gray-dark"
                />
                <span className="text-sm">Kerala, India</span>
              </div>
              <a
                href="mailto:libinmathewancheril@gmail.com"
                className="flex items-center gap-2 hover:text-primary transition-colors bg-gray-light/60 p-2.5 px-3 rounded-full border border-gray/40 backdrop-blur-sm focus-ring"
                aria-label="Email Libin Mathew"
              >
                <Image
                  src="/icons/mail.svg"
                  alt="Email"
                  width={18}
                  height={18}
                />
                <span className="text-sm">libinmathewancheril@gmail.com</span>
              </a>
              <a
                href="https://github.com/libinmath3w"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors bg-gray-light/60 p-2.5 px-3 rounded-full border border-gray/40 backdrop-blur-sm focus-ring"
                aria-label="Visit Libin's GitHub profile"
              >
                <Image
                  src="/icons/github.svg"
                  alt="GitHub"
                  width={18}
                  height={18}
                />
                <span className="text-sm">github.com/libinmath3w</span>
              </a>
              <a
                href="https://linkedin.com/in/libinmath3w"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors bg-gray-light/60 p-2.5 px-3 rounded-full border border-gray/40 backdrop-blur-sm focus-ring"
                aria-label="Visit Libin's LinkedIn profile"
              >
                <Image
                  src="/icons/linkedin.svg"
                  alt="LinkedIn"
                  width={18}
                  height={18}
                />
                <span className="text-sm">linkedin.com/in/libinmath3w</span>
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center items-center">
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-70 blur-md animate-pulse"></div>

              <div className="relative h-72 w-72 sm:h-80 sm:w-80 rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary p-1 animate-float shadow-2xl">
                <div className="absolute inset-1 bg-background rounded-full flex items-center justify-center bg-opacity-95">
                  <div className="text-8xl font-bold text-gradient">LM</div>
                </div>
              </div>

              {/* Orbit elements */}
              <div
                className="absolute top-0 left-0 right-0 bottom-0 animate-spin-slow"
                style={{ animationDuration: "15s" }}
              >
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm border border-primary/30">
                    <span className="text-xs font-bold">AWS</span>
                  </div>
                </div>
              </div>

              <div
                className="absolute top-0 left-0 right-0 bottom-0 animate-spin-slow"
                style={{
                  animationDuration: "20s",
                  animationDirection: "reverse",
                }}
              >
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center backdrop-blur-sm border border-secondary/30">
                    <span className="text-xs font-bold">TS</span>
                  </div>
                </div>
              </div>

              <div
                className="absolute top-0 left-0 right-0 bottom-0 animate-spin-slow"
                style={{ animationDuration: "25s" }}
              >
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center backdrop-blur-sm border border-accent/30">
                    <span className="text-xs font-bold">Node</span>
                  </div>
                </div>
              </div>

              <div
                className="absolute top-0 left-0 right-0 bottom-0 animate-spin-slow"
                style={{
                  animationDuration: "30s",
                  animationDirection: "reverse",
                }}
              >
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center backdrop-blur-sm border border-accent/30">
                    <span className="text-xs font-bold">Azure</span>
                  </div>
                </div>
              </div>
              <div
                className="absolute top-0 left-0 right-0 bottom-0 animate-spin-slow"
                style={{ animationDuration: "35s" }}
              >
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center backdrop-blur-sm border border-accent/30">
                    <span className="text-xs font-bold">K8S</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center opacity-70">
        <span className="text-sm mb-2">Scroll</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
