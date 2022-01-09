const mongoose = require('mongoose');
const url = "mongodb+srv://Henry:12345@schedeulemode.4vfu7.mongodb.net/Network?retryWrites=true";

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert")

//-----sync syntax-----
MongoClient.connect(url, function(err, client) {
    assert.equal(null, err)
    console.log("connect to " + url)
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("MongoDB連線成功");
});

const memberSchema = new mongoose.Schema({
    ID: Array,
    Name: Array,
    FixedDay: Array,
});

memberSchema.set('Network', 'Member');

const model = mongoose.model('Member', memberSchema);
module.exports = model;