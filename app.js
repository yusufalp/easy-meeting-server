require("dotenv").config();
require("./config/connection");
require("./config/authStrategies");

const express = require("express");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("node:path");

const MongoStore = require("connect-mongo");

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const userAvailabilityRoutes = require("./routes/userAvailabilityRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(helmet());
app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/userAvailability", userAvailabilityRoutes);
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  console.error("Error occurred:", err);

  if (err.code === 11000) {
    return res.status(400).json({
      error: { message: "Already have an account? Try logging in." },
    });
  }

  return res.status(500).json({
    error: { message: err.message },
  });
});

app.get("/", (req, res, next) => {
  res.send("<h1>Come one, come all...</h1>");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`The server is listening on port ${PORT}`));
