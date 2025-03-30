import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'Missing URL parameter' },
      { status: 400 }
    );
  }

  try {
    // Validate the URL format
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
    headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    headers.set('X-Frame-Options', 'SAMEORIGIN');
    headers.set('Content-Security-Policy', "frame-ancestors 'self'");
    
    try {
      // First try to get the response as text to handle both text and binary content
      const contentType = response.headers.get('content-type') || '';
      let responseData;
      
      if (contentType.includes('text/html') || contentType.includes('application/json') || 
          contentType.includes('text/plain') || contentType.includes('application/javascript') ||
          contentType.includes('application/xml') || contentType.includes('text/css')) {
        // Handle text-based content
        const text = await response.text();
        
        // For HTML content, we might need to modify it to make it work in an iframe
        if (contentType.includes('text/html')) {
          // Replace target="_blank" to prevent links from opening in new tabs
          const modifiedText = text
            .replace(/target="_blank"/g, '')
            .replace(/target='_blank'/g, '')
            // Remove base tags that might interfere with relative links
            .replace(/<base[^>]*>/g, '')
            // Add base tag pointing to the original site
            .replace(/<head>/i, `<head><base href="${targetUrl.origin}${targetUrl.pathname}" />`);
          
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
    return NextResponse.json(
      { error: 'Failed to fetch the requested URL', details: error.message },
      { status: 500 }
    );
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