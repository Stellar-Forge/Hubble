/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    },
    reactStrictMode: false,
};

export default nextConfig;
