"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ScrollToTop from "../../components/ScrollToTop";
import "./proxy.css";

// Helper function to detect common video and streaming services
const isVideoSite = (url: string): boolean => {
  const videoSites = [
    'youtube.com', 'youtu.be', 'vimeo.com', 'dailymotion.com', 
    'twitch.tv', 'netflix.com', 'hulu.com', 'disneyplus.com',
    'hbomax.com', 'amazon.com/video', 'primevideo.com'
  ];
  return videoSites.some(site => url.toLowerCase().includes(site));
};

// Helper to determine if site might have embedding restrictions
const mightHaveRestrictions = (url: string): boolean => {
  const restrictedSites = [
    'youtube.com', 'youtu.be', 'facebook.com', 'twitter.com', 
    'instagram.com', 'tiktok.com', 'linkedin.com', 'reddit.com',
    'netflix.com', 'hulu.com', 'disneyplus.com', 'spotify.com',
    'discord.com', 'teams.microsoft.com', 'zoom.us'
  ];
  return restrictedSites.some(site => url.toLowerCase().includes(site));
};

export default function InfinitePage() {
  const [url, setUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [adBlockDetected, setAdBlockDetected] = useState(false);
  const [useApiProxy, setUseApiProxy] = useState(true); // Set to true by default for better compatibility
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVideoService, setIsVideoService] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const adNoticeRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Check for ad blockers when the component mounts
  useEffect(() => {
    const detectAdBlocker = async () => {
      try {
        // Create a bait element to detect ad blockers
        const bait = document.createElement('div');
        bait.className = 'adsbygoogle';
        bait.style.height = '1px';
        bait.style.width = '1px';
        bait.style.position = 'absolute';
        bait.style.top = '-10000px';
        bait.style.left = '-10000px';
        document.body.appendChild(bait);

        // Wait briefly then check if element has been hidden or removed
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const isBlocked = 
          bait.offsetParent === null || 
          bait.offsetHeight === 0 || 
          bait.offsetLeft === 0;
        
        if (isBlocked) {
          setAdBlockDetected(true);
          if (adNoticeRef.current) {
            adNoticeRef.current.style.display = 'block';
          }
        }
        
        // Clean up
        document.body.removeChild(bait);
      } catch (error) {
        console.log("Error detecting ad blocker", error);
      }
    };

    detectAdBlocker();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      setError("Please enter a URL");
      return;
    }

    // Add https:// prefix if not present
    let formattedUrl = url;
    if (!/^https?:\/\//i.test(url)) {
      formattedUrl = `https://${url}`;
    }

    // Check if it's a video service
    const isVideo = isVideoSite(formattedUrl);
    setIsVideoService(isVideo);

    // If it's a site that might have restrictions, forcibly use API proxy
    if (mightHaveRestrictions(formattedUrl)) {
      setUseApiProxy(true);
    }

    setIsLoading(true);
    setError("");
    
    // Check if we should use the API proxy
    if (useApiProxy) {
      formattedUrl = `/api/infinite?url=${encodeURIComponent(formattedUrl)}`;
    }
    
    setCurrentUrl(formattedUrl);

    // Auto switch to fullscreen for videos
    if (isVideo && !isFullscreen) {
      setIsFullscreen(true);
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
    
    // Check if iframe content is properly loaded
    try {
      // This will throw an error if cross-origin blocking prevents access
      if (iframeRef.current && iframeRef.current.contentWindow) {
        // Try to get the title - this will throw an error if blocked
        const dummy = iframeRef.current.contentWindow.document.title;
      }
    } catch (error) {
      // Only show broken iframe warning if not using API proxy
      if (!useApiProxy && !currentUrl.startsWith('/api/infinite')) {
        console.log("Cross-origin blocking detected");
        // Don't set error immediately to avoid error flash
        if (iframeRef.current) {
          // Check if the iframe actually loaded content first
          setTimeout(() => {
            if (iframeRef.current && 
                (!iframeRef.current.contentDocument || 
                 iframeRef.current.contentDocument.body.innerHTML === '')) {
              handleIframeError();
            }
          }, 1000);
        }
      }
    }
  };

  const handleIframeError = () => {
    setIsLoading(false);
    
    // If not already using API proxy, automatically switch to it and retry
    if (!useApiProxy && currentUrl && !currentUrl.startsWith('/api/infinite')) {
      setError("Direct access failed. Retrying with API proxy...");
      setUseApiProxy(true);
      
      // Get the current URL and reload it with the proxy
      const originalUrl = currentUrl;
      setIsLoading(true);
      setCurrentUrl(`/api/infinite?url=${encodeURIComponent(originalUrl)}`);
    } else {
      setError("Failed to load the website. This could be due to the site's security settings or content restrictions.");
    }
  };

  const toggleProxyMode = () => {
    setUseApiProxy(!useApiProxy);
    // If we already have a URL loaded, reload it with the new method
    if (currentUrl) {
      setIsLoading(true);
      
      // Current URL might be either direct or proxied, so get the original URL
      let originalUrl = currentUrl;
      if (currentUrl.startsWith('/api/infinite?url=')) {
        originalUrl = decodeURIComponent(currentUrl.replace('/api/infinite?url=', ''));
      }
      
      // Apply the new proxy setting
      if (!useApiProxy) { // Switching to API proxy
        setCurrentUrl(`/api/infinite?url=${encodeURIComponent(originalUrl)}`);
      } else { // Switching to direct iframe
        setCurrentUrl(originalUrl);
      }
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const renderOptimizedControls = () => {
    if (isVideoService) {
      // Simplified controls for video services
      return (
        <div className="flex items-center justify-end mb-3">
          <button 
            onClick={toggleFullscreen}
            className="px-3 py-1.5 rounded-md bg-background/80 backdrop-blur-sm border border-gray/30 hover:bg-gray-light/30 transition-colors text-sm flex items-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isFullscreen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9L4 4m0 0l5 0M4 4v5m11-5h5m0 0v5m0-5l-5 5M9 20l-5-5m0 0v5m0-5h5m11 5l-5-5m0 0h5m0 0v5" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              )}
            </svg>
            {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      );
    }

    // Regular controls for non-video sites
    return (
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        {/* Proxy mode switch */}
        <div className="flex items-center">
          <label className="flex items-center cursor-pointer">
            <span className="mr-2 text-sm text-gray-dark">Use API Infinite</span>
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only" 
                checked={useApiProxy}
                onChange={toggleProxyMode}
              />
              <div className={`block w-10 h-6 rounded-full transition-colors duration-300 ${useApiProxy ? 'bg-primary' : 'bg-gray-light'}`}></div>
              <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${useApiProxy ? 'transform translate-x-4' : ''}`}></div>
            </div>
          </label>
        </div>

        {currentUrl && (
          <div className="url-display truncate flex-grow max-w-[60%] mx-2">
            {currentUrl.startsWith('/api/infinite?url=') 
              ? `${decodeURIComponent(currentUrl.replace('/api/infinite?url=', ''))} (via API infinite)`
              : currentUrl}
          </div>
        )}

        {/* Fullscreen button */}
        <button 
          onClick={toggleFullscreen}
          className="px-3 py-1.5 rounded-md bg-background border border-gray/30 hover:bg-gray-light/30 transition-colors text-sm flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isFullscreen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9L4 4m0 0l5 0M4 4v5m11-5h5m0 0v5m0-5l-5 5M9 20l-5-5m0 0v5m0-5h5m11 5l-5-5m0 0h5m0 0v5" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            )}
          </svg>
          {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        </button>
      </div>
    );
  };

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      <section className={`py-6 md:py-10 flex flex-col flex-grow relative ${isFullscreen ? 'fullscreen-mode' : ''}`}>
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/90 to-gray-light/30"></div>
        
        <div className="container-custom mx-auto px-4 flex flex-col flex-grow" ref={containerRef}>
          <div className={`max-w-5xl mx-auto w-full mb-6 text-center transition-opacity ${isFullscreen ? 'opacity-0 absolute -z-50' : 'opacity-100'}`}>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gradient-pink">Infinite</h1>
            <p className="text-lg text-gray-dark max-w-2xl mx-auto">
              Browse websites infinitely within this page.
            </p>
          </div>

          <div className={`proxy-container w-full mx-auto p-4 ${isFullscreen ? 'fullscreen-container' : 'max-w-5xl'}`}>
            <div className={`transition-all duration-300 ${isFullscreen ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 mb-3">
                <div className="flex-grow url-input">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter website URL (e.g., google.com, youtube.com/watch?v=...)"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-background border border-gray/30 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none text-foreground"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="glow-button px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Loading..." : "Go"}
                </button>
              </form>

              {/* Controls row */}
              {renderOptimizedControls()}

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 border border-red-200">
                  <p>{error}</p>
                </div>
              )}
            </div>

            <div className={`iframe-container w-full relative ${isFullscreen ? 'h-screen' : isVideoService ? 'h-[75vh] md:h-[80vh]' : 'h-[70vh] md:h-[75vh]'}`}>
              {/* Ad Blocker Notice */}
              <div ref={adNoticeRef} className="ad-blocker-notice">
                <p>Ad blocker detected. Some websites may not function correctly. Consider disabling it for this page.</p>
              </div>
            
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
                  <div className="loading-spinner"></div>
                </div>
              )}
              
              {currentUrl ? (
                <iframe
                  ref={iframeRef}
                  src={currentUrl}
                  className="w-full h-full border-0"
                  sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-downloads"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen={true}
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-dark">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                  </svg>
                  <p className="text-lg">Enter a URL above to start browsing</p>
                  {adBlockDetected && (
                    <p className="mt-2 text-sm text-amber-600">
                      Note: Ad blocker detected. Some websites may not display correctly.
                    </p>
                  )}
                </div>
              )}

              {/* Floating controls for fullscreen mode */}
              {isFullscreen && currentUrl && (
                <div className="fixed top-4 right-4 z-50 flex gap-2">
                  <button 
                    onClick={toggleFullscreen}
                    className="p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background shadow-lg transition-all"
                    title="Exit Fullscreen"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9L4 4m0 0l5 0M4 4v5m11-5h5m0 0v5m0-5l-5 5M9 20l-5-5m0 0v5m0-5h5m11 5l-5-5m0 0h5m0 0v5" />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <div className={`mt-5 transition-all duration-300 ${isFullscreen ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
              <h3 className="font-semibold text-lg mb-2">About Infinite</h3>
              <p className="text-gray-dark mb-3">
                Browse websites seamlessly within this page. Here's what you need to know:
              </p>
              <ul className="list-disc list-inside text-gray-dark space-y-1">
                <li>Some websites might block access through direct embedding</li>
                <li>API Infinite mode is enabled by default for better compatibility</li>
                <li>For YouTube videos, just enter the video URL and it will work automatically</li>
                <li>Use fullscreen mode for the best browsing experience</li>
                {adBlockDetected && (
                  <li className="text-amber-600">Ad blockers may interfere with some website functionality</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <div className={isFullscreen ? 'hidden' : 'block'}>
        <Footer />
        <ScrollToTop />
      </div>

      <style jsx>{`
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top-color: var(--color-primary);
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .fullscreen-mode {
          padding: 0;
          height: 100vh;
          overflow: hidden;
        }
        
        .fullscreen-container {
          max-width: 100%;
          height: 100vh;
          border-radius: 0;
          margin: 0;
          padding: 0;
        }
        
        .iframe-container {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
      `}</style>
    </main>
  );
} 