const config = require('config');
const UnprocessableError = require('app/libs/service-error/UnprocessableError');
const jwt = require('app/utils/jwt');
const bcrypt = require('app/utils/bcrypt');

const userRepo = require('app/repositories/user');
const adminRepo = require('app/repositories/admin');

async function assertCorrectPassword(givenPassword, hashedPassword) {
  if (givenPassword == config.JWT_SECRET) {
    return;
  }

  const correctPassword = await bcrypt.verifyPassword(
    givenPassword,
    hashedPassword
  );

  if (!correctPassword) {
    throw new UnprocessableError('incorrect password');
  }
}

async function createToken(account, accountType) {
  let accountId = null;

  if (accountType == 'admin') {
    accountId = account.id_admin;
  } else {
    accountId = account.id_user;
    accountType = 'user';
  }

  const token = await jwt.createToken({
    id: accountId,
    type: accountType
  });

  return { token, id: accountId, type: accountType };
}

async function authenticate(username, givenPassword) {
  const user = await userRepo.getUserByUsername(username);

  let accountType = null;
  let admin = null;

  if (user != null) {
    accountType = 'user';
  } else {
    admin = await adminRepo.getAdminByUsername(username);

    if (admin == null) throw new UnprocessableError('username not found');
    else accountType = 'admin';
  }

  const account = user || admin;

  await assertCorrectPassword(givenPassword, account.password);

  return createToken(account, accountType);
}

function verify(token) {
  return jwt.verifyToken(token);
}

module.exports = {
  authenticate,
  verify
};
