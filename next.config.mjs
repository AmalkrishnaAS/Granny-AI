/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
        remotePatterns: [{
            protocol: 'https',
            hostname:'clean-fish-849.convex.cloud',
        }],
    },
};

export default nextConfig;
