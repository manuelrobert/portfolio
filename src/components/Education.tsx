import React from 'react';

const Education = () => {
  const education = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "St. Joseph's College of Engineering and Technology, Palai",
      period: "2016 – 2019",
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "St. Joseph's Academy of Higher Education and Research, Moolamattom",
      period: "2013 – 2016",
    }
  ];

  const certifications = [
    {
      name: "AWS Certified Developer – Associate",
      issuer: "Amazon Web Services",
      icon: "aws-icon"
    }
  ];

  return (
    <section id="education" className="section bg-background relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 w-full h-1/3 bg-gradient-to-b from-gray-light/50 to-transparent opacity-70"></div>
        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-gray-light/50 to-transparent opacity-70"></div>
      </div>
      
      <div className="container-custom">
        <div className="mb-16 text-center">
          <span className="inline-block px-4 py-1.5 mb-4 bg-primary/10 rounded-full text-primary text-sm font-semibold">Academic Background</span>
          <h2 className="heading-lg mb-4 inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Education & Certifications
          </h2>
          <p className="text-xl text-gray-dark max-w-3xl mx-auto">
            Academic background and professional certifications
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="relative">
            <div className="absolute top-0 left-0 w-20 h-20 -translate-x-1/4 -translate-y-1/4 rounded-full bg-primary/20 filter blur-xl"></div>
            
            <h3 className="heading-md mb-8 text-primary">Education</h3>
            <div className="space-y-10 relative">
              {/* Education Timeline Line */}
              <div className="absolute top-2 bottom-0 left-8 w-0.5 bg-gradient-to-b from-primary to-transparent"></div>
              
              {education.map((edu, index) => (
                <div key={index} className="relative pl-20 group">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-2 w-16 h-16 rounded-full bg-gray-light flex items-center justify-center border-4 border-background shadow-lg group-hover:border-primary/20 transition-all duration-300">
                    <div className="text-primary font-bold group-hover:scale-110 transition-transform">
                      {edu.period.split('–')[0]}
                    </div>
                  </div>
                  
                  <div className="card card-hover card-animated backdrop-blur-sm bg-opacity-70">
                    <h4 className="text-xl font-bold mb-2 text-gradient">{edu.degree}</h4>
                    <p className="text-gray-dark mb-2">{edu.institution}</p>
                    <p className="text-sm text-foreground/70">{edu.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute top-0 right-0 w-20 h-20 translate-x-1/4 -translate-y-1/4 rounded-full bg-secondary/20 filter blur-xl"></div>
            
            <h3 className="heading-md mb-8 text-primary">Certifications</h3>
            <div className="space-y-8">
              {certifications.map((cert, index) => (
                <div key={index} className="card card-hover card-animated backdrop-blur-sm bg-opacity-70 flex items-start gap-6 group">
                  <div className="min-w-16 h-16 rounded-full bg-gradient-to-br from-primary/90 to-secondary/90 flex items-center justify-center text-white shadow-lg group-hover:from-secondary group-hover:to-accent transition-all duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-gradient">{cert.name}</h4>
                    <p className="text-gray-dark">{cert.issuer}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary">Credential ID: a662bf56-54a6-41e8-8a5d-22d8413f4297</span>
                      <a 
                        href="https://www.credly.com/badges/a662bf56-54a6-41e8-8a5d-22d8413f4297/linked_in_profile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center p-1.5 rounded-full bg-success/10 hover:bg-success/20 text-success transition-colors duration-200 group focus-ring"
                        title="Verify credential"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="absolute -right-0 -top-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-full pointer-events-none text-xs whitespace-nowrap bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm text-foreground transition-all duration-300">
                          Verify on Credly
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="bg-gray-light/50 border border-gray/30 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold">Continuing Learning</h4>
                  <div className="text-xs px-2 py-1 bg-secondary/10 text-secondary rounded-full">Ongoing</div>
                </div>
                <p className="text-gray-dark mb-4">Committed to continuous learning in cloud technology, devops practices, and software development.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-xs rounded-full bg-background text-foreground/70">Cloud Architecture</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-background text-foreground/70">Kubernetes</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-background text-foreground/70">Serverless</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education; 