import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  webpack: (config) => {
    // Add support for importing shader files
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader'],
    });
    
    return config;
  },
  // Add security headers for the proxy functionality
  async headers() {
    return [
      {
        source: '/infinite',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self'; frame-src * data:; default-src * 'unsafe-inline' 'unsafe-eval' data: blob:",
          },
        ],
      },
      {
        source: '/api/infinite',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, X-Requested-With',
          },
        ],
      }
    ];
  },
  // Add CORS and rewrites for specific embedded content
  async rewrites() {
    return [
      {
        source: '/embed/youtube/:id',
        destination: 'https://www.youtube.com/embed/:id'
      },
      {
        source: '/embed/vimeo/:id',
        destination: 'https://player.vimeo.com/video/:id'
      }
    ];
  },
  // Configure Turbopack to align with webpack configuration
  experimental: {
    turbo: {
      rules: {
        // Add the same shader support as in webpack config
        '*.glsl': ['raw-loader'],
        '*.vs': ['raw-loader'],
        '*.fs': ['raw-loader'],
        '*.vert': ['raw-loader'],
        '*.frag': ['raw-loader'],
      },
    },
    // Configure server actions body size limit (Next.js 13+)
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;

// Note: For API routes in the pages directory, you need to configure the size limit
// in each API route file individually using:
//
// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: '10mb',
//     },
//     responseLimit: '10mb',
//   },
// };
