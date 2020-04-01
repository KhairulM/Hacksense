const router = require("app/utils/express")();
const subRouter = require("app/utils/express")();
const props = require("app/utils/props");
const { assertNotNull, toInteger } = require("app/utils/request-validator");

const adminActions = require("app/actions/admin");

const multer = require("multer");
var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "uploads");
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now() + file.originalname);
  }
});

var uploadpic = multer({ storage: storage }).single("picture");

router.post("/", async (req, res) => {
  assertNotNull(req.body, "password");
  assertNotNull(req.body, "username");

  const result = await adminActions.createAdmin(req.body);

  res.json({ data: result });
});

router.use(
  "/:id",
  req => {
    req.parent.id_admin = toInteger(req.params.id);
  },
  subRouter
);

subRouter.post("/picture", (req, res, next) => {
  uploadpic(req, res, async function(err) {
    console.log(req.file);
    if (err) {
      return;
    }

    const result = await adminActions.createAdminPic(
      req.parent.id_admin,
      req.file.path
    );

    return;
  });
  res.status(200).json({ message: "Done" });
});

subRouter.put("/picture", (req, res, next) => {
  uploadpic(req, res, async function(err) {
    console.log(req.file);
    if (err) {
      return;
    }

    const result = await adminActions.updateAdminPic(
      req.parent.id_admin,
      req.file.path
    );

    return;
  });
  res.status(200).json({ message: "Done" });
});

subRouter.get("/picture", async (req, res) => {
  const result = await adminActions.getAdminPicById(req.parent.id_admin);

  res.json({ data: result });
});

subRouter.delete("/picture", async (req, res) => {
  const result = await adminActions.deleteAdminPicById(req.parent.id_admin);

  res.json({ data: result });
});

subRouter.get("/", async (req, res) => {
  const result = await adminActions.getAdminById(req.parent.id_admin);

  res.json({ data: props.exclude(result, ["password"]) });
});

subRouter.get("/password", async (req, res) => {
  const result = await adminActions.getAdminById(req.parent.id_admin);

  res.json({ data: result });
});

subRouter.put("/", async (req, res) => {
  await adminActions.updateAdmin(req.parent.id_admin, req.body);

  res.status(204).end();
});

subRouter.delete("/", async (req, res) => {
  await adminActions.deleteAdmin(req.parent.id_admin);

  res.status(204).end();
});

module.exports = router.express();
