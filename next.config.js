// next.config.js
const { i18n } = require('./next-i18next.config');
const nextConfig = {
  i18n,
  reactStrictMode: true,
  env: {
    // apiUrl: 'http://localhost:1337',
    apiUrl: 'https://news-back-fbf367a85ae3.herokuapp.com',
  },
};

module.exports = nextConfig;
