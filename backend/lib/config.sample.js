'use strict';

process.env.NODE_ENV = 'development'; //'production';

module.exports = {
  api: {
    port: 8080
  },
  db: db => `mongodb://user:pass@hostname:port/${db}?authSource=admin`,
  logs: {
    transports: { filename: './logs.log' },
    exceptions: { filename: './exceptions.log' }
  }
}
