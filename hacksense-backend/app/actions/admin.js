const DefaultError = require("app/libs/service-error/DefaultError");
const bcrypt = require("app/utils/bcrypt");
const adminRepo = require("app/repositories/admin");
const userRepo = require("app/repositories/user");

async function createAdmin(data) {
  const user = await userRepo.getUserByUsername(data.username);

  if (user != null) throw new DefaultError("username is taken");

  data.password = await bcrypt.hash(data.password);

  return adminRepo.createAdmin(data);
}

function getAdminById(adminId) {
  return adminRepo.getAdminById(adminId);
}

function updateAdmin(adminId, data) {
  return adminRepo.updateAdmin(adminId, data);
}

function deleteAdmin(adminId) {
  return adminRepo.deleteAdmin(adminId);
}

function createAdminPic(adminId, filepath) {
  return adminRepo.createAdminPic(adminId, filepath);
}

function updateAdminPic(adminId, filepath) {
  return adminRepo.updateAdminPic(adminId, filepath);
}

function getAdminPicById(adminId) {
  return adminRepo.getAdminPicById(adminId);
}

function deleteAdminPicById(adminId) {
  return adminRepo.deleteAdminPicById(adminId);
}

module.exports = {
  createAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  createAdminPic,
  updateAdminPic,
  getAdminPicById,
  deleteAdminPicById
};
