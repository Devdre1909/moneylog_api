const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const env = require("dotenv");
const chalk = require("chalk");

const connectDb = require('../config/db.mongo');
const creditRoute = require("./routes/credit.route");

const app = express();
env.config({
    path: "../config/config.env"
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
app.use(express.static("public"));

app.listen(PORT, () => {
    console.log(chalk.green(`Sever started on ${PORT}`));
});