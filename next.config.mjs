const isGithubPages = process.env.GITHUB_PAGES === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGithubPages ? '/tmgm-site' : '',
  assetPrefix: isGithubPages ? '/tmgm-site/' : '',
};

export default nextConfig;
