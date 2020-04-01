const router = require("app/utils/express")();
const express = require("express");
const subRouter = require("app/utils/express")();
const { assertNotNull, toInteger } = require("app/utils/request-validator");
var nodemailer = require("nodemailer");

const requestActions = require("app/actions/request");

router.post("/", async (req, res, next) => {
  const result = await requestActions.createRequest(req.body);

  res.status(200).json({ message: result });
});

router.get("/", async (req, res) => {
  const result = await requestActions.getRequestByProjectId(
    req.parent.id_project
  );

  res.json({ data: result });
});

router.get("/", async (req, res) => {
  const result = await requestActions.getRequestByProjectIdAccepted(
    req.parent.id_project
  );

  res.json({ data: result });
});

router.delete("/", async (req, res) => {
  const result = await requestActions.deleteRequestByProjectId(
    req.parent.id_project
  );

  res.json({ data: result });
});

router.use(
  "/:id",
  req => {
    req.parent.id_user = toInteger(req.params.id);
  },
  subRouter
);

subRouter.get("/", async (req, res) => {
  const result = await requestActions.getRequestByProjectIdAndUserId(
    req.parent.id_project,
    req.parent.id_user
  );

  res.json({ data: result });
});

subRouter.delete("/", async (req, res) => {
  const result = await requestActions.deleteRequestByProjectIdAndUserId(
    req.parent.id_project,
    req.parent.id_user
  );

  res.json({ data: result });
});

router.put("/", async (req, res) => {
  const result = await requestActions.updateRequestByProjectIdAndUserId(
    req.body
  );

  res.json({ data: result });
});

module.exports = router.express();
