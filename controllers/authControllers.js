const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");
const UserAvailability = require("../models/userAvailabilityModel");

const { validateEmail, validatePassword } = require("../utils/index");

const JWT_SECRET = process.env.JWT_SECRET_KEY || "i-hope-i-will-not-need-this";

const signupNewUser = async (req, res, next) => {
  const { firstName, lastName, email, password, confirmPassword, timezone } =
    req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !confirmPassword ||
    !timezone
  ) {
    return res.status(400).json({
      error: { message: "All fields are required!" },
    });
  }

  const [isValidEmail, emailErrorMessage] = validateEmail(email);

  if (!isValidEmail) {
    return res.status(400).json({
      error: { message: emailErrorMessage },
    });
  }

  const [isValidPassword, passwordErrorMessage] = validatePassword(
    password,
    confirmPassword
  );

  if (!isValidPassword) {
    return res.status(400).json({
      error: { message: passwordErrorMessage },
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    req.login(newUser, (err) => {
      if (err) {
        return next(err);
      }
    });

    const userId = req.user._id;

    const newUserAvailability = new UserAvailability({
      userId,
      timezone,
    });

    await newUserAvailability.save();

    newUser.password = undefined;

    const token = jwt.sign({ id: userId, email: email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).json({
      success: { message: "A new user is created!" },
      data: { newUser, token },
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = (req, res, next) => {
  passport.authenticate("local", (error, user, info) => {
    if (error) {
      return next(error);
    }

    if (!user) {
      return res.status(401).json({
        error: { message: info.message },
      });
    }

    req.login(user, (error) => {
      if (error) {
        return next(error);
      }

      const user = { ...req.user._doc };
      user.password = undefined;

      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.status(200).json({
        success: { message: "Login successful" },
        data: { user, token },
      });
    });
  })(req, res, next);
};

const logoutUser = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return res.status(500).json({
        error: { message: "There is a problem logging out!" },
      });
    }

    req.session.destroy((error) => {
      if (error) {
        return res.status(500).json({
          error: { message: "Failed to destroy session during logout!" },
        });
      }

      res.clearCookie("connect.sid");

      return res.status(200).json({
        success: { message: "Logout successful!" },
      });
    });
  });
};

module.exports = { signupNewUser, loginUser, logoutUser };
