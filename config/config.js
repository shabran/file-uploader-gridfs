module.exports = {
    dev: {
        port: process.env.port || 3000,
        db: process.env.DB_LINK || "mongodb://localhost:27017/test",
    },
    prod: {
        port: process.env.PORT || 8080,
        db: process.env.DB_LINK || "mongodb://localhost:27017/test",
    }
}