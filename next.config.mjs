/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.externals = [...(config.externals || []), 'bcrypt'];
      }
      return config;
    },
  };
  
  export default nextConfig;