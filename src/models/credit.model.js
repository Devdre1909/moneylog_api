const mongoose = require('mongoose') ;

mongoose.connect('mongodb://localhost:27017/moneylog',{},()=>{
    console.log(`${new Date().toString()} => Mongo connected!`);
});

let creditSchema = mongoose.Schema({
    date_time: new Date().toJSON(),
    description: String,
    amount: Number
});

module.exports = mongoose.model('credit', creditSchema);