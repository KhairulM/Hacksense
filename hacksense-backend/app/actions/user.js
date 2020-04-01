const DefaultError = require("app/libs/service-error/DefaultError");
const bcrypt = require("app/utils/bcrypt");
const userRepo = require("app/repositories/user");
const adminRepo = require("app/repositories/admin");

async function createUser(data) {
  const admin = await adminRepo.getAdminByUsername(data.username);

  if (admin != null) throw new DefaultError("username is taken");

  data.password = await bcrypt.hash(data.password);

  return userRepo.createUser(data);
}

function getUserById(userId) {
  return userRepo.getUserById(userId);
}

function updateUser(userId, data) {
  return userRepo.updateUser(userId, data);
}

function deleteUser(userId) {
  return userRepo.deleteUser(userId);
}

function createUserCV(userId, filepath) {
  return userRepo.createUserCV(userId, filepath);
}

function updateUserCV(userId, filepath) {
  return userRepo.updateUserCV(userId, filepath);
}

function getUserCVById(userId) {
  return userRepo.getUserCVById(userId);
}

function deleteUserCVById(userId) {
  return userRepo.deleteUserCVById(userId);
}

function createUserPic(userId, filepath) {
  return userRepo.createUserPic(userId, filepath);
}

function updateUserPic(userId, filepath) {
  return userRepo.updateUserPic(userId, filepath);
}

function getUserPicById(userId) {
  return userRepo.getUserPicById(userId);
}

function deleteUserPicById(userId) {
  return userRepo.deleteUserPicById(userId);
}

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  createUserCV,
  updateUserCV,
  getUserCVById,
  deleteUserCVById,
  createUserPic,
  updateUserPic,
  getUserPicById,
  deleteUserPicById
};
