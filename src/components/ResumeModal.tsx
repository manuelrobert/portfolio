"use client";

import { useState, useEffect } from 'react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  const [animationClass, setAnimationClass] = useState('opacity-0 scale-95');
  const [copySuccess, setCopySuccess] = useState(false);
  const emailAddress = 'manuelrobertk@gmail.com';
  
  useEffect(() => {
    if (isOpen) {
      // Add a small delay before animating in to ensure the DOM is ready
      setTimeout(() => {
        setAnimationClass('opacity-100 scale-100');
      }, 10);
    } else {
      setAnimationClass('opacity-0 scale-95');
    }
  }, [isOpen]);

  // Reset copy success state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCopySuccess(false);
    }
  }, [isOpen]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopySuccess(true);
      
      // Reset success message after 2 seconds
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-foreground/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal content */}
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div 
          className={`w-full max-w-md transform overflow-hidden rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all duration-300 ${animationClass} relative`}
        >
          {/* Decorative elements */}
          <div className="absolute -z-10 top-0 right-0 w-32 h-32 bg-primary/10 rounded-full filter blur-xl"></div>
          <div className="absolute -z-10 bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full filter blur-xl"></div>
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-light transition-colors focus-ring"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="mt-2 mb-6">
            <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 mb-4 animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            
            <h3 className="text-xl font-semibold text-center mb-2 text-gradient animate-fade-in">
              Privacy Notice
            </h3>
            
            <div className="space-y-4 animate-fade-in-delay-1">
              <p className="text-center">
                For privacy reasons, my resume is not available for direct download.
              </p>
              
              <p className="text-center font-medium">
                Please contact me via email to request my detailed resume:
              </p>
              
              <div className="relative">
                <div className="flex items-center">
                  <div className="w-full relative">
                    <a 
                      href={`mailto:${emailAddress}`} 
                      className="block w-full text-center py-3 px-4 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors focus-ring animate-breathe pr-12"
                    >
                      {emailAddress}
                    </a>
                    <button 
                      onClick={handleCopyEmail}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-md bg-primary/20 hover:bg-primary/30 transition-colors focus-ring"
                      aria-label="Copy email to clipboard"
                      title="Copy to clipboard"
                    >
                      {copySuccess ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
                <div 
                  className={`text-xs text-center mt-1 text-success transition-opacity duration-300 ${
                    copySuccess ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  Email copied to clipboard!
                </div>
              </div>
              
              <p className="text-center text-sm text-gray-dark pt-2">
                Thank you for your understanding!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal; 