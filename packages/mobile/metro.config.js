const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Ensure JS bundles are served with correct MIME type
config.server = {
  ...config.server,
  enhanceMiddleware: (middleware) => {
    return (req, res, next) => {
      if (req.url && req.url.endsWith('.bundle')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
      return middleware(req, res, next);
    };
  },
};

module.exports = config;
