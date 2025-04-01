"use client";

import React, { useState } from "react";
import Image from "next/image";
import ResumeModal from "./ResumeModal";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <>
      <footer className="relative py-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-light/80 to-gray-light/20 pointer-events-none"></div>

        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute -top-96 -right-96 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl"></div>
          <div className="absolute -bottom-96 -left-96 w-[800px] h-[800px] rounded-full bg-secondary/5 blur-3xl"></div>
        </div>

        <div className="container-custom relative">
          {/* Top section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 pb-12 border-b border-gray/30">
            <div className="max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-2xl font-bold text-gradient">Manuel Robert</h2>
                <div className="h-6 w-px bg-gray mx-1"></div>
                <span className="text-gray-dark text-sm">
                  Senior Software Engineer
                </span>
              </div>
              <p className="text-gray-dark mb-6">
                Full Stack Developer & DevOps Specialist focused on building scalable
                web applications and cloud infrastructure.
              </p>
              <div className="flex gap-6">
                <a
                  href="mailto:manuelrobertk@gmail.com"
                  className="btn-primary px-5 py-2 text-sm rounded-full font-medium flex items-center gap-2 focus-ring"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"></path>
                  </svg>
                  Get in touch
                </a>
                <button
                  onClick={() => setIsResumeModalOpen(true)}
                  className="btn-outline px-5 py-2 text-sm rounded-full font-medium flex items-center gap-2 focus-ring"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-4 h-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                    />
                  </svg>
                  Download CV
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 md:gap-16">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-primary">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#about"
                      className="hover:text-primary transition-colors focus-ring"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#experience"
                      className="hover:text-primary transition-colors focus-ring"
                    >
                      Experience
                    </a>
                  </li>
                  <li>
                    <a
                      href="#skills"
                      className="hover:text-primary transition-colors focus-ring"
                    >
                      Skills
                    </a>
                  </li>
                  <li>
                    <a
                      href="#education"
                      className="hover:text-primary transition-colors focus-ring"
                    >
                      Education
                    </a>
                  </li>
                  <li>
                    <Link
                      href="/infinite"
                      className="hover:text-primary transition-colors focus-ring"
                    >
                      Projects
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-primary">
                  Contact
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Image
                      src="/icons/mail.svg"
                      alt="Email"
                      width={16}
                      height={16}
                    />
                    <a
                      href="mailto:manuelrobertk@gmail.com"
                      className="hover:text-primary transition-colors focus-ring"
                    >
                      Email
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Image
                      src="/icons/github.svg"
                      alt="GitHub"
                      width={16}
                      height={16}
                    />
                    <a
                      href="https://github.com/manuelrobert"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors focus-ring"
                    >
                      GitHub
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Image
                      src="/icons/linkedin.svg"
                      alt="LinkedIn"
                      width={16}
                      height={16}
                    />
                    <a
                      href="https://www.linkedin.com/in/manuel-robert"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors focus-ring"
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex justify-center gap-4 my-8">
            <a
              href="https://github.com/manuelrobert"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 focus-ring shadow-sm"
              aria-label="GitHub Profile"
            >
              <Image
                src="/icons/github.svg"
                alt="GitHub"
                width={20}
                height={20}
              />
            </a>
            <a
              href="https://www.linkedin.com/in/manuel-robert"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 focus-ring shadow-sm"
              aria-label="LinkedIn Profile"
            >
              <Image
                src="/icons/linkedin.svg"
                alt="LinkedIn"
                width={20}
                height={20}
              />
            </a>
            <a
              href="mailto:manuelrobertk@gmail.com"
              className="h-10 w-10 rounded-full bg-background/80 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 focus-ring shadow-sm"
              aria-label="Email Contact"
            >
              <Image src="/icons/mail.svg" alt="Email" width={20} height={20} />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-dark">
            <p>© {currentYear} Manuel Robert. All rights reserved.</p>
            <p className="mt-1">
              Built with 
              <span className="mx-1">❤️</span>
              using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>

      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeModalOpen} onClose={() => setIsResumeModalOpen(false)} />
    </>
  );
};

export default Footer;
