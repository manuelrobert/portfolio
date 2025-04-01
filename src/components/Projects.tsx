"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ResumeModal from './ResumeModal';

const Projects = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  
  // Structured project data for better maintainability
  const projects = [
    {
      title: "ELK Stack Implementation",
      description: "Implemented ELK stack integrated with Redmine, SCM, and code analysis tools to provide centralized visibility into software development activities, code quality, and security.",
      skills: ["ELK Stack", "Elasticsearch", "Logstash", "Kibana", "Filebeat"],
      icon: "📊",
      highlight: true
    },
    {
      title: "Cloud Application Development",
      description: "Developed and deployed applications using AWS services including EC2, S3, and Lambda, collaborating with the team to implement scalable cloud solutions.",
      skills: ["AWS", "EC2", "S3", "Lambda", "Cloud Architecture"],
      icon: "☁️",
      highlight: false
    },
    {
      title: "Backstage Developer Portal",
      description: "Customized and implemented features for Backstage developer portal, improving team workflows and documentation accessibility.",
      skills: ["Backstage", "Developer Experience", "Documentation", "Node.js"],
      icon: "🚀",
      highlight: true
    },
    {
      title: "RESTful API Development",
      description: "Worked with Node.js and Express to build RESTful APIs, integrating various AWS services like DynamoDB and SQS for efficient data handling.",
      skills: ["Node.js", "Express", "RESTful APIs", "DynamoDB", "SQS"],
      icon: "⚙️",
      highlight: false
    },
    {
      title: "HR Management Application",
      description: "Contributed to the development and enhancement of a cloud-native HR Management application using Angular, Node.js, Express, and DynamoDB.",
      skills: ["Angular", "Node.js", "Express", "DynamoDB", "Cloud-Native"],
      icon: "👥",
      highlight: false
    },
    {
      title: "Campulse Digital Platform",
      description: "Designed and launched Campulse, a digital platform for educational institutions, successfully implemented at Nirmala College, Muvattupuzha.",
      skills: ["React", "Web Development", "Educational Technology"],
      icon: "🎓",
      highlight: true
    }
  ];

  // Animation variants for Framer Motion
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <section id="projects" className="section bg-gray-light relative">
        {/* Enhanced background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 blur-3xl"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-secondary/5 to-accent/5 blur-3xl"
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.3, 0.4, 0.3]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        
        <div className="container-custom relative">
          <motion.div 
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Project Portfolio
            </h2>
            <p className="text-xl text-gray-dark max-w-3xl mx-auto">
              Key projects showcasing professional experience and technical skills
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {projects.map((project, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className={`glass-effect card-hover card-shimmer p-6 relative h-full flex flex-col justify-between overflow-hidden group ${
                  project.highlight ? 'border-primary/30' : ''
                }`}
                whileHover={{ 
                  y: -6, 
                  boxShadow: '0 25px 35px -12px rgba(0, 0, 0, 0.2)',
                }}
                transition={{ duration: 0.4 }}
              >
                {project.highlight && (
                  <motion.div 
                    className="absolute -right-1 -top-1 px-2 py-1 bg-primary text-white text-xs font-semibold rounded-bl-md shadow-md z-10"
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    Featured
                  </motion.div>
                )}
                
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <motion.div 
                      className="text-3xl bg-white/10 dark:bg-gray-light/10 p-3 rounded-lg shadow-inner" 
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: 5,
                        backgroundColor: project.highlight ? 'rgba(var(--primary-rgb), 0.15)' : 'rgba(var(--secondary-rgb), 0.15)'
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {project.icon}
                    </motion.div>
                  </div>
                  <motion.h3 
                    className="text-xl font-bold mb-3 text-primary"
                    whileHover={{ x: 2 }}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.p 
                    className="mb-6 text-foreground/80"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {project.description}
                  </motion.p>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.skills.slice(0, 3).map((skill, idx) => (
                    <motion.span 
                      key={idx} 
                      className="badge"
                      whileHover={{ 
                        y: -2, 
                        backgroundColor: 'rgba(var(--primary-rgb), 0.1)',
                        borderColor: 'rgba(var(--primary-rgb), 0.3)'
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
                
                {/* Subtle gradient background effect */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-transparent via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-16 p-8 rounded-2xl glass-effect card-shimmer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ 
              y: -5,
              boxShadow: '0 25px 35px -12px rgba(0, 0, 0, 0.15)'
            }}
          >
            <h3 className="text-2xl font-bold text-primary mb-4">Professional Achievements</h3>
            <p className="text-gray-dark mb-6">
              Received both "On The Fly" award (Dec 2022) and Employee of the Quarter (Feb 2023) for outstanding technical contributions. Continuously improving skills and exploring new technologies.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a 
                href="https://github.com/manuelrobert" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-5 py-2 text-sm rounded-full font-medium flex items-center gap-2 focus-ring"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View GitHub Profile
              </motion.a>
              <motion.button 
                onClick={() => setIsResumeModalOpen(true)}
                className="btn-outline px-5 py-2 text-sm rounded-full font-medium flex items-center gap-2 focus-ring"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-4 h-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
                Download Resume
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </>
  );
};

export default Projects; 