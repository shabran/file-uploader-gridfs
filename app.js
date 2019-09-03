"use strict";

const app = require("express")(),
    config = require("./config/config");

// Express conf
require("./config/express.config")(app);

// MongoDB conf
require("./config/mongodb.config")(config);

app.get('/url_shortener', function(req, res) {
    res.sendFile(process.cwd() + '/url_shortener/index.html');
});

app.listen(config.prod.port, () => {
    console.log("Listening ..");
});