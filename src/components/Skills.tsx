'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Simplified WebGL detector
const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
};

const Skills = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  
  // Optimized Three.js setup
  useEffect(() => {
    if (!isWebGLAvailable() || !canvasRef.current) {
      setWebGLSupported(false);
      return;
    }
    
    // Initialize scene elements
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    let renderer: THREE.WebGLRenderer;
    
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        alpha: true,
        antialias: true,
        powerPreference: 'default',
      });
    } catch (error) {
      console.error("WebGL renderer creation failed:", error);
      setWebGLSupported(false);
      return;
    }
    
    // Configure renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Create optimized particles
    const particlesCount = 300; // Reduced particle count
    const particlesGeometry = new THREE.BufferGeometry();
    const positionArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    // More efficient particle generation
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position (xyz coordinates)
      positionArray[i] = (Math.random() - 0.5) * 10;     // x
      positionArray[i+1] = (Math.random() - 0.5) * 10;   // y
      positionArray[i+2] = (Math.random() - 0.5) * 10;   // z
      
      // Color (rgb values)
      colorArray[i] = 0.5 + Math.random() * 0.2;         // r (primary color)
      colorArray[i+1] = 0.2 + Math.random() * 0.2;       // g (secondary color)
      colorArray[i+2] = 0.7 + Math.random() * 0.3;       // b (accent color)
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    // Simplified material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      sizeAttenuation: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.7
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    camera.position.z = 3;
    
    // Efficient resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Optimized animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Simple rotation animation
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = elapsedTime * 0.03;
      
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate);
    };
    
    animate();
    
    // Proper cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      scene.remove(particles);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // Simplified skill categories
  const skillCategories = [
    {
      title: "Frontend",
      icon: "🖥️",
      skills: ["ReactJS", "AngularJS", "JavaScript"]
    },
    {
      title: "Backend",
      icon: "⚙️",
      skills: ["NodeJS", "ExpressJS", "Flask", "Python"]
    },
    {
      title: "Databases",
      icon: "🗃️",
      skills: ["MySQL", "MongoDB", "DynamoDB"]
    },
    {
      title: "DevOps",
      icon: "🚀",
      skills: ["Docker", "Kubernetes", "Jenkins", "Bamboo", "Terraform"]
    },
    {
      title: "Cloud",
      icon: "☁️",
      skills: ["AWS", "Azure"]
    },
    {
      title: "Tools",
      icon: "🔧",
      skills: ["ELK Stack", "Backstage", "Redmine", "SonarQube", "Coverity"]
    },
    {
      title: "Operating Systems",
      icon: "💻",
      skills: ["Linux", "Windows", "MacOS"]
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="skills" className="section bg-background relative">
      {/* WebGL background canvas with conditional rendering */}
      {webGLSupported ? (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 -z-10 opacity-40 transition-opacity duration-1000"
        />
      ) : (
        <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
          <motion.div 
            className="absolute -top-96 -right-96 w-[600px] h-[600px] rounded-full bg-primary/20 blur-3xl"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute -bottom-96 -left-96 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-3xl"
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.2, 0.15]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      )}
      
      <div className="container-custom">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-bold">
              Technical Skills
            </h2>
          </motion.div>
          <motion.p 
            className="text-xl text-gray-dark max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Knowledge and expertise in various technologies and tools
          </motion.p>
        </motion.div>
        
        {/* Skills grid with optimized rendering */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative overflow-hidden"
              onMouseEnter={() => setActiveCategory(index)}
              onMouseLeave={() => setActiveCategory(null)}
              whileHover={{ 
                y: -8,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' 
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="relative z-10 h-full bg-white/5 dark:bg-gray-light/5 border border-white/10 dark:border-white/5 
                backdrop-blur-[2px] p-6 rounded-xl shadow-md"
              >
                <div className="flex items-center gap-3 mb-6">
                  <motion.div 
                    className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 
                          border border-white/10 flex items-center justify-center shadow-sm" 
                    whileHover={{ 
                      rotate: 5,
                      boxShadow: '0 5px 15px -3px rgba(var(--primary-rgb), 0.15)' 
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="text-xl text-gradient">{category.icon}</span>
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-bold text-gradient inline-block"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {category.title}
                  </motion.h3>
                </div>
                
                <div className="space-y-3">
                  {category.skills.map((skill, idx) => (
                    <motion.div 
                      key={idx} 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1, x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary/40"></span>
                      <span className="text-gray-dark">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              {/* Background decoration */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-40"
                whileHover={{ opacity: 0.7 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 