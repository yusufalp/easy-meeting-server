const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("node:path");

const app = express();
const PORT = 8080;

app.use(helmet());
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.send("<h1>Come one, come all...</h1>");
});

app.listen(PORT, () => console.log(`The server is listening on port ${PORT}`));
