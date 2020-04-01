const router = require("app/utils/express")();
const subRouter = require("app/utils/express")();
const props = require("app/utils/props");
const { assertNotNull, toInteger } = require("app/utils/request-validator");

const requestActions = require("app/actions/request");

router.get("/", async (req, res) => {
  const result = await requestActions.indexRequest();

  res.json({ data: result });
});

router.use(
  "/:id",
  req => {
    req.parent.id_user = toInteger(req.params.id);
  },
  subRouter
);

router.get("/", async (req, res) => {
  const result = await requestActions.getRequestByUserId(req.parent.id_user);

  res.json({ data: result });
});

module.exports = router.express();
