const server = require("express").Router();

var mongodb = require("mongodb"),
    MongoClient = require("mongodb").MongoClient,
    ObjectId = require("mongodb").ObjectID,
    util = require("./util.js");


server.get("/", (req, res) => {
    res.send("Hello! -Shabran ");
});

//file uploader
server.post("/upload", (req, res) => {
    let part = req.files.upfile;
    if (util.isEmpty(part)) {
        res.status(404).send({
            message: "File not found"
        });
    } else {
        var bucket = new mongodb.GridFSBucket(dbo);
        let writeStream = bucket.openUploadStream(part.name, {
            contentType: part.mimetype,
            metadata: part.size
        });
        writeStream.on("finish", file => {
            // checking for file
            return res.status(200).send({
                id: file._id,
                name: file.filename,
                type: file.contentType,
                size: file.metadata
            });
        });
        // using callbacks is important !
        // writeStream should end the operation once all data is written to the DB
        writeStream.end(part.data);
    }
});


server.get("/files/:id", (req, res) => {
    let id = ObjectId(req.params.id);
    let bucket = new mongodb.GridFSBucket(dbo);
    bucket.find({ _id: id }).toArray((err, files) => {
        if (err) throw err;
        if (files.length === 0) {
            return res.status(404).send({
                message: "File not found"
            });
        }
        let readstream = bucket.openDownloadStream(files[0]._id);
        readstream.on("error", err => {
            // if theres an error, respond with a status of 500
            res.status(500).send(err);
        });
        res.set("Content-Type", files[0].contentType);
        return readstream.pipe(res);
    });
});



module.exports = server;