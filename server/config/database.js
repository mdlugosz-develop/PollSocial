const mongoose = require('mongoose');
mongoose.set("strictQuery", false)

class Database {
    constructor(uri, options) {
        this.uri = uri;
        this.options = options
    }

    async connect() {
        try {
            await mongoose.connect(this.uri, this.options)
            console.log(`Connected to databse: ${mongoose.connection.db.databaseName}`)

        } catch (err) {
            throw err
        }
    }

    async disconnect() {
        try {
            await mongoose.disconnect()
            console.log(`Disconnected from database: ${mongoose.connection.db.databaseName}`)

        } catch (err) {

        }
    }
}

module.exports = Database
