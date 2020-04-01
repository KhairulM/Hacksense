const router = require("app/utils/express")();
const subRouter = require("app/utils/express")();
const props = require("app/utils/props");
const { assertNotNull, toInteger } = require("app/utils/request-validator");

const userActions = require("app/actions/user");

const multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "uploads");
  },
  filename: function(req, file, callback) {
    callback(null, file.fieldname + "-" + Date.now() + file.originalname);
  }
});

var uploadcv = multer({ storage: storage }).single("cv");

var uploadpic = multer({ storage: storage }).single("picture");

router.post("/", async (req, res) => {
  assertNotNull(req.body, "full_name");
  assertNotNull(req.body, "birth_date");
  assertNotNull(req.body, "email");
  assertNotNull(req.body, "phone_number");
  assertNotNull(req.body, "ktp_number");
  assertNotNull(req.body, "address");
  assertNotNull(req.body, "password");
  assertNotNull(req.body, "linkedin_url");
  assertNotNull(req.body, "username");

  const result = await userActions.createUser(req.body);

  res.json({ data: result });
});

router.use(
  "/:id",
  req => {
    req.parent.id_user = toInteger(req.params.id);
  },
  subRouter
);

subRouter.post("/cv", (req, res, next) => {
  uploadcv(req, res, async function(err) {
    console.log(req.file);
    if (err) {
      return;
    }

    const result = await userActions.createUserCV(
      req.parent.id_user,
      req.file.path
    );

    return;
  });
  res.status(200).json({ message: "Done" });
});

subRouter.put("/cv", (req, res, next) => {
  uploadcv(req, res, async function(err) {
    console.log(req.file);
    if (err) {
      return;
    }

    const result = await userActions.updateUserCV(
      req.parent.id_user,
      req.file.path
    );

    return;
  });
  res.status(200).json({ message: "Done" });
});

subRouter.get("/cv", async (req, res) => {
  const result = await userActions.getUserCVById(req.parent.id_user);

  res.json({ data: result });
});

subRouter.delete("/cv", async (req, res) => {
  const result = await userActions.deleteUserCVById(req.parent.id_user);

  res.json({ data: result });
});

subRouter.post("/picture", (req, res, next) => {
  uploadpic(req, res, async function(err) {
    console.log(req.file);
    if (err) {
      return;
    }

    const result = await userActions.createUserPic(
      req.parent.id_user,
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

    const result = await userActions.updateUserPic(
      req.parent.id_user,
      req.file.path
    );

    return;
  });
  res.status(200).json({ message: "Done" });
});

subRouter.get("/picture", async (req, res) => {
  const result = await userActions.getUserPicById(req.parent.id_user);

  res.json({ data: result });
});

subRouter.delete("/picture", async (req, res) => {
  const result = await userActions.deleteUserPicById(req.parent.id_user);

  res.json({ data: result });
});

subRouter.get("/", async (req, res) => {
  const result = await userActions.getUserById(req.parent.id_user);

  res.json({ data: props.exclude(result, ["password"]) });
});

subRouter.get("/password", async (req, res) => {
  const result = await userActions.getUserById(req.parent.id_user);

  res.json({ data: result });
});

subRouter.put("/", async (req, res) => {
  await userActions.updateUser(req.parent.id_user, req.body);

  res.status(204).end();
});

subRouter.delete("/", async (req, res) => {
  await userActions.deleteUser(req.parent.id_user);

  res.status(204).end();
});

module.exports = router.express();
