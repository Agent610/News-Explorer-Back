const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const { ApiError, ERROR_CODES } = require("../utils/errors.js");
const { error } = require("winston");

const createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      throw new ApiError(
        ERROR_CODES.BAD_REQUEST,
        "The following are required: Email, Password, and Name.",
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ApiError(
        ERROR_CODES.CONFLICT,
        "There's already a user with this email.",
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
    });

    return res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    if (error.code === 11000) {
      return next(
        new ApiError(
          ERROR_CODES.CONFLICT,
          "There's a alreadu a user with this email.",
        ),
      );
    }
  }

  if (error.name === "ValidationError") {
    return next(new ApiError(ERROR_CODES.BAD_REQUEST, error.message));
  }

  return next(error);
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ApiError(
        ERROR_CODES.BAD_REQUEST,
        "Both Email and Password are required.",
      );
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new ApiError(
        ERROR_CODES.UNAUTHORIZED,
        "Incorrect login credentials.",
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(
        ERROR_CODES.UNAUTHORIZED,
        "Incorrect login credentials.",
      );
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new ApiError(ERROR_CODES.NOT_FOUND, "This user doesn't exist.");
    }

    return res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
};
