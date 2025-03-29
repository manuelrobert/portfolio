import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: "💻",
      skills: ["Node.js", "TypeScript", "JavaScript", "Python", "GoLang", "Java", "C#"]
    },
    {
      title: "Backend Frameworks",
      icon: "⚙️",
      skills: ["Express.js", "NestJS", "GraphQL", "REST APIs"]
    },
    {
      title: "Cloud & DevOps",
      icon: "☁️",
      skills: [
        "AWS (EKS, ECS, Lambda, API Gateway, IAM, S3, CloudFormation, CDK)",
        "Azure (AKS, Functions, App Services, Blob Storage, Event Grid, Service Bus)"
      ]
    },
    {
      title: "Infrastructure as Code",
      icon: "🏗️",
      skills: ["AWS CDK (TypeScript)", "Terraform", "CloudFormation", "ARM Templates"]
    },
    {
      title: "Containerization & Orchestration",
      icon: "🐳",
      skills: ["Docker", "Kubernetes", "Podman", "Istio", "Helm"]
    },
    {
      title: "Monitoring & Logging",
      icon: "📊",
      skills: ["Prometheus", "Grafana", "CloudWatch", "Azure Monitor", "ELK Stack"]
    },
    {
      title: "CI/CD & Automation",
      icon: "🔄",
      skills: ["Jenkins", "GitHub Actions", "GitLab CI/CD", "Bamboo", "ArgoCD", "GitOps", "Azure DevOps Pipelines"]
    },
    {
      title: "Security & Authentication",
      icon: "🔒",
      skills: ["HashiCorp Vault", "EJBCA", "Certbot", "ACM", "OAuth2", "JWT"]
    },
    {
      title: "Databases",
      icon: "🗃️",
      skills: ["MySQL", "PostgreSQL", "DynamoDB", "MongoDB", "CosmosDB", "PLSQL"]
    },
    {
      title: "Version Control & Collaboration",
      icon: "🤝",
      skills: ["Git", "Bitbucket", "Jira", "Confluence"]
    }
  ];

  return (
    <section id="skills" className="section bg-gray-light relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
        <div className="grid grid-cols-10 h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="border-r border-b border-primary/5"></div>
          ))}
        </div>
      </div>
      
      <div className="container-custom relative">
        <div className="mb-16 text-center">
          <span className="inline-block px-4 py-1.5 mb-4 bg-primary/10 rounded-full text-primary text-sm font-semibold">My Expertise</span>
          <h2 className="heading-lg mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-dark max-w-3xl mx-auto">
            Diverse technical expertise spanning programming languages, frameworks, cloud platforms, and tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index} 
              className="card card-hover group bg-opacity-60 backdrop-blur-sm hover:bg-opacity-80 hover:border-primary/30 transition-all duration-500"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl group-hover:scale-110 transition-transform">
                  {category.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-4 text-primary group-hover:text-gradient transition-all duration-300">
                    {category.title}
                  </h3>
                  <ul className="space-y-3">
                    {category.skills.map((skill, idx) => (
                      <li 
                        key={idx} 
                        className="relative pl-5 before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-secondary group-hover:before:bg-accent before:transition-colors"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-16">
          <div className="inline-flex flex-wrap justify-center gap-3 p-3 rounded-xl bg-background/50 backdrop-blur-sm border border-gray/30">
            <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm">Node.js</div>
            <div className="px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm">TypeScript</div>
            <div className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm">AWS</div>
            <div className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm">Docker</div>
            <div className="px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm">Kubernetes</div>
            <div className="px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm">CI/CD</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 