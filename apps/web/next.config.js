const nextConfig = {
  // output: "standalone",
  transpilePackages: ["@blacksof/types", "@blacksof/utils", "@blacksof/services"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;
