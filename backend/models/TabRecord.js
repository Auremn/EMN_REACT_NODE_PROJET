const mongoose = require('mongoose');

const record = mongoose.Schema({
    name: { type: String, required: true },
    date: { type: String, required: true },
    Score: { type: String, required: true },
});

module.exports = mongoose.model('TabRecord', record );