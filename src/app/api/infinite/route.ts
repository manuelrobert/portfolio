import { NextRequest, NextResponse } from 'next/server';

// Helper function to determine if the URL is YouTube
const isYouTube = (url: string): boolean => {
  return url.includes('youtube.com') || url.includes('youtu.be');
};

// Helper to extract YouTube video ID
const extractYouTubeVideoId = (url: string): string | null => {
  let videoId = null;
  
  // Handle youtube.com/watch?v=VIDEO_ID format
  if (url.includes('youtube.com/watch')) {
    const urlObj = new URL(url);
    videoId = urlObj.searchParams.get('v');
  } 
  // Handle youtu.be/VIDEO_ID format
  else if (url.includes('youtu.be/')) {
    const parts = url.split('youtu.be/');
    if (parts.length > 1) {
      videoId = parts[1].split('?')[0];
    }
  }
  
  return videoId;
};

// Helper for generating YouTube embed HTML
const generateYouTubeEmbed = (videoId: string): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>YouTube Video</title>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background-color: #000;
        }
        .video-container {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border: 0;
        }
      </style>
    </head>
    <body>
      <div class="video-container">
        <iframe 
          src="https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    </body>
    </html>
  `;
};

// Check if URL is a social media site (often blocked)
const isSocialMediaSite = (url: string): boolean => {
  const socialSites = [
    'facebook.com', 
    'twitter.com', 
    'instagram.com', 
    'tiktok.com',
    'linkedin.com',
    'reddit.com',
    'pinterest.com'
  ];
  
  return socialSites.some(site => url.includes(site));
};

// Generate an alternative embed for social media sites
const generateSocialMediaEmbed = (url: string): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Social Media Content</title>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          font-family: Arial, sans-serif;
          background-color: #f9f9f9;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #333;
          text-align: center;
        }
        .container {
          max-width: 600px;
          padding: 2rem;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        .btn {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.75rem 1.5rem;
          background: #4a90e2;
          color: white;
          border-radius: 5px;
          text-decoration: none;
          font-weight: bold;
          transition: all 0.2s;
        }
        .btn:hover {
          background: #3a80d2;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Social Media Content</h2>
        <p>This social media content cannot be embedded directly due to platform restrictions.</p>
        <p>Click the button below to open the content in a new tab:</p>
        <a href="${url}" target="_blank" class="btn">Open Social Media Link</a>
      </div>
    </body>
    </html>
  `;
};

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'Missing URL parameter' },
      { status: 400 }
    );
  }

  try {
    // Special handling for YouTube
    if (isYouTube(url)) {
      const videoId = extractYouTubeVideoId(url);
      if (videoId) {
        const youtubeEmbed = generateYouTubeEmbed(videoId);
        return new NextResponse(youtubeEmbed, {
          headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }
    
    // Special handling for social media sites
    if (isSocialMediaSite(url)) {
      const socialEmbed = generateSocialMediaEmbed(url);
      return new NextResponse(socialEmbed, {
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Validate the URL format for all other URLs
    const targetUrl = new URL(url);
    
    // Fetch the content from the target URL with enhanced headers
    const response = await fetch(targetUrl.toString(), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Upgrade-Insecure-Requests': '1',
        'Referer': 'https://www.google.com/',
      },
      redirect: 'follow',
      cache: 'no-store',
    });

    // Get the response headers
    const headers = new Headers();
    response.headers.forEach((value, key) => {
      // Skip certain headers that would cause issues
      if (!['content-encoding', 'content-length', 'connection', 'transfer-encoding', 'content-security-policy', 'strict-transport-security', 'x-frame-options'].includes(key.toLowerCase())) {
        headers.set(key, value);
      }
    });

    // Add necessary CORS headers and override security headers
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    headers.set('X-Frame-Options', 'SAMEORIGIN');
    headers.set('Content-Security-Policy', "frame-ancestors 'self' *");
    
    // First try to get the response as text to handle both text and binary content
    try {
      const contentType = response.headers.get('content-type') || '';
      let responseData;
      
      if (contentType.includes('text/html') || contentType.includes('application/json') || 
          contentType.includes('text/plain') || contentType.includes('application/javascript') ||
          contentType.includes('application/xml') || contentType.includes('text/css')) {
        // Handle text-based content
        const text = await response.text();
        
        // For HTML content, we need to modify it to make it work in an iframe
        if (contentType.includes('text/html')) {
          // Enhanced HTML modifications
          let modifiedText = text
            // Replace target="_blank" to prevent links from opening in new tabs
            .replace(/target="_blank"/g, '')
            .replace(/target='_blank'/g, '')
            // Remove base tags that might interfere with relative links
            .replace(/<base[^>]*>/g, '')
            // Remove X-Frame-Options meta tags
            .replace(/<meta[^>]*http-equiv=["']X-Frame-Options["'][^>]*>/gi, '')
            // Add base tag pointing to the original site
            .replace(/<head>/i, `<head><base href="${targetUrl.origin}${targetUrl.pathname}" />`)
            // Inject CSS to make content fit well in the iframe
            .replace(/<head>/i, `<head>
              <style>
                html, body { overflow-x: hidden; width: 100%; }
                /* Force links to open within the iframe */
                a { target: _self !important; }
              </style>
            `);
            
          // Remove service worker registrations that might interfere
          modifiedText = modifiedText.replace(
            /navigator\.serviceWorker\.register\([^)]+\)/g, 
            'console.log("Service worker registration blocked by proxy")'
          );
            
          // Fix offline detection scripts common in PWAs
          modifiedText = modifiedText.replace(
            /navigator\.onLine/g,
            'true'
          );
            
          responseData = new TextEncoder().encode(modifiedText);
        } else {
          responseData = new TextEncoder().encode(text);
        }
      } else {
        // Handle binary content
        responseData = await response.arrayBuffer();
      }

      // Return the response with the original status code and modified headers
      return new NextResponse(responseData, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    } catch (contentError) {
      console.error('Error processing content:', contentError);
      // Fallback to arrayBuffer if text() fails
      const arrayBuffer = await response.arrayBuffer();
      return new NextResponse(arrayBuffer, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    }
  } catch (error: any) {
    console.error('Proxy error:', error);
    
    // Create a user-friendly error page
    const errorHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Error Loading Content</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            padding: 2rem;
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
          }
          .error-container {
            background-color: #fff;
            border-radius: 8px;
            padding: 2rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            margin-top: 2rem;
          }
          h1 {
            color: #e53e3e;
            margin-top: 0;
          }
          .url {
            background-color: #f8f9fa;
            padding: 0.5rem;
            border-radius: 4px;
            font-family: monospace;
            word-break: break-all;
          }
          .suggestions {
            margin-top: 2rem;
            text-align: left;
          }
          .back-btn {
            display: inline-block;
            margin-top: 1rem;
            padding: 0.75rem 1.5rem;
            background: #4a90e2;
            color: white;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="error-container">
          <h1>Cannot Load Website</h1>
          <p>We couldn't load the following website:</p>
          <p class="url">${url}</p>
          
          <p>Error details: ${error.message || 'Unknown error'}</p>
          
          <div class="suggestions">
            <h3>Possible reasons:</h3>
            <ul>
              <li>The website doesn't allow embedding in iframes</li>
              <li>The website has security measures preventing access</li>
              <li>There might be connection issues</li>
              <li>The URL might be incorrect</li>
            </ul>
            
            <h3>Try these solutions:</h3>
            <ul>
              <li>Use direct access by turning off "Use API Infinite"</li>
              <li>Try a different website</li>
              <li>For YouTube videos, make sure you're using a video URL</li>
            </ul>
          </div>
          
          <a href="javascript:history.back()" class="back-btn">Go Back</a>
        </div>
      </body>
      </html>
    `;
    
    return new NextResponse(errorHtml, {
      status: 500,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

export async function OPTIONS() {
  // Handle preflight requests with comprehensive CORS headers
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '86400',
    },
  });
}