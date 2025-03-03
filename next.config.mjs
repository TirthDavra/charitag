/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: process.env.IMAGE_HOSTNAME,
        // hostname: '192.168.1.19',
      },
    ],
  },
};

export default nextConfig;
