const mongoose = require('mongoose');
const chalk = require('chalk');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect("mongodb://localhost:27017/moneylog", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(chalk.green(`MongoDB connected: ${chalk.green.bold(conn.connection.host)} @ ${chalk.green.bold(new Date().toString())}`))
    } catch (err) {
        console.log(chalk.red(err.message));
    }
};

module.exports = connectDB;