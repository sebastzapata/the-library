const express = require("express");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const app = express();
const books = require("./routes/books");

app.use(express.json());

app.use("/api/v1/books", books);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
