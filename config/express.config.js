"use strict";

const bodyParser = require("body-parser"),
    busboyBodyParser = require("busboy-body-parser");

module.exports = app => {
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        res.header("Access-Control-Allow-Credentials", true);
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
        next();
    });

    app.use(bodyParser.json({ limit: "16mb" }));
    app.use(bodyParser.urlencoded({ extended: true, limit: "16mb" }));
    app.use(busboyBodyParser({ limit: "64mb" }));

    //[*]Routes Configuration
    let main = require("../server.js");
    app.use("/", main);
};