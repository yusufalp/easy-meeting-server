const passport = require("passport");
const bcrypt = require("bcrypt");

const User = require("../models/userModel");
const UserAvailability = require("../models/userAvailabilityModel");

const { validateEmail, validatePassword } = require("../utils/index");

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

    res.status(201).json({
      success: { message: "A new user is created!" },
      data: newUser,
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

      return res.status(200).json({
        success: { message: "Login successful" },
        data: user,
      });
    });
  })(req, res, next);
};

const logoutUser = (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return res.status(400).json({
        error: { message: "There is a problem logging out!" },
      });
    }
  });

  res.status(200).json({
    success: { message: "User is logged out!" },
  });
};

module.exports = { signupNewUser, loginUser, logoutUser };
