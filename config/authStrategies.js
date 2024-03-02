const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

const User = require("../models/userModel");

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, { message: "Incorrect email of password" });
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return done(err);
        }

        if (!result) {
          return done(null, false, { message: "Incorrect email or password" });
        }

        return done(null, user);
      });
    } catch (error) {
      done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser((user, done) => {
  return done(null, user);
});
