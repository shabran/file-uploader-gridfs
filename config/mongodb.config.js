let MongoClient = require("mongodb").MongoClient;
module.exports = config => {
    var dbURI = config.prod.db;
    MongoClient.connect(
        dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        (err, db) => {
            if (err) throw err;
            global.dbo = db.db("gridfs_storage");
        }
    );
};