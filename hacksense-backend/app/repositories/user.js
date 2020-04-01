const { returnOnlyDefinedProps } = require("app/utils/object");
const { reader, writer, execute, single } = require("app/utils/knex");

async function createUser(data) {
  const query = writer("user")
    .insert({
      full_name: data.full_name,
      birth_date: data.birth_date,
      email: data.email,
      phone_number: data.phone_number,
      ktp_number: data.ktp_number,
      address: data.address,
      password: data.password,
      linkedin_url: data.linkedin_url,
      username: data.username,
      point: 0
    })
    .returning("id_user");

  const userId = await single(query);

  return {
    id_user: userId
  };
}

async function getUserById(userId) {
  const query = await reader("user")
    .select(
      "full_name",
      "birth_date",
      "email",
      "phone_number",
      "ktp_number",
      "address",
      "password",
      "linkedin_url",
      "username",
      "point"
    )
    .where({
      id_user: userId
    });

  return single(query);
}

async function getUserByUsername(username) {
  const query = await reader("user")
    .select(
      "id_user",
      "full_name",
      "birth_date",
      "email",
      "phone_number",
      "ktp_number",
      "address",
      "password",
      "linkedin_url",
      "username",
      "point"
    )
    .where({
      username: username
    });

  return single(query);
}

async function createUserCV(userId, filepath) {
  const query = writer("cv")
    .insert({
      id_user: userId,
      cvpath: filepath
    })
    .returning("id_cv");

  const id_cv = await single(query);

  return {
    id_user: userId,
    id_cv: id_cv,
    cvpath: filepath
  };
}

async function updateUserCV(userId, filepath) {
  const query = writer("cv")
    .where("id_user", userId)
    .update({
      cvpath: filepath
    })
    .returning("id_cv");

  const id_cv = await single(query);

  return {
    id_user: userId,
    id_cv: id_cv,
    cvpath: filepath
  };
}

async function getUserCVById(userId) {
  const query = await reader("cv")
    .select("id_cv", "id_user", "cvpath")
    .where({
      id_user: userId
    });

  return execute(query);
}

function deleteUserCVById(userId) {
  return writer("cv")
    .where({ id_user: userId })
    .del();
}

async function createUserPic(userId, filepath) {
  const query = writer("user_picture")
    .insert({
      id_user: userId,
      picturepath: filepath
    })
    .returning("id_uPicture");

  const id_uPicture = await single(query);

  return {
    id_user: userId,
    id_uPicture: id_uPicture,
    picturepath: filepath
  };
}

async function updateUserPic(userId, filepath) {
  const query = writer("user_picture")
    .where("id_user", userId)
    .update({
      picturepath: filepath
    })
    .returning("id_uPicture");

  const id_uPicture = await single(query);

  return {
    id_user: userId,
    id_uPicture: id_uPicture,
    picturepath: filepath
  };
}

async function getUserPicById(userId) {
  const query = await reader("user_picture")
    .select("id_uPicture", "id_user", "picturepath")
    .where({
      id_user: userId
    });

  return execute(query);
}

function deleteUserPicById(userId) {
  return writer("user_picture")
    .where({ id_user: userId })
    .del();
}

function updateUser(userId, data) {
  const query = writer("user")
    .where("id_user", userId)
    .update(
      returnOnlyDefinedProps(data, [
        "full_name",
        "birth_date",
        "email",
        "phone_number",
        "ktp_number",
        "address",
        "linkedin_url",
        "username",
        "point"
      ])
    );

  return execute(query);
}

function deleteUser(userId) {
  return writer.transaction(async transaction => {
    const userQuery = transaction("user")
      .select(
        "full_name",
        "birth_date",
        "email",
        "phone_number",
        "ktp_number",
        "address",
        "password",
        "linkedin_url",
        "username"
      )
      .where({
        id_user: userId
      });

    const user = await single(userQuery);

    const deactivatedUserQuery = transaction("deactivated_user").insert({
      id_user: userId,
      full_name: user.full_name,
      birth_date: user.birth_date,
      email: user.email,
      phone_number: user.phone_number,
      ktp_number: user.ktp_number,
      address: user.address,
      password: user.password,
      linkedin_url: user.linkedin_url,
      username: user.username
    });

    await execute(deactivatedUserQuery);

    return writer("user")
      .where("id_user", userId)
      .del();
  });
}

module.exports = {
  createUser,
  getUserById,
  getUserByUsername,
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
