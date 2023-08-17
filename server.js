const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const db = require('./db/connect.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(db.url, {
    dbName: "ecom",
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connected Successfully!!");    
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});

const CategoryRoute = require('./app/routes/category.js')
app.use('/api/v1/category',CategoryRoute)
