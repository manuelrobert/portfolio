import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section id="about" className="section relative overflow-hidden bg-gradient-to-b from-gray-light to-background">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-40 right-1/4 w-48 h-48 bg-accent/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1 flex flex-col gap-6">
            <div>
              <div className="inline-block mb-2 px-4 py-1.5 bg-primary/10 rounded-full text-primary text-sm font-semibold">
                Senior Software Engineer & DevOps Expert
              </div>
              <h1 className="heading-xl mb-4 animate-fade-in">
                <span className="text-gradient">Libin Mathew</span>
              </h1>
              <h2 className="text-xl font-semibold text-gray-dark mb-6 animate-fade-in-delay-1">
                Building scalable systems and cloud infrastructure
              </h2>
              <p className="text-lg mb-8 animate-fade-in-delay-2 max-w-xl">
                Results-driven Node.js Backend Developer with extensive DevOps expertise focused on 
                TypeScript, AWS CDK, and cloud infrastructure automation.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-3">
              <a 
                href="mailto:libinmathewancheril@gmail.com" 
                className="btn btn-primary focus-ring group"
                aria-label="Email Libin Mathew"
              >
                Contact Me
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            
            <div className="flex flex-wrap gap-6 mt-4 animate-fade-in-delay-4">
              <div className="flex items-center gap-2 bg-gray-light/60 p-2.5 px-3 rounded-full border border-gray/40 backdrop-blur-sm">
                <Image src="/icons/location.svg" alt="Location" width={18} height={18} className="text-gray-dark" />
                <span className="text-sm">Kerala, India</span>
              </div>
              <a 
                href="mailto:libinmathewancheril@gmail.com"
                className="flex items-center gap-2 hover:text-primary transition-colors bg-gray-light/60 p-2.5 px-3 rounded-full border border-gray/40 backdrop-blur-sm focus-ring"
                aria-label="Email Libin Mathew"
              >
                <Image src="/icons/mail.svg" alt="Email" width={18} height={18} />
                <span className="text-sm">libinmathewancheril@gmail.com</span>
              </a>
              <a 
                href="https://github.com/libinmath3w"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors bg-gray-light/60 p-2.5 px-3 rounded-full border border-gray/40 backdrop-blur-sm focus-ring"
                aria-label="Visit Libin's GitHub profile"
              >
                <Image src="/icons/github.svg" alt="GitHub" width={18} height={18} />
                <span className="text-sm">github.com/libinmath3w</span>
              </a>
              <a 
                href="https://linkedin.com/in/libinmath3w"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors bg-gray-light/60 p-2.5 px-3 rounded-full border border-gray/40 backdrop-blur-sm focus-ring"
                aria-label="Visit Libin's LinkedIn profile"
              >
                <Image src="/icons/linkedin.svg" alt="LinkedIn" width={18} height={18} />
                <span className="text-sm">linkedin.com/in/libinmath3w</span>
              </a>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center items-center">
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary via-secondary to-accent opacity-70 blur-md animate-pulse"></div>
              
              <div className="relative h-72 w-72 sm:h-80 sm:w-80 rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary p-1 animate-float shadow-2xl">
                <div className="absolute inset-1 bg-background rounded-full flex items-center justify-center bg-opacity-95">
                  <div className="text-8xl font-bold text-gradient">LM</div>
                </div>
              </div>
              
              {/* Orbit elements */}
              <div className="absolute top-0 left-0 right-0 bottom-0 animate-spin-slow" style={{ animationDuration: '15s' }}>
                <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center backdrop-blur-sm border border-primary/30">
                    <span className="text-xs font-bold">AWS</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-0 left-0 right-0 bottom-0 animate-spin-slow" style={{ animationDuration: '20s', animationDirection: 'reverse' }}>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center backdrop-blur-sm border border-secondary/30">
                    <span className="text-xs font-bold">TS</span>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-0 left-0 right-0 bottom-0 animate-spin-slow" style={{ animationDuration: '25s' }}>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center backdrop-blur-sm border border-accent/30">
                    <span className="text-xs font-bold">Node</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center opacity-70">
        <span className="text-sm mb-2">Scroll</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero; 