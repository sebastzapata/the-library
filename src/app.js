const express = require("express");
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFoundMiddleware = require("./middleware/not-found");
const app = express();
const books = require("./routes/books");

const { graphqlHTTP } = require("express-graphql");
const graphqlSchema = require("./graphql/schema");

app.use(express.json());

app.use("/api/v1/books", books);
app.use("/graphql", graphqlHTTP({ graphiql: true, schema: graphqlSchema }));

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
