const router = require("app/utils/express")();
const subRouter = require("app/utils/express")();
const { assertNotNull, toInteger } = require("app/utils/request-validator");

const projectActions = require("app/actions/project");

router.post("/", async (req, res) => {
  assertNotNull(req.body, "name");

  const result = await projectActions.createProject(req.body);

  res.json({ data: result });
});

router.get("/", async (req, res) => {
  const result = await projectActions.getProjects();

  res.json({ data: result });
});

router.use(
  "/:id",
  req => {
    req.parent.id_project = toInteger(req.params.id);
  },
  subRouter
);

subRouter.get("/", async (req, res) => {
  const result = await projectActions.getProjectById(req.parent.id_project);

  res.json({ data: result });
});

subRouter.put("/", async (req, res) => {
  const result = await projectActions.updateProject(
    req.parent.id_project,
    req.body
  );

  res.json({ data: result });
});

subRouter.use("/image", require("./image"));
subRouter.use("/request", require("./request"));

subRouter.delete("/", async (req, res) => {
  const result = await projectActions.deleteProject(req.parent.id_project);

  res.json({ data: result });
});

module.exports = router.express();
