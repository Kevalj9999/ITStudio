//require('dotenv').config("./.env");
const express = require("express");
const bodyPraser = require("body-parser");
const request = require("request");
const passport = require('passport');
const https = require("https");
const app = express();

app.set("view engine", "ejs");
const mongoose = require("mongoose");
const { METHODS } = require("http");
app.use(express.static(__dirname));
app.use(bodyPraser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/ITStudio',{ useNewUrlParser: true});

app.get("/",function(req,res){
    res.sendFile("C:/Users/gujar/Desktop/ITStudio/landing_index.html");
});

app.listen(3000, function () {
    console.log("Server is running on port 3000")
});