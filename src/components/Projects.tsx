"use client";

import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import ResumeModal from './ResumeModal';

// Define project data interface
interface ProjectData {
  title: string;
  description: string;
  icon: string;
  skills: string[];
  featured?: boolean;
  highlight?: boolean;
}

// Animation variants
const variants = {
  projects: {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1
        }
      }
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5
        }
      }
    }
  }
};

const ProjectCard = ({ project, index }: { project: ProjectData; index: number }) => {
  const controls = useAnimation();
  
  return (
    <motion.div
      className={`relative overflow-hidden`}
      variants={variants.projects.item}
      whileHover={{ 
        y: -8,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' 
      }}
      onHoverStart={() => controls.start("hover")}
      onHoverEnd={() => controls.start("initial")}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="relative z-10 h-full bg-white/5 dark:bg-gray-light/5 border border-white/10 dark:border-white/5 
        backdrop-blur-[2px] p-6 rounded-xl shadow-md flex flex-col"
      >
        {/* Featured badge */}
        {(project.featured || project.highlight) && (
          <div className="absolute -top-1 -right-1">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                className="bg-primary/10 backdrop-blur-sm text-primary/90 text-xs font-medium py-1 px-3 rounded-lg border border-primary/20"
              >
                Featured
              </motion.div>
            </div>
          </div>
        )}
  
        {/* Icon */}
        <motion.div 
          className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 
                    border border-white/10 flex items-center justify-center mb-4 shadow-sm"
          whileHover={{ 
            rotate: 5,
            boxShadow: '0 5px 15px -3px rgba(var(--primary-rgb), 0.15)' 
          }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-xl text-gradient">{project.icon}</span>
        </motion.div>
        
        {/* Title */}
        <motion.h3 
          className="text-xl font-bold mb-2 text-gradient inline-block tracking-tight"
          animate={controls}
          variants={{
            initial: { x: 0 },
            hover: { x: 3 }
          }}
          transition={{ duration: 0.2 }}
        >
          {project.title}
        </motion.h3>
        
        {/* Description */}
        <p className="text-gray-dark text-sm mb-4 flex-grow font-light leading-relaxed">
          {project.description}
        </p>
        
        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.skills.map((skill: string, idx: number) => (
            <motion.span 
              key={idx}
              className="bg-white/10 dark:bg-gray/5 px-3 py-1 rounded-full text-xs text-gray-dark border border-white/10 dark:border-white/5"
              whileHover={{ 
                y: -2, 
                backgroundColor: 'rgba(var(--primary-rgb), 0.08)',
                borderColor: 'rgba(var(--primary-rgb), 0.15)'
              }}
              transition={{ duration: 0.2 }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </motion.div>
      
      {/* Background decoration */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-40"
        animate={controls}
        variants={{
          initial: { opacity: 0.4 },
          hover: { opacity: 0.7 }
        }}
      />
    </motion.div>
  );
};

const Projects = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  
  // Structured project data for better maintainability
  const projects = [
    {
      title: "ELK Stack Implementation",
      description: "Implemented ELK stack integrated with Redmine, SCM, and code analysis tools to provide centralized visibility into software development activities, code quality, and security.",
      skills: ["ELK Stack", "Elasticsearch", "Logstash", "Kibana", "Filebeat"],
      icon: "📊",
      highlight: true,
      featured: true
    },
    {
      title: "Cloud Application Development",
      description: "Developed and deployed applications using AWS services including EC2, S3, and Lambda, collaborating with the team to implement scalable cloud solutions.",
      skills: ["AWS", "EC2", "S3", "Lambda", "Cloud Architecture"],
      icon: "☁️",
      highlight: false,
      featured: false
    },
    {
      title: "Backstage Developer Portal",
      description: "Customized and implemented features for Backstage developer portal, improving team workflows and documentation accessibility.",
      skills: ["Backstage", "Developer Experience", "Documentation", "Node.js"],
      icon: "🚀",
      highlight: true,
      featured: true
    },
    {
      title: "RESTful API Development",
      description: "Worked with Node.js and Express to build RESTful APIs, integrating various AWS services like DynamoDB and SQS for efficient data handling.",
      skills: ["Node.js", "Express", "RESTful APIs", "DynamoDB", "SQS"],
      icon: "⚙️",
      highlight: false,
      featured: false
    },
    {
      title: "HR Management Application",
      description: "Contributed to the development and enhancement of a cloud-native HR Management application using Angular, Node.js, Express, and DynamoDB.",
      skills: ["Angular", "Node.js", "Express", "DynamoDB", "Cloud-Native"],
      icon: "👥",
      highlight: false,
      featured: false
    },
    {
      title: "Campulse Digital Platform",
      description: "Designed and launched Campulse, a digital platform for educational institutions, successfully implemented at Nirmala College, Muvattupuzha.",
      skills: ["React", "Web Development", "Educational Technology"],
      icon: "🎓",
      highlight: true,
      featured: true
    }
  ];

  return (
    <section id="projects" className="section bg-background relative">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-primary/10 opacity-30"
          animate={{ 
            rotate: 360,
            scale: [1, 1.05, 1]
          }}
          transition={{
            rotate: {
              duration: 60,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
        
        <motion.div 
          className="absolute -top-96 right-0 w-[600px] h-[600px] rounded-full bg-primary/20 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.2, 0.15]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-0 -left-96 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-3xl"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
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
              Projects
            </h2>
          </motion.div>
          <motion.p 
            className="text-xl text-gray-dark max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            A showcase of my technical skills and creativity
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={variants.projects.container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button 
            className="btn-primary-outline"
            whileHover={{ 
              scale: 1.03,
              boxShadow: '0 10px 25px -5px rgba(var(--primary-rgb), 0.3)'
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => setIsResumeModalOpen(true)}
          >
            <span className="tracking-tight">View Full Resume</span>
          </motion.button>
        </motion.div>
      </div>
      
      {isResumeModalOpen && <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />}
    </section>
  );
};

export default Projects; 