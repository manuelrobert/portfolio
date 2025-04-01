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
      className={`glass-effect card-hover card-shimmer p-6 ${className}`}
      whileHover={{ 
        y: -5, 
        boxShadow: '0 20px 30px -10px rgba(0, 0, 0, 0.15)'
      }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );

  return (
    <section id="education" className="section bg-background relative">
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 w-full h-1/3 bg-gradient-to-b from-gray-light/50 to-transparent opacity-70"></div>
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-gray-light/50 to-transparent opacity-70"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-primary/10 filter blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-secondary/10 filter blur-3xl"></div>
      </div>
      
      <div className="container-custom">
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-lg mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Education & Skills
          </h2>
          <p className="text-xl text-gray-dark max-w-3xl mx-auto">
            Academic background and technical expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Education Section */}
          <div className="relative">
            {/* Enhanced blur element */}
            <motion.div 
              className="absolute top-0 left-0 w-20 h-20 -translate-x-1/4 -translate-y-1/4 rounded-full bg-primary/20 filter blur-xl"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.h3 
              className="heading-md mb-8 text-primary"
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
                className="absolute top-2 bottom-0 left-8 w-0.5 bg-gradient-to-b from-primary to-transparent"
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
              />
              
              {educationData.map((edu, index) => (
                <motion.div 
                  key={index} 
                  className="relative pl-20 group"
                  variants={itemVariants}
                >
                  {/* Enhanced timeline dot */}
                  <motion.div 
                    className="absolute left-0 top-2 w-16 h-16 rounded-full bg-gray-light flex items-center justify-center 
                      border-4 border-background shadow-lg z-10"
                    whileHover={{ 
                      scale: 1.1, 
                      borderColor: 'rgba(var(--primary-rgb), 0.3)'
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <motion.div 
                      className="text-primary font-bold"
                      whileHover={{ scale: 1.1 }}
                    >
                      {edu.period.split('–')[0]}
                    </motion.div>
                  </motion.div>
                  
                  <Card>
                    <motion.h4 
                      className="text-xl font-bold mb-2 text-gradient"
                      whileHover={{ x: 2 }}
                    >
                      {edu.degree}
                    </motion.h4>
                    <p className="text-gray-dark mb-2">{edu.institution}</p>
                    <p className="text-sm text-foreground/70">{edu.period}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Skills Section */}
          <div className="relative">
            {/* Enhanced blur element */}
            <motion.div 
              className="absolute top-0 right-0 w-20 h-20 translate-x-1/4 -translate-y-1/4 rounded-full bg-secondary/20 filter blur-xl"
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.7, 0.5]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.h3 
              className="heading-md mb-8 text-primary"
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
                      className="text-lg font-semibold mb-3 text-gradient"
                      whileHover={{ x: 2 }}
                    >
                      {group.title}
                    </motion.h4>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill, idx) => (
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