const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const { logEvents } = require('./middleware/logger')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const Database = require('./config/database')
const cors = require('cors');
const corsOptions = require('./config/corsOptions')
require('dotenv').config();

const PORT = process.env.PORT || 3500

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())


const db = new Database(process.env.DATABASE_URI, null)

db.connect().catch((err) => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
}
)

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))
app.use('/auth', require('./routes/authRoutes'))
app.use('/user', require('./routes/userRoutes'))
app.use('/poll', require('./routes/pollRoutes'))

app.use(errorHandler);

process.on("SIGINT", async () => {
    try {
        await db.disconnect();
        console.log("Disconnected from database.");
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))