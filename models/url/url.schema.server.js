var mongoose = require('mongoose');

// create schema for url
var urlSchema = mongoose.Schema({
    tinyUrl: {type: String, unique: true, require: true, sparse: true},
    longUrl: {type: String, require: true},
}, {collection: 'url', timestamps: true, autoIndex: true});

module.exports = urlSchema;
