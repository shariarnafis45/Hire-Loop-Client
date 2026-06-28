/** @type {import('next').NextConfig} */
const nextConfig = {
 
  serverExternalPackages: [
    "@better-auth/kysely-adapter", 
    "kysely"
  ],
  experimental: {
    reactCompiler: true, 
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;