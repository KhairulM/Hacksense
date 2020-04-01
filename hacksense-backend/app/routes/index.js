const express = require("express");
const app = express();

app.use((req, res, next) => {
  req.parent = {};
  next();
});

app.get("/", (req, res) => {
  res.json({ timestamp: Date.now() });
});

app.use("/project", require("./project"));
app.use("/user", require("./user"));
app.use("/admin", require("./admin"));
app.use("/auth", require("./auth"));
app.use("/request", require("./request"));

app.use("/uploads", express.static("uploads"));

app.all("*", (req, res, next) => {
  res.status(200).json({ message: "not found" });
});

module.exports = app;
