const withPlugins = require('next-compose-plugins');
const withOptimizedImages = require('next-optimized-images');

const nextConfig = {
  i18n: {
    locales: ['en-US', 'pl'],
    defaultLocale: 'pl',
  },
};

module.exports = withPlugins([[withOptimizedImages]], nextConfig);
