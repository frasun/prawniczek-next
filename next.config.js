/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack']
        });
        return config;
    },
    publicRuntimeConfig: {
        API_URL: process.env.API_URL,
    },
}

module.exports = nextConfig
