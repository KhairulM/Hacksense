const jwt = require('jsonwebtoken');
const config = require('config');
const UnprocessableError = require('app/libs/service-error/UnprocessableError');

function createToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload, 
      config.JWT_SECRET, 
      { 
        expiresIn: '7d' 
      }, 
      function(err, result) {
        (err == null)? resolve(result) : reject(err);
      }
    );
  });
}

function verifyToken(token) {
  try {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token, 
        config.JWT_SECRET,
        function(err, result) {
          (err == null)? resolve(result) : reject(err);
        }
      );
    });
  } catch(err) {
    throw new UnprocessableError(
      'invalid token; probably expired or wrong token'
    );
  }
}

module.exports = {
  createToken,
  verifyToken
};
