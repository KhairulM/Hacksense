module.exports = {
  SERVICE_NAME: process.env.SERVICE_NAME,
  PORT: process.env.PORT || 3000,
  ENV: process.env.NODE_ENV || 'development',
  ERROR_LOG_PATH: process.env.ERROR_LOG_PATH || null,
  JWT_SECRET: process.env.JWT_SECRET || 'hacksense'
};
