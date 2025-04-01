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

  // Reusable experience card component with enhanced styling
  const ExperienceCard = ({ experience, isEven }: { experience: typeof experiences[0], isEven: boolean }) => (
    <motion.div 
      variants={itemVariants}
      className={`mb-16 relative group`}
    >
      <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}>
        {/* Enhanced timeline dot with animation */}
        <motion.div 
          className="absolute left-0 md:left-1/2 top-0 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg transform -translate-x-2.5 md:-translate-x-1/2 z-10"
          whileHover={{ scale: 1.8, backgroundColor: 'var(--secondary)' }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 10 
          }}
        />
        
        {/* Enhanced date tag with animation */}
        <div className={`hidden md:block absolute top-0 ${isEven ? 'right-1/2 mr-12' : 'left-1/2 ml-12'}`}>
          <motion.div 
            className="bg-gray-light py-1 px-4 rounded-full text-gray-dark text-sm font-medium shadow-sm
              border border-white/20 dark:border-gray/20 backdrop-blur-sm"
            whileHover={{ y: -2, scale: 1.05, backgroundColor: 'rgba(var(--primary-rgb), 0.05)' }}
          >
            {experience.period}
          </motion.div>
        </div>
        
        <div className={`md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16'} pl-10 md:pl-0`}>
          <motion.h3 
            className="text-2xl font-bold mb-1 text-gradient"
            whileHover={{ x: isEven ? -3 : 3 }}
          >
            {experience.title}
          </motion.h3>
          <motion.div 
            className="text-primary font-semibold mb-4"
            whileHover={{ x: isEven ? -2 : 2 }}
          >
            {experience.company}
          </motion.div>
          <div className="md:hidden text-gray-dark text-sm mb-4">{experience.period}</div>
          
          <motion.div 
            className="glass-effect card-hover card-shimmer p-6"
            whileHover={{ 
              y: -6,
              boxShadow: '0 25px 35px -12px rgba(0, 0, 0, 0.18)'
            }}
            transition={{ duration: 0.4 }}
          >
            <ul className="space-y-4 list-disc pl-5">
              {experience.responsibilities.map((resp, idx) => (
                <motion.li 
                  key={idx} 
                  className="pl-1"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1, x: isEven ? -2 : 2 }}
                  transition={{ duration: 0.2 }}
                >
                  {resp}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        {/* Empty div to maintain the layout */}
        <div className="md:w-1/2"></div>
      </div>
    </motion.div>
  );

  return (
    <section id="experience" className="section bg-background relative">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <motion.div 
          className="absolute -top-96 -right-96 w-[800px] h-[800px] rounded-full bg-primary/30 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-96 -left-96 w-[800px] h-[800px] rounded-full bg-secondary/30 blur-3xl"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.3, 0.2]
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
          className="mb-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-lg mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Professional Experience
          </h2>
          <p className="text-xl text-gray-dark">
            Over 3 years of experience developing full-stack applications and implementing DevOps solutions
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Enhanced timeline line with animation */}
          <motion.div 
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/30 transform md:-translate-x-1/2"
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            viewport={{ once: true }}
          />
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {experiences.map((experience, index) => (
              <ExperienceCard 
                key={index} 
                experience={experience} 
                isEven={index % 2 === 0} 
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience; 