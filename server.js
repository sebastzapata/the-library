const MONGODB_URI = "mongodb://mongo/the-library";
const mongodb = require("@condor-labs/mongodb")();
mongodb.mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((mdb) => console.log("DB is connected to", mdb.connection.host))
  .catch((error) => console.log(error));

const app = require("./src/app");

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
