/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /.svg$/i,
      issuer: /.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },

  sassOptions: {
    includePaths: ["styles"],
    additionalData: `@import "src/styles/globals.scss";`,
  },
};

export default nextConfig;
