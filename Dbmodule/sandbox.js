const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sandbox = new Schema({
    code: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('Sandbox',sandbox);