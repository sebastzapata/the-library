const MONGODB_URI = 'mongodb://mongo/the-library';
const mongodb = require('@condor-labs/mongodb')();
const logger = require('@condor-labs/logger');
mongodb.mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((mdb) => logger.log('DB is connected to', mdb.connection.host))
  .catch((error) => logger.err(error));

const app = require('./src/app');

app.listen(5000, () => {
  logger.log('Server listening on port 5000');
});
