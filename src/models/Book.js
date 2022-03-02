const mongodb = require("@condor-labs/mongodb")();

const bookSchema = mongodb.mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  pages: {
    type: Number,
    required: true,
    min: [1, "Books must have at least one page"],
  },
  status: {
    type: String,
    required: true,
    enum: {
      values: ["LENT", "AVAILABLE", "UNAVAILABLE"],
      message: "{VALUE} is not supported",
    },
  },
});

/**
 * Validates unique title
 */
bookSchema.path("title").validate(async (title) => {
  const titleCount = await mongodb.mongoose.models.Book.countDocuments({
    title,
  });
  return !titleCount;
}, "Title already exists");

module.exports = mongodb.mongoose.model("Book", bookSchema);
