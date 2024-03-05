const bcrypt = require("bcrypt");

const User = require("../models/userModel");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    // remove password before sending it to client
    users && users.forEach((user) => (user.password = undefined));

    res.status(200).json({
      success: { message: "All users are retrieved!" },
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({
      error: { message: "User id is required!" },
    });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        error: { message: "There is not user with that id!" },
      });
    }

    // remove password before sending it to client
    user.password = undefined;

    res.status(200).json({
      success: { message: "User is found!" },
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const updateUserProfile = async (req, res, next) => {
  const { userId } = req.params;
  const { firstName, lastName } = req.body;

  if (!userId) {
    return res.status(400).json({
      error: { message: "User id is required!" },
    });
  }

  if (!firstName || !lastName) {
    return res.status(400).json({
      error: { message: "First and  last name is required!" },
    });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        error: { message: "There is no user with that id!" },
      });
    }

    res.status(200).json({
      success: { message: "User profile is updated!" },
    });
  } catch (error) {
    next(error);
  }
};

const updateUserPassword = async (req, res, next) => {
  const { userId } = req.params;
  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  const user = req.user;

  if (!user) {
    return res.status(401).json({
      error: { message: "User is not authorized!" },
    });
  }

  if (!userId) {
    return res.status(400).json({
      error: { message: "User id is required!" },
    });
  }

  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return res.status(400).json({
      error: { message: "All fields are required!" },
    });
  }

  try {
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        error: { message: "Invalid password" },
      });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: newHashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(400).json({
        error: { message: "Something went wrong when updating password!" },
      });
    }

    res.status(200).json({
      success: { message: "Password is updated!" },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserProfile,
  updateUserPassword,
};
