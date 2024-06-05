const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();

mongoose.connect('mongodb://localhost:27017/urll')
.then(() => {
    console.log("MongoDB connected");
})

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

const indexRouter = require('./routes/index');
app.use('/', indexRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
