/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['https://ggkmuyqgbglgvcckzroc.supabase.co'],
  },
};

export default nextConfig;
