const { returnOnlyDefinedProps } = require("app/utils/object");
const { reader, writer, execute, single } = require("app/utils/knex");

async function createAdmin(data) {
  const query = writer("admin")
    .insert({
      username: data.username,
      password: data.password,
      point: 0
    })
    .returning("id_admin");

  const adminId = await single(query);

  return {
    id_admin: adminId
  };
}

async function getAdminById(adminId) {
  const query = await reader("admin")
    .select("password", "username", "point")
    .where({
      id_admin: adminId
    });

  return single(query);
}

async function getAdminByUsername(username) {
  const query = await reader("admin")
    .select("password", "id_admin", "point")
    .where({
      username: username
    });

  return single(query);
}

function updateAdmin(adminId, data) {
  const query = writer("admin")
    .where("id_admin", adminId)
    .update(returnOnlyDefinedProps(data, ["username", "point"]));

  return execute(query);
}

function deleteAdmin(adminId) {
  return writer("admin")
    .where("id_admin", adminId)
    .del();
}

async function createAdminPic(adminId, filepath) {
  const query = writer("admin_picture")
    .insert({
      id_admin: adminId,
      picturepath: filepath
    })
    .returning("id_aPicture");

  const id_aPicture = await single(query);

  return {
    id_admin: adminId,
    id_aPicture: id_aPicture,
    picturepath: filepath
  };
}

async function updateAdminPic(adminId, filepath) {
  const query = writer("admin_picture")
    .where({ id_admin: adminId })
    .update({
      picturepath: filepath
    })
    .returning("id_aPicture");

  const id_aPicture = await single(query);

  return {
    id_admin: adminId,
    id_aPicture: id_aPicture,
    picturepath: filepath
  };
}

async function getAdminPicById(adminId) {
  const query = await reader("admin_picture")
    .select("id_aPicture", "id_admin", "picturepath")
    .where({
      id_admin: adminId
    });

  return execute(query);
}

function deleteAdminPicById(adminId) {
  return writer("admin_picture")
    .where({ id_admin: adminId })
    .del();
}

module.exports = {
  createAdmin,
  getAdminById,
  getAdminByUsername,
  updateAdmin,
  deleteAdmin,
  createAdminPic,
  getAdminPicById,
  deleteAdminPicById
};
