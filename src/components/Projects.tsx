"use client";

import React, { useState } from 'react';
import ResumeModal from './ResumeModal';

const Projects = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  
  const projects = [
    {
      title: "Infrastructure as Code Automation",
      description: "Developed AWS CDK stacks in TypeScript for cloud resource provisioning; reduced provisioning time by 50%.",
      skills: ["AWS CDK", "TypeScript", "CloudFormation", "Infrastructure Automation"],
      icon: "🏗️",
      highlight: true
    },
    {
      title: "Microservices Deployment",
      description: "Deployed Node.js microservices on AWS EKS, ECS, and Lambda; improved service availability by 40%.",
      skills: ["Node.js", "Docker", "Kubernetes", "AWS", "Microservices"],
      icon: "🔄",
      highlight: false
    },
    {
      title: "CI/CD Pipeline Development",
      description: "Automated deployment pipelines; reduced deployment time by 40% and increased release efficiency.",
      skills: ["Jenkins", "GitHub Actions", "GitLab CI/CD", "ArgoCD"],
      icon: "🚀",
      highlight: false
    },
    {
      title: "API Security Enhancement",
      description: "Integrated OAuth2, JWT authentication, and certificate-based security; improved system security by 35%.",
      skills: ["OAuth2", "JWT", "Certificate Management", "API Security"],
      icon: "🔒",
      highlight: true
    },
    {
      title: "Database Optimization",
      description: "Tuned relational (MySQL, PostgreSQL) and NoSQL (DynamoDB, MongoDB, CosmosDB) databases; improved response time by 25%.",
      skills: ["SQL", "NoSQL", "Database Performance", "Query Optimization"],
      icon: "📊",
      highlight: false
    },
    {
      title: "Serverless Implementations",
      description: "Built and deployed AWS Lambda and Azure Functions for event-driven architectures; reduced compute costs by 30%.",
      skills: ["AWS Lambda", "Azure Functions", "Serverless", "Event-Driven Architecture"],
      icon: "☁️",
      highlight: false
    }
  ];

  return (
    <>
      <section id="projects" className="section bg-gray-light relative">
        {/* Background elements */}
        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 blur-3xl"></div>
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-secondary/5 to-accent/5 blur-3xl"></div>
        </div>
        
        <div className="container-custom relative">
          <div className="mb-16 text-center">
            <span className="inline-block px-4 py-1.5 mb-4 bg-primary/10 rounded-full text-primary text-sm font-semibold">Portfolio</span>
            <h2 className="heading-lg mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Project Highlights
            </h2>
            <p className="text-xl text-gray-dark max-w-3xl mx-auto">
              Key projects showcasing technical expertise and business impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className={`card card-hover group relative h-full flex flex-col justify-between overflow-hidden ${
                  project.highlight ? 'border-primary/40 shadow-lg shadow-primary/10' : ''
                }`}
              >
                {project.highlight && (
                  <div className="absolute -right-1 -top-1 px-2 py-1 bg-primary text-white text-xs font-semibold rounded-bl-md shadow-md">
                    Featured
                  </div>
                )}
                
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-3xl">{project.icon}</div>
                    <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gray-light/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-primary group-hover:text-gradient transition-colors">{project.title}</h3>
                  <p className="mb-6 text-foreground/80">{project.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.skills.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="badge bg-background/80 backdrop-blur-sm border border-gray/30 group-hover:border-primary/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 p-8 rounded-2xl bg-background/30 backdrop-blur-sm border border-gray/30 shadow-lg">
            <h3 className="text-2xl font-bold text-primary mb-4">Open-source Contributions</h3>
            <p className="text-gray-dark mb-6">
              Active in projects related to cloud automation and microservices. Regular participant in DevOps and cloud-native meetups; committed to continuous learning and technology innovation.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://github.com/libinmath3w" 
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-6 py-2 rounded-full text-sm focus-ring"
              >
                View GitHub Profile
              </a>
              <button 
                onClick={() => setIsResumeModalOpen(true)}
                className="btn-outline px-6 py-2 rounded-full text-sm focus-ring"
              >
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </>
  );
};

export default Projects; 