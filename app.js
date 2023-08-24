require('dotenv').config("./.env");
const express = require("express");
const bodyPraser = require("body-parser");
const request = require("request");
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const https = require("https");
const app = express();

app.set("view engine", "ejs");
const mongoose = require("mongoose");
const { METHODS } = require("http");
app.use(express.static(__dirname));
app.use(bodyPraser.urlencoded({ extended: true }));

/*app.use(session({
    secret: "We are the beasts of the wizarding world.",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());*/

mongoose.connect('mongodb://localhost:27017/usersdb',{ useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true});