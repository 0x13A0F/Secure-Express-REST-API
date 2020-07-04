const mongoose = require('mongoose');

module.exports = async ({ dbUrl }) => {
    // replace the deprecated Promise of mongoose, with the global Promise
    mongoose.Promise = global.Promise;
    var connection;
    try {
        connection = await mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
        connection = connection.connection.db;
    }
    catch (err) {
        connection = null;
    }
    return connection;
}