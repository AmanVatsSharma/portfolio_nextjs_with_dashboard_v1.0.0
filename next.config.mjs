/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'encrypted-tbn1.gstatic.com',
      'cdn.sanity.io' // Adding this for Sanity.io images
    ],
  },
};

export default nextConfig;
