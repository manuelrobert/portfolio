'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

const Education = () => {
  // Combined data structure for better maintainability
  const educationData = [
    {
      degree: "Master of Computer Application",
      institution: "College of Engineering Trivandrum",
      period: "2019 – 2021",
    },
    {
      degree: "Bachelor of Computer Application",
      institution: "Nirmala College",
      period: "2016 – 2019",
    }
  ];

  // Organized skill groups for easier maintenance
  const skillGroups = [
    {
      title: "Frontend",
      skills: ["ReactJS", "AngularJS", "JavaScript"]
    },
    {
      title: "Backend",
      skills: ["NodeJS", "ExpressJS", "Flask", "Python"]
    },
    {
      title: "Databases",
      skills: ["MySQL", "MongoDB", "DynamoDB"]
    },
    {
      title: "DevOps",
      skills: ["Docker", "Kubernetes", "Jenkins", "Bamboo", "Terraform"]
    },
    {
      title: "Cloud",
      skills: ["AWS", "Azure"]
    },
    {
      title: "Tools",
      skills: ["ELK Stack", "Backstage", "Redmine", "SonarQube", "Coverity"]
    },
    {
      title: "Operating Systems",
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

  // Reusable enhanced card component
  const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
    <motion.div 
      className={`bg-white/5 dark:bg-gray-light/5 p-6 rounded-xl border border-white/10 dark:border-white/5 backdrop-blur-[2px] shadow-md ${className}`}
      whileHover={{ 
        y: -5, 
        boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.15)',
        backgroundColor: 'rgba(var(--primary-rgb), 0.03)'
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );

  return (
    <section id="education" className="section bg-background relative">
      {/* Enhanced background decoration */}
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
        
        {/* Additional decorative elements */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-48 h-48 rounded-full border border-primary/10 opacity-30"
          animate={{ 
            rotate: [0, 360],
            scale: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
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
              Education & Skills
            </h2>
          </motion.div>
          <motion.p 
            className="text-xl text-gray-dark max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Academic background and technical expertise
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Education Section */}
          <div className="relative">
            <motion.h3 
              className="heading-md mb-8 text-primary/90 font-semibold tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Education
            </motion.h3>
            
            <motion.div 
              className="space-y-10 relative"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Enhanced timeline line with animation */}
              <motion.div 
                className="absolute top-2 bottom-0 left-8 w-0.5 bg-gradient-to-b from-primary/60 via-secondary/60 to-primary/20"
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                style={{ boxShadow: '0 0 8px rgba(var(--primary-rgb), 0.1)' }}
              />
              
              {educationData.map((edu, index) => (
                <motion.div 
                  key={index} 
                  className="relative pl-20 group"
                  variants={itemVariants}
                >
                  {/* Enhanced timeline dot */}
                  <motion.div 
                    className="absolute left-0 top-2 w-16 h-16 rounded-full bg-white/5 dark:bg-gray-light/5 flex items-center justify-center 
                      border border-white/20 shadow-md z-10 backdrop-blur-[1px]"
                    whileHover={{ 
                      scale: 1.05, 
                      borderColor: 'rgba(var(--primary-rgb), 0.2)',
                      boxShadow: '0 5px 15px -5px rgba(var(--primary-rgb), 0.15)'
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <motion.div 
                      className="text-primary/80 font-medium"
                      whileHover={{ scale: 1.05 }}
                    >
                      {edu.period.split('–')[0]}
                    </motion.div>
                  </motion.div>
                  
                  <Card>
                    <motion.h4 
                      className="text-xl font-bold mb-2 text-gradient inline-block tracking-tight"
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {edu.degree}
                    </motion.h4>
                    <p className="text-primary font-medium mb-2">{edu.institution}</p>
                    <p className="text-sm text-gray-dark mt-1 font-light">{edu.period}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Skills Section */}
          <div className="relative">
            <motion.h3 
              className="heading-md mb-8 text-primary/90 font-semibold tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              Skills
            </motion.h3>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {skillGroups.map((group, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                >
                  <Card>
                    <motion.h4 
                      className="text-lg font-semibold mb-3 text-gradient inline-block tracking-tight"
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      {group.title}
                    </motion.h4>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, idx) => (
                        <motion.span 
                          key={idx} 
                          className="bg-white/10 dark:bg-gray/5 px-3 py-1 rounded-full text-sm text-gray-dark border border-white/10 dark:border-white/5"
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
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education; 