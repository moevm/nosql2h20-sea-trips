const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const formData = require("express-form-data");
const logger = require('morgan');

const indexRouter = require('./routes');

const app = express();

const options = {
    uploadDir: `./back-ups`,
    autoClean: true
};

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(formData.parse(options));
app.use(formData.format());

app.use('/sea-journal', indexRouter);

module.exports = app;
