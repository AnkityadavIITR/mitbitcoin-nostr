/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["gateway.lighthouse.storage", "another.allowed.domain.com"], // Add all required domains here
  },
};

export default nextConfig;
