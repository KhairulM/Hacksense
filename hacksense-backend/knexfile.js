const config = require('./config');

const DEFAULT = {
  client: 'pg',
  connection: {
    host: config.MIGRATOR_HOST,
    database: config.PG_DATABASE,
    user: config.MIGRATOR_USER,
    password: config.MIGRATOR_PASSWORD
  },
  pool: {
    min: 0,
    max: 5
  }
};

module.exports = {
  test: DEFAULT,
  development: DEFAULT,
  production: DEFAULT
};
