/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        ENCRYPTION_KEY: "qwertyuiopasdfghjklzxcvbnmqwerty",
    },
    webpack: (config, { isServer }) => {
        // Custom webpack config if needed
        return config;
    },
    eslint: {
        ignoreDuringBuilds: false,
    },
    typescript: {
        ignoreBuildErrors: false,
        tsconfigPath: "tsconfig.json",
    },
    distDir: ".next",
    cleanDistDir: true,
    assetPrefix: "",
    experimental: {
        outputFileTracing: true,
    },
    configOrigin: "next.config.mjs",
    useFileSystemPublicRoutes: true,
    generateBuildId: async () => {
        // You can add custom logic here to generate a build ID
        return `build-${Date.now()}`;
    },
    generateEtags: true,
    pageExtensions: ["tsx", "ts", "jsx", "js"],
};

module.exports = nextConfig;
