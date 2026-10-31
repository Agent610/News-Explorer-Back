const Article = require("../models/article.js");
const { ApiError, ERROR_CODES } = require("../utils/errors.js");
const mongoose = require("mongoose");

const getArticles = async (req, res, next) => {
  try {
    const articles = await Article.find({ owner: req.user._id });

    return res.status(200).json(articles);
  } catch (error) {
    return next(error);
  }
};

const createArticle = async (req, res, next) => {
  try {
    const { keyword, title, text, date, source, link, image } = req.body;

    const article = await Article.create({
      keyword,
      title,
      text,
      date,
      source,
      link,
      image,
      owner: req.user._id,
    });

    return res.status(201).json(article);
  } catch (error) {
    if (error.name === "ValidationError") {
      return next(new ApiError(ERROR_CODES.BAD_REQUEST, error.message));
    }

    return next(error);
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params;

    if (!mongoose.isValidObjectId(articleId)) {
      throw new ApiError(ERROR_CODES.BAD_REQUEST, "Invalid Article ID.");
    }

    const article = await Article.findOneAndDelete({
      _id: articleId,
      owner: req.user._id,
    });

    if (!article) {
      throw new ApiError(ERROR_CODES.NOT_FOUND, "Article wasn't found.");
    }

    return res.status(200).json({
      message: "Article has been deleted.",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
