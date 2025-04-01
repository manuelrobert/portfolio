"use client"
import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  // Simplified experiences data structure
  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "Quest Global",
      period: "October 2024 – Present",
      responsibilities: [
        "Implementing ELK stack integrated with Redmine, SCM, and code analysis tools to provide centralized visibility into software development activities, code quality, and security.",
        "Conducted in-depth investigations on Logstash for efficient data ingestion into Elasticsearch.",
        "Utilized Filebeat for seamless data shipment, ensuring timely and accurate transfer of logs to the ELK stack for comprehensive analysis and reporting.",
        "Orchestrated containerized applications using Docker and Kubernetes in AWS environment.",
        "Implemented microservices architecture using Docker containers for scalable deployment."
      ]
    },
    {
      title: "Software Engineer",
      company: "Quest Global",
      period: "September 2022 – October 2024",
      responsibilities: [
        "Developed and deployed applications using AWS services including EC2, S3, and Lambda, collaborating with the team to implement scalable cloud solutions.",
        "Customized and implemented features for Backstage developer portal, improving team workflows and documentation accessibility while working with the open-source platform.",
        "Assisted in proof-of-concept development for cloud migration initiatives, helping evaluate new technologies and providing technical insights to support team decisions.",
        "Worked with Node.js and Express to build RESTful APIs, integrating various AWS services like DynamoDB and SQS for efficient data handling.",
        "Received both 'On The Fly' award (Dec 2022) and Employee of the Quarter (Feb 2023) for outstanding technical contributions."
      ]
    },
    {
      title: "Full Stack Developer",
      company: "Exlygenze Senseworks PVT LTD",
      period: "September 2021 – September 2022",
      responsibilities: [
        "Contributed to the development and enhancement of a cloud-native HR Management application using Angular, Node.js, Express, and DynamoDB while working effectively within cross-functional teams.",
        "Developed and maintained RESTful APIs using Node.js and Express, implementing SSO authentication through AWS Cognito and Azure AD for secure user access.",
        "Collaborated on CI/CD pipeline improvements using Jenkins and GitHub Actions, writing comprehensive unit tests with Jest and maintaining high code coverage standards."
      ]
    },
    {
      title: "Freelance Developer",
      company: "Self-employed",
      period: "2019 – 2021",
      responsibilities: [
        "Developed React-based cloud security assessment application for international clients.",
        "Designed and launched Campulse, a digital platform for educational institutions.",
        "Successfully implemented Campulse at Nirmala College, Muvattupuzha."
      ]
    }
  ];

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
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
    <section id="experience" className="section bg-background relative overflow-hidden py-20">
      {/* Beautiful background gradient elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <motion.div 
          className="absolute -top-96 -right-96 w-[800px] h-[800px] rounded-full bg-primary/20 blur-3xl"
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
          className="absolute -bottom-96 -left-96 w-[800px] h-[800px] rounded-full bg-secondary/20 blur-3xl"
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
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full border border-primary/10 opacity-30"
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
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full border border-secondary/10 opacity-20"
          animate={{ 
            rotate: [360, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      <div className="container-custom relative">
        {/* Section header with enhanced animation */}
        <motion.div 
          className="mb-20 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="heading-lg mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-bold">
              Professional Experience
            </h2>
          </motion.div>
          <motion.p 
            className="text-xl text-gray-dark max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            Over 3 years of experience developing full-stack applications and implementing DevOps solutions
          </motion.p>
        </motion.div>
        
        {/* Timeline container */}
        <div className="max-w-5xl mx-auto relative">
          {/* Center timeline line */}
          <motion.div 
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/60 via-secondary/60 to-primary/20 transform -translate-x-1/2 rounded-full z-10"
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: '100%', opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{ boxShadow: '0 0 10px rgba(var(--primary-rgb), 0.15)' }}
          />
          
          {/* Mobile timeline line */}
          <motion.div 
            className="md:hidden absolute left-[15px] top-0 bottom-0 w-1 bg-gradient-to-b from-primary/60 via-secondary/60 to-primary/20 rounded-full z-10"
            initial={{ height: 0, opacity: 0 }}
            whileInView={{ height: '100%', opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{ boxShadow: '0 0 8px rgba(var(--primary-rgb), 0.15)' }}
          />
          
          {/* Experience items */}
          <div className="relative">
            {experiences.map((experience, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className="mb-24 last:mb-8 relative">
                  {/* Timeline dot for desktop */}
                  <motion.div 
                    className="hidden md:flex absolute left-1/2 top-7 w-5 h-5 -ml-2.5 rounded-full bg-gradient-to-tr from-primary/80 via-secondary/80 to-primary/80 border border-white/20 shadow-md z-20 items-center justify-center"
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    whileInView={{ 
                      scale: 1, 
                      opacity: 1,
                      boxShadow: '0 0 0 4px rgba(var(--primary-rgb), 0.08), 0 0 0 7px rgba(var(--primary-rgb), 0.03)'
                    }}
                    whileHover={{ 
                      scale: 1.4, 
                      boxShadow: '0 0 10px 2px rgba(var(--primary-rgb), 0.25), 0 0 0 6px rgba(var(--primary-rgb), 0.05)' 
                    }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300, 
                      damping: 15 
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/90 animate-pulse"></div>
                  </motion.div>
                  
                  {/* Timeline dot for mobile */}
                  <motion.div 
                    className="md:hidden absolute left-[15px] top-7 w-5 h-5 -ml-2.5 rounded-full bg-gradient-to-tr from-primary/80 via-secondary/80 to-primary/80 border border-white/20 shadow-md z-20 flex items-center justify-center"
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    whileInView={{ 
                      scale: 1, 
                      opacity: 1,
                      boxShadow: '0 0 0 4px rgba(var(--primary-rgb), 0.08)'
                    }}
                    whileHover={{ scale: 1.4 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300, 
                      damping: 15 
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white/90 animate-pulse"></div>
                  </motion.div>

                  {/* Mobile view (always shown on mobile) */}
                  <div className="md:hidden pl-12">
                    <div className="mb-3">
                      <h3 className="text-2xl font-bold mb-1 text-gradient">
                        {experience.title}
                      </h3>
                      <div className="text-primary font-semibold">
                        {experience.company}
                      </div>
                      <div className="text-gray-dark text-sm mt-1">
                        {experience.period}
                      </div>
                    </div>
                    
                    <motion.div 
                      className="bg-white/5 dark:bg-gray-light/5 card-hover p-6 rounded-xl border border-white/10 dark:border-white/5 backdrop-blur-[2px] shadow-md"
                      whileHover={{ 
                        y: -5,
                        boxShadow: '0 15px 30px -10px rgba(0, 0, 0, 0.15)',
                        backgroundColor: 'rgba(var(--primary-rgb), 0.03)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ul className="space-y-3 list-disc pl-5">
                        {experience.responsibilities.map((resp, idx) => (
                          <motion.li 
                            key={idx} 
                            className="pl-1 text-gray-dark" 
                            initial={{ opacity: 0.9 }}
                            whileHover={{ opacity: 1, x: 2 }}
                            transition={{ duration: 0.2 }}
                          >
                            {resp}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Desktop view with alternating layout */}
                  <div className="hidden md:flex w-full">
                    {/* Left side (even index) */}
                    <div className={`w-1/2 pr-16 text-right ${!isEven && 'invisible'}`}>
                      {isEven && (
                        <motion.div
                          initial={{ opacity: 0, x: -30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="mb-4">
                            <motion.h3 
                              className="text-2xl font-bold mb-1.5 text-gradient inline-block"
                              whileHover={{ x: -3 }}
                              transition={{ duration: 0.2 }}
                            >
                              {experience.title}
                            </motion.h3>
                            <motion.div 
                              className="text-primary font-semibold text-lg"
                              whileHover={{ x: -2 }}
                              transition={{ duration: 0.2 }}
                            >
                              {experience.company}
                            </motion.div>
                            <div className="text-gray-dark text-sm mt-1.5 font-medium inline-block bg-white/10 dark:bg-gray/5 px-3 py-0.5 rounded-full backdrop-blur-sm">
                              {experience.period}
                            </div>
                          </div>
                          
                          <motion.div 
                            className="bg-white/5 dark:bg-gray-light/5 card-hover p-7 rounded-2xl border border-white/10 dark:border-white/5 backdrop-blur-[2px] relative overflow-hidden shadow-lg"
                            whileHover={{ 
                              y: -8,
                              boxShadow: '0 20px 40px -15px rgba(var(--primary-rgb), 0.15)',
                              backgroundColor: 'rgba(var(--primary-rgb), 0.03)'
                            }}
                            transition={{ duration: 0.4 }}
                          >
                            {/* Subtle decorative element */}
                            <div className="absolute top-0 right-0 w-1/2 h-0.5 bg-gradient-to-l from-primary/10 to-transparent"></div>
                            
                            <ul className="space-y-4 list-disc marker:text-primary/60 pl-6">
                              {experience.responsibilities.map((resp, idx) => (
                                <motion.li 
                                  key={idx} 
                                  className="pl-1 text-gray-dark"
                                  initial={{ opacity: 0.9 }}
                                  whileHover={{ opacity: 1, x: -2 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {resp}
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Right side (odd index) */}
                    <div className={`w-1/2 pl-16 ${isEven && 'invisible'}`}>
                      {!isEven && (
                        <motion.div
                          initial={{ opacity: 0, x: 30 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="mb-4">
                            <motion.h3 
                              className="text-2xl font-bold mb-1.5 text-gradient inline-block"
                              whileHover={{ x: 3 }}
                              transition={{ duration: 0.2 }}
                            >
                              {experience.title}
                            </motion.h3>
                            <motion.div 
                              className="text-primary font-semibold text-lg"
                              whileHover={{ x: 2 }}
                              transition={{ duration: 0.2 }}
                            >
                              {experience.company}
                            </motion.div>
                            <div className="text-gray-dark text-sm mt-1.5 font-medium inline-block bg-white/10 dark:bg-gray/5 px-3 py-0.5 rounded-full backdrop-blur-sm">
                              {experience.period}
                            </div>
                          </div>
                          
                          <motion.div 
                            className="bg-white/5 dark:bg-gray-light/5 card-hover p-7 rounded-2xl border border-white/10 dark:border-white/5 backdrop-blur-[2px] relative overflow-hidden shadow-lg"
                            whileHover={{ 
                              y: -8,
                              boxShadow: '0 20px 40px -15px rgba(var(--primary-rgb), 0.15)',
                              backgroundColor: 'rgba(var(--primary-rgb), 0.03)'
                            }}
                            transition={{ duration: 0.4 }}
                          >
                            {/* Subtle decorative element */}
                            <div className="absolute top-0 left-0 w-1/2 h-0.5 bg-gradient-to-r from-primary/10 to-transparent"></div>
                            
                            <ul className="space-y-4 list-disc marker:text-primary/60 pl-6">
                              {experience.responsibilities.map((resp, idx) => (
                                <motion.li 
                                  key={idx} 
                                  className="pl-1 text-gray-dark"
                                  initial={{ opacity: 0.9 }}
                                  whileHover={{ opacity: 1, x: 2 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {resp}
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 