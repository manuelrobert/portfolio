"use client"
import React, { useEffect, useRef } from 'react';

const Experience = () => {
  // Timeline animation ref
  const timelineRef = useRef<HTMLDivElement>(null);
  const experienceRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Set up the intersection observer for scroll animations
  useEffect(() => {
    // Timeline progress animation
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('timeline-active');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
      }
    );

    if (timelineRef.current) {
      timelineObserver.observe(timelineRef.current);
    }

    // Experience items animation
    const experienceObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('experience-visible');
          }
        });
      },
      {
        root: null,
        rootMargin: '-100px',
        threshold: 0.2
      }
    );

    experienceRefs.current.forEach((ref) => {
      if (ref) experienceObserver.observe(ref);
    });

    return () => {
      timelineObserver.disconnect();
      experienceObserver.disconnect();
    };
  }, []);

  const experiences = [
    {
      title: "Senior Software Engineer",
      company: "Quest Global",
      period: "2022 – Present",
      responsibilities: [
        "Designed and developed scalable Node.js backend services using TypeScript; increased system throughput by 30%.",
        "Built and maintained cloud infrastructure with AWS CDK, Terraform, and CloudFormation; reduced deployment time by 40%.",
        "Implemented CI/CD pipelines via Jenkins, GitHub Actions, Azure DevOps, and ArgoCD; decreased deployment failures by 50%.",
        "Deployed microservices using Docker on AWS ECS, EKS, and Lambda; enhanced scalability and fault tolerance.",
        "Managed API gateways, ALB configurations, and Kubernetes ingress controllers (Istio, Nginx) to optimize traffic routing.",
        "Integrated certificate management using ACM, Certbot, and HashiCorp Vault; strengthened system security.",
        "Optimized SQL (MySQL, PostgreSQL) and NoSQL (DynamoDB, MongoDB, CosmosDB) databases; improved query performance by 25%.",
        "Developed serverless applications on AWS Lambda and Azure Functions; reduced operational costs by 30%.",
        "Enhanced application performance; reduced latency by 20% and increased system reliability."
      ]
    },
    {
      title: "Junior Software Engineer",
      company: "Nuovosys Technologies",
      period: "2019 – 2022",
      responsibilities: [
        "Developed native Android applications using Kotlin and Java; boosted user engagement by 35%.",
        "Implemented robust app architectures and complex user interfaces; reduced UI rendering time by 20%.",
        "Collaborated with cross-functional teams to ensure seamless feature integration and rollout.",
        "Utilized Prometheus and Grafana for server monitoring; reduced system downtime by 15%.",
        "Automated infrastructure deployment with Terraform and Kubernetes; decreased manual configuration errors by 50%."
      ]
    }
  ];

  return (
    <section id="experience" className="section bg-background relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-96 -right-96 w-[800px] h-[800px] rounded-full bg-primary/30 blur-3xl"></div>
        <div className="absolute -bottom-96 -left-96 w-[800px] h-[800px] rounded-full bg-secondary/30 blur-3xl"></div>
      </div>
      
      <div className="container-custom relative">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h2 className="heading-lg mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Professional Experience
          </h2>
          <p className="text-xl text-gray-dark">
            Over 5 years of experience developing scalable software solutions and cloud infrastructure
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line with progress animation */}
          <div 
            ref={timelineRef}
            className="timeline-progress absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/30 transform md:-translate-x-1/2"
          ></div>
          
          {experiences.map((exp, index) => (
            <div 
              key={index} 
              className="mb-16 relative group experience-item opacity-0 transition-all duration-700"
              ref={(el) => {
                experienceRefs.current[index] = el;
              }}
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}>
                {/* Timeline dot */}
                <div className="timeline-dot absolute left-0 md:left-1/2 top-0 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg transform -translate-x-2.5 md:-translate-x-1/2 transition-all duration-500 group-hover:scale-150 group-hover:bg-secondary"></div>
                
                {/* Date tag that alternates sides */}
                <div className={`hidden md:block absolute top-0 ${index % 2 === 0 ? 'right-1/2 mr-12' : 'left-1/2 ml-12'}`}>
                  <div className="bg-gray-light py-1 px-4 rounded-full text-gray-dark text-sm font-medium shadow-sm">
                    {exp.period}
                  </div>
                </div>
                
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'} pl-10 md:pl-0`}>
                  <h3 className="text-2xl font-bold mb-1 text-gradient">{exp.title}</h3>
                  <div className="text-primary font-semibold mb-4">{exp.company}</div>
                  <div className="md:hidden text-gray-dark text-sm mb-4">{exp.period}</div>
                  
                  <div className="card card-hover card-animated">
                    <ul className="space-y-4">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="relative pl-6 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary">
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Empty div to maintain the layout */}
                <div className="md:w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add global CSS for the animations */}
      <style jsx global>{`
        /* Timeline progress animation */
        .timeline-progress {
          height: 0;
          transition: height 0.1s linear;
        }
        
        .timeline-progress.timeline-active {
          height: 100%;
        }

        /* Experience item reveal animation */
        .experience-item {
          transform: translateY(30px);
        }
        
        .experience-item.experience-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Timeline dot animation */
        .timeline-dot {
          opacity: 0.5;
          transform: scale(0.8) translateX(-2.5px);
        }
        
        .experience-visible .timeline-dot {
          opacity: 1;
          transform: scale(1) translateX(-2.5px);
        }
        
        @media (min-width: 768px) {
          .timeline-dot {
            transform: scale(0.8) translateX(-50%);
          }
          .experience-visible .timeline-dot {
            transform: scale(1) translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default Experience; 