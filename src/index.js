const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const env = require("dotenv");
const chalk = require("chalk");
const httpStatusCode = require("http-status-codes");
const path = require('path');


const connectDb = require('../config/db.mongo');
const creditRoute = require("./routes/credit.route");
const debitRoute = require("./routes/debit.route");

const app = express();
env.config({
    path: `${path.join(__dirname, "../config/config.env")}`
});

const PORT = process.env.PORT || 5115;

app.use(cors());
app.use(bodyParser.json());

connectDb();

app.use((req, res, next) => {
    console.log(chalk.blue(`${new Date().toString()} => ${req.originalUrl}`));
    next();
});

app.use(creditRoute);
app.use(debitRoute);
app.use(express.static("public"));

// 404 Error Handler. Request not found.
app.use((req, res, next) => {
    res.status(httpStatusCode.BAD_REQUEST).send(`Good news, you are where you want to be. Bad News, you are kinda lost`);
})

// 505 Error Handler
app.use((err, req, res, next) => {
    console.error(chalk.red(err.stack));
    res.sendFile(path.join(__dirname, '../public/505.html'));
})


app.listen(PORT, () => {
    console.log(chalk.bgWhite.black(`\n Sever started on ${PORT}`));
});