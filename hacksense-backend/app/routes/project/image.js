const router = require("app/utils/express")();
const express = require("express");
const subRouter = require("app/utils/express")();
const { assertNotNull, toInteger } = require("app/utils/request-validator");

const projectImageActions = require("app/actions/projectImage");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "uploads");
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage }).single("image");

router.post("/", (req, res, next) => {
  upload(req, res, async function(err) {
    console.log(req.file);
    if (err) {
      return;
    }

    const result = await projectImageActions.createProjectImage(
      req.parent.id_project,
      req.file.path
    );

    return;
  });
  res.status(200).json({ message: "Done" });
});

router.use(
  "/:id",
  req => {
    req.parent.id_pImage = toInteger(req.params.id);
  },
  subRouter
);

subRouter.get("/", async (req, res) => {
  const result = await projectImageActions.getProjectImageById(
    req.parent.id_pImage
  );

  res.json({ imageId: result });
});

subRouter.delete("/", async (req, res) => {
  const result = await projectImageActions.deleteProjectImageById(
    req.parent.id_pImage
  );

  res.json({ data: result });
});

router.get("/", async (req, res) => {
  const result = await projectImageActions.getProjectImages(
    req.parent.id_project
  );

  res.json({ data: result });
});

subRouter.delete("/", async (req, res) => {
  const result = await projectImageActions.deleteProjectImages(
    req.parent.id_project
  );

  res.json({ data: result });
});

module.exports = router.express();
