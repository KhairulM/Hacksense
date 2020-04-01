/*
 * --- CAUTION ---
 * Please notes that, changing environment variables
 * related with migration listed below,
 *  - PG_DATABASE
 *  - MIGRATOR_HOST
 *  - PG_DEFAULT_HOST
 *  - MIGRATOR_USER
 *  - MIGRATOR_PASSWORD
 * will affect ./.ebextensions/migration.config.
 *
 */

const PG_DEFAULT_HOST = process.env.PG_DEFAULT_HOST || 'localhost';
const PG_DEFAULT_PORT = process.env.PG_DEFAULT_PORT || '5432';

const READER = {
  READER_HOST: process.env.READER_HOST || PG_DEFAULT_HOST,
  READER_PORT: process.env.READER_PORT || PG_DEFAULT_PORT,
  READER_USER: process.env.READER_USER || process.env.PG_DEFAULT_USER,
  READER_PASSWORD:
    process.env.READER_PASSWORD || process.env.PG_DEFAULT_PASSWORD
};

const WRITER = {
  WRITER_HOST: process.env.WRITER_HOST || PG_DEFAULT_HOST,
  WRITER_PORT: process.env.WRITER_PORT || PG_DEFAULT_PORT,
  WRITER_USER: process.env.WRITER_USER || process.env.PG_DEFAULT_USER,
  WRITER_PASSWORD:
    process.env.WRITER_PASSWORD || process.env.PG_DEFAULT_PASSWORD
};

const MIGRATOR = {
  MIGRATOR_HOST: process.env.MIGRATOR_HOST || PG_DEFAULT_HOST,
  MIGRATOR_PORT: process.env.MIGRATOR_PORT || PG_DEFAULT_PORT,
  MIGRATOR_USER: process.env.MIGRATOR_USER || process.env.PG_DEFAULT_USER,
  MIGRATOR_PASSWORD:
    process.env.MIGRATOR_PASSWORD || process.env.PG_DEFAULT_PASSWORD
};

module.exports = {
  PG_DATABASE: process.env.PG_DATABASE || process.env.SERVICE_NAME,
  ...READER,
  ...WRITER,
  ...MIGRATOR
};
