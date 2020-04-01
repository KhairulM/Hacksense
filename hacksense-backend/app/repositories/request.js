const { returnOnlyDefinedProps } = require("app/utils/object");
const { reader, writer, execute, single } = require("app/utils/knex");
const nodemailer = require("nodemailer");
async function createRequest(data) {
  const query = writer("request")
    .insert({
      id_user: data.id_user,
      id_project: data.id_project,
      status: data.status
    })
    .returning("id_request");

  const id_request = await single(query);

  return {
    id_request: id_request
  };
}

async function indexRequest() {
  const query = reader("request").select(
    "id_request",
    "id_user",
    "id_project",
    "status"
  );

  return execute(query);
}

async function getRequestByProjectId(projectId) {
  const query = reader("request")
    .select("id_request", "id_user", "id_project", "status")
    .where({
      id_project: projectId
    });

  return execute(query);
}

async function getRequestByUserId(userId) {
  const query = reader("request")
    .select("id_request", "id_user", "id_project", "status")
    .where({
      id_user: userId
    });

  return execute(query);
}

async function getRequestByProjectIdAndUserId(projectId, userId) {
  const query = reader("request")
    .select("id_request", "id_user", "id_project", "status")
    .where({
      id_project: projectId,
      id_user: userId
    });

  return execute(query);
}

async function deleteRequestByProjectIdAndUserId(projectId, userId) {
  return writer("request")
    .where({
      id_project: projectId,
      id_user: userId
    })
    .del();
}

async function deleteRequestByProjectId(projectId) {
  return writer("request")
    .where({
      id_project: projectId
    })
    .del();
}

async function updateRequestByProjectIdAndUserId(data) {
  const query = writer("request")
    .where({
      id_project: data.id_project,
      id_user: data.id_user
    })
    .update(returnOnlyDefinedProps(data, ["id_user", "id_project", "status"]));

  var result = await execute(query);

  console.log("RES LAGI ", result);

  if (result > 0) {
    console.log("RES MASUK");
    var ret = await getRequestByProjectIdAndUserId(
      data.id_project,
      data.id_user
    );

    console.log("RET ", ret);

    ret.forEach(element => {
      console.log(element, "WOW");
      if (element.status == "accepted") {
        sendMailAccepted(element.id_user);
      }

      if (element.status == "rejected") {
        sendMailRejected(element.id_user);
      }
    });
  }

  return result;
}

async function sendMailAccepted(userId) {
  console.log("MAIL SEND STARRT");
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rayzamgh@gmail.com",
      pass: "s1m1l1k1t1"
    }
  });

  const query = reader("user")
    .select("email")
    .where({
      id_user: userId
    });

  var retuser = await single(query);

  var mailOptions = {
    from: "rayzamgh@gmail.com",
    to: retuser.email,
    subject: "That was easy!",
    html:
      "<h1>GOOD JOB!</h1><br><br><img src='https://images-platform.99static.com/pYaV5iTGY1Ucr19Q1A-m2HKLvO8=/1023x298:1595x870/fit-in/900x675/99designs-contests-attachments/108/108742/attachment_108742439'>",
    text:
      "Your request application for a project in codersense has been accepted!"
  };

  console.log("MAIL SEND END");

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

async function sendMailRejected(userId) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rayzamgh@gmail.com",
      pass: "s1m1l1k1t1"
    }
  });

  const query = reader("user")
    .select("email")
    .where({
      id_user: userId
    });

  var retuser = await single(query);

  var mailOptions = {
    from: "rayzamgh@gmail.com",
    to: retuser.email,
    subject: "Better luck next time",
    html:
      "<h1>Better luck next time!</h1><br><br><img src='https://images-platform.99static.com/pYaV5iTGY1Ucr19Q1A-m2HKLvO8=/1023x298:1595x870/fit-in/900x675/99designs-contests-attachments/108/108742/attachment_108742439'>",
    text:
      "Your request application for a project in codersense has been rejected."
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = {
  createRequest,
  indexRequest,
  getRequestByProjectId,
  getRequestByUserId,
  getRequestByProjectIdAndUserId,
  deleteRequestByProjectId,
  deleteRequestByProjectIdAndUserId,
  updateRequestByProjectIdAndUserId
};
