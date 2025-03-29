'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ThreeAnimation = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasWebGLSupport, setHasWebGLSupport] = useState(true);
  const [usingSoftwareRenderer, setUsingSoftwareRenderer] = useState(false);

  // Add function to create CSS background gradient animation as fallback
  const createCSSFallbackAnimation = (container: HTMLDivElement) => {
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
      
      container.appendChild(orb);
    }
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Enhanced WebGL support detection
    const detectWebGLCapabilities = (): { supported: boolean; software: boolean } => {
      try {
        const canvas = document.createElement('canvas');
        
        // Try WebGL2 first, then WebGL1
        const gl = 
          (canvas.getContext('webgl2') as WebGL2RenderingContext | null) || 
          (canvas.getContext('webgl') as WebGLRenderingContext | null) ||
          (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
        
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
      renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: true // This will cause it to fail rather than use software rendering
      });
      
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
      renderer.setClearColor(0x000000, 0); // Transparent background
      
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

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x5f9ea0, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    // Create distant starfield
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
        
        // Use a custom shader material for the stars
        const starMaterial = new THREE.ShaderMaterial({
          uniforms: {
            time: { value: 0 },
            pixelRatio: { value: window.devicePixelRatio }
          },
          vertexShader: `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            uniform float time;
            void main() {
              vColor = color;
              // Subtle position variation based on time
              vec3 pos = position;
              pos.x += sin(time * 0.001 + position.z * 0.5) * 0.2;
              pos.y += cos(time * 0.0015 + position.x * 0.5) * 0.2;
              vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
              gl_PointSize = size * (50.0 / -mvPosition.z) * pixelRatio;
              gl_Position = projectionMatrix * mvPosition;
            }
          `,
          fragmentShader: `
            varying vec3 vColor;
            void main() {
              // Create a circular point with soft edges
              vec2 center = gl_PointCoord - 0.5;
              float dist = length(center);
              if (dist > 0.5) discard;
              
              // Apply soft glow to edges
              float strength = 1.0 - dist * 2.0;
              strength = pow(strength, 1.5);
              
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
      
      // Create multiple star layers at different distances
      return [
        createStarLayer(2000, 0.5, 50, 0xffffff), // Distant small stars
        createStarLayer(1000, 0.8, 40, 0xaaaaff), // Medium distance stars
        createStarLayer(500, 1.2, 30, 0xffffee), // Closer larger stars
        createStarLayer(200, 1.6, 20, 0xffffff)  // Very close bright stars
      ];
    };
    
    const starLayers = createStarfield();
    
    // Create particle systems with different properties
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
        
        // Random velocities for animation
        velocities[i] = (Math.random() - 0.5) * 0.005;
        velocities[i + 1] = (Math.random() - 0.5) * 0.005;
        velocities[i + 2] = (Math.random() - 0.5) * 0.005;
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
    
    // Create multiple particle systems for more dynamic effect
    const particleSystems = [
      // Main particles (teal)
      createParticleSystem(500, 0.04, 0x5f9ea0, 0.7, 8),
      // Secondary particles (purple)
      createParticleSystem(150, 0.06, 0x9370db, 0.6, 6),
      // Accent particles (light blue)
      createParticleSystem(75, 0.08, 0x87ceeb, 0.5, 4)
    ];
    
    particleSystems.forEach(system => scene.add(system));
    
    // Create nebula-like effect with colored planes
    const createNebula = () => {
      const nebulaMaterial = new THREE.MeshBasicMaterial({
        color: 0x5f9ea0,
        transparent: true,
        opacity: 0.05,
        side: THREE.DoubleSide
      });
      
      const nebulaGeometry = new THREE.PlaneGeometry(15, 15);
      const nebulaMeshes = [];
      
      // Create multiple semi-transparent planes at different angles
      for (let i = 0; i < 5; i++) {
        const nebulaMesh = new THREE.Mesh(nebulaGeometry, nebulaMaterial.clone());
        nebulaMesh.rotation.x = Math.random() * Math.PI;
        nebulaMesh.rotation.y = Math.random() * Math.PI;
        nebulaMesh.rotation.z = Math.random() * Math.PI;
        nebulaMesh.material.color.setHSL(0.6 + Math.random() * 0.1, 0.7, 0.5);
        nebulaMesh.material.opacity = 0.02 + Math.random() * 0.06;
        nebulaMesh.position.set(
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4
        );
        scene.add(nebulaMesh);
        nebulaMeshes.push(nebulaMesh);
      }
      
      return nebulaMeshes;
    };
    
    const nebulaMeshes = createNebula();
    
    // Add subtle glow effect
    const createGlow = () => {
      const glowGeometry = new THREE.SphereGeometry(4, 32, 32);
      const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
          glowColor: { value: new THREE.Color(0x5f9ea0) },
          time: { value: 0 }
        },
        vertexShader: `
          varying vec3 vPosition;
          void main() {
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          uniform float time;
          varying vec3 vPosition;
          void main() {
            float intensity = 0.05 - length(vPosition) * 0.01;
            intensity = intensity * (0.8 + 0.2 * sin(time * 0.5));
            gl_FragColor = vec4(glowColor, intensity);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });
      
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      scene.add(glowMesh);
      
      return glowMesh;
    };
    
    const glowMesh = createGlow();
    
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
        
        // Update shooting stars
        shootingStars.update();
        
        // Update star layer shaders
        starLayers.forEach(layer => {
          if (layer.material instanceof THREE.ShaderMaterial) {
            layer.material.uniforms.time.value = time * 1000;
          }
        });
        
        // Update the glow effect
        if (glowMesh.material instanceof THREE.ShaderMaterial) {
          glowMesh.material.uniforms.time.value = time;
        }
        
        // Rotate the scene container slowly
        scene.rotation.y += 0.0005;
        scene.rotation.x += 0.0002;
        
        // Rotate nebula planes individually for more dynamic effect
        nebulaMeshes.forEach((mesh, i) => {
          mesh.rotation.x += 0.0001 * (i + 1);
          mesh.rotation.y += 0.0002 * (i + 1);
        });
        
        // Animate particles with their velocities
        particleSystems.forEach(system => {
          const positions = (system.geometry.attributes.position as THREE.BufferAttribute).array;
          const velocities = system.geometry.userData.velocities;
          
          for (let i = 0; i < positions.length; i += 3) {
            // Apply velocity
            positions[i] += velocities[i];
            positions[i + 1] += velocities[i + 1];
            positions[i + 2] += velocities[i + 2];
            
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
        
        // Subtle movement based on mouse position
        particleSystems.forEach((system, index) => {
          system.rotation.z += 0.0005 * (index + 1);
          system.position.x = mousePosition.x * 0.1 * (index + 1);
          system.position.y = mousePosition.y * 0.1 * (index + 1);
        });
        
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
        
        if (glowMesh.material instanceof THREE.Material) {
          glowMesh.material.dispose();
        }
        glowMesh.geometry.dispose();
        
        nebulaMeshes.forEach(mesh => {
          mesh.geometry.dispose();
          if (mesh.material instanceof THREE.Material) {
            mesh.material.dispose();
          }
        });
        
        renderer.dispose();
      } catch (error) {
        console.error('Cleanup error:', error);
      }
    };
  }, [mousePosition]);
  
  // Return a hidden div if WebGL isn't supported so the CSS fallback can take over
  if (!hasWebGLSupport) {
    return (
      <div 
        ref={mountRef} 
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: -1 }}
        aria-hidden="true"
      />
    );
  }
  
  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    />
  );
};

export default ThreeAnimation; 