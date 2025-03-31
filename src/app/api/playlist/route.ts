import { NextRequest, NextResponse } from 'next/server';

// Helper to validate playlist ID format
const isValidPlaylistId = (id: string): boolean => {
  // YouTube playlist IDs are typically alphanumeric with hyphens and underscores
  return /^[A-Za-z0-9_-]{13,}$/.test(id);
};

// Generate enhanced YouTube embed HTML with ad blocking features
const generatePlaylistEmbed = (playlistId: string): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>YouTube Playlist</title>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background-color: #000;
          font-family: system-ui, -apple-system, sans-serif;
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
        .ad-overlay {
          display: none;
          position: absolute;
          top: 70px; 
          right: 0;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 10px;
          border-radius: 4px 0 0 4px;
          font-size: 14px;
          z-index: 100;
          animation: fadeOut 1s ease 5s forwards;
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; visibility: hidden; }
        }
        .error-container {
          background-color: #f8d7da;
          color: #721c24;
          padding: 20px;
          border-radius: 8px;
          max-width: 500px;
          margin: 40px auto;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="video-container">
        <div id="ad-blocked" class="ad-overlay">Ad Blocked</div>
        <iframe 
          id="player"
          src="https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1&rel=0" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>

      <script>
        // Function to detect if an ad is playing
        function detectYouTubeAds() {
          try {
            // Check if there's an ad overlay or ad indicator
            const adIndicators = [
              '.ytp-ad-player-overlay', 
              '.ytp-ad-overlay-container',
              '.ytp-ad-message-container',
              '.ytp-ad-skip-button'
            ];
            
            const iframe = document.getElementById('player');
            if (!iframe || !iframe.contentWindow || !iframe.contentWindow.document) return;
            
            const doc = iframe.contentWindow.document;
            
            // Check for ad elements
            for (let selector of adIndicators) {
              const adElement = doc.querySelector(selector);
              if (adElement && adElement.style.display !== 'none') {
                // Show ad blocked notification
                document.getElementById('ad-blocked').style.display = 'block';
                
                // Skip ad if possible
                const skipButton = doc.querySelector('.ytp-ad-skip-button');
                if (skipButton) {
                  skipButton.click();
                }
                
                return;
              }
            }
            
            // No ad detected
            document.getElementById('ad-blocked').style.display = 'none';
          } catch (e) {
            // Catch security errors from cross-origin restrictions
            console.log("Could not access iframe content:", e);
          }
        }
        
        // Check for ads periodically
        setInterval(detectYouTubeAds, 1000);
        
        // Attempt to apply ad blocking directly to the iframe
        window.addEventListener('message', (event) => {
          if (event.data && typeof event.data === 'string') {
            try {
              const data = JSON.parse(event.data);
              // Skip ads if detected
              if (data.type && data.type.includes('ad')) {
                const iframe = document.getElementById('player');
                if (iframe && iframe.contentWindow) {
                  iframe.contentWindow.postMessage('{"event":"command","func":"nextVideo","args":""}', '*');
                }
              }
            } catch (e) {
              // Not a JSON message, ignore
            }
          }
        });
      </script>
    </body>
    </html>
  `;
};

export async function GET(request: NextRequest) {
  const playlistId = request.nextUrl.searchParams.get('id');

  if (!playlistId) {
    return NextResponse.json(
      { error: 'Missing playlist ID parameter' },
      { status: 400 }
    );
  }

  if (!isValidPlaylistId(playlistId)) {
    return NextResponse.json(
      { error: 'Invalid playlist ID format' },
      { status: 400 }
    );
  }

  try {
    const playlistEmbed = generatePlaylistEmbed(playlistId);
    return new NextResponse(playlistEmbed, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate playlist embed' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
} 