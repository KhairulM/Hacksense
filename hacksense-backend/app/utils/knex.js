const knex = require('knex');
const config = require('config');

const PostgreSQLError = require('app/libs/service-error/PostgreSQLError');

function executeTransaction(queryExecution) {
  return transaction => {
    queryExecution(transaction)
      .then(transaction.commit)
      .catch(transaction.rollback);
  };
}

async function execute(query) {
  try {
    return await query;
  } catch (error) {
    throw new PostgreSQLError(error);
  }
}

function createKnexObject(config) {
  const knexObject = knex(config);

  knexObject._transaction = knexObject.transaction.bind(knexObject);

  knexObject.transaction = function(queryExecution) {
    const transactionExecution = new Promise((resolve, reject) => {
      knexObject
        ._transaction(executeTransaction(queryExecution))
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });

    return execute(transactionExecution);
  };

  return knexObject;
}

async function single(query) {
  const result = await execute(query);

  if (result.length === 0) {
    return null;
  }

  return result[0];
}

async function selectMax(query, properties) {
  const queryResult = await execute(query);

  const returnedResult = {};
  properties.forEach(property => {
    returnedResult[property] = 0;
  });

  if (queryResult.length > 0) {
    const resultElement = queryResult[0];

    properties.forEach(property => {
      if (resultElement[property] != null) {
        returnedResult[property] = resultElement[property];
      }
    });
  }

  return returnedResult;
}

module.exports = {
  reader: createKnexObject({
    client: 'pg',
    connection: {
      host: config.READER_HOST,
      user: config.READER_USER,
      password: config.READER_PASSWORD,
      database: config.PG_DATABASE,
      port: config.READER_PORT
    },
    pool: { min: 0, max: 5 }
  }),
  writer: createKnexObject({
    client: 'pg',
    connection: {
      host: config.WRITER_HOST,
      user: config.WRITER_USER,
      password: config.WRITER_PASSWORD,
      database: config.PG_DATABASE,
      port: config.WRITER_PORT
    },
    pool: { min: 0, max: 5 }
  }),
  execute,
  single,
  selectMax
};
