const logger = require('debug-levels')('DbConn')

const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost:27017/gramap'

const DbConn = {
  init() {
    logger.log('using mongoUri', mongoUri)
    mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
      logger.info('db connected')
      // we're connected!
    });

  }
}


export default DbConn
