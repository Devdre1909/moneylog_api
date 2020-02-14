const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let debitSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        match: /[a-zA-Z]/,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('debit', debitSchema);