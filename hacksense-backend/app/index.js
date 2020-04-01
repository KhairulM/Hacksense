const app = require("express")();
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

const cors = require("cors");

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(require("app/routes"));

app.use(require("app/middlewares/error-handler"));

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    /* eslint-disable no-console */
    console.log(`Server is running on port ${PORT}.`);
    console.log(`Started at ${new Date().toUTCString()}`);
    /* eslint-enable no-console */
  });
}

module.exports = app;
