const mongodb = require("@condor-labs/mongodb")();
const db = "mongodb://127.0.0.1/the-library";
mongodb.mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = require("./src/app");

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
