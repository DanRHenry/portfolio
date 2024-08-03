const mongoose = require('mongoose');

const CONNECTION = process.env.CONNECTION;
const MONGO = process.env.MONGODB;

mongoose.connect(CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));