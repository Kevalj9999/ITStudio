const express = require("express");
const bodyPraser = require("body-parser");
const mailer = require('nodemailer');
const https = require("https");
const app = express();
const cors = require('cors');

app.set("view engine", "ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(cors());
// app.use(function(req, res, next) {
//     // res.header("Access-Control-Allow-Origin", "*");
//     const allowedOrigins = ['http://localhost:3000'];
//     const origin = req.headers.origin;
//     if (allowedOrigins.includes(origin)) {
//          res.setHeader('Access-Control-Allow-Origin', origin);
//     }
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//     res.header("Access-Control-Allow-credentials", true);
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
//     next();
//   });

const status = mongoose.connect('mongodb+srv://kevalj:kevalj@cluster0.eui19q0.mongodb.net/ITStudioDB',{ useNewUrlParser: true});
console.log(status);


const donorSchema = new mongoose.Schema({
    Name: String,
    email: String,
    phone_number: Number,
    hobbies: String
});

const Donor = mongoose.model("Donor", donorSchema);

app.get("/",async function(req,res){
    // res.send("Hello");
    const donor_data=await Donor.find();
    res.send(donor_data);
});

let name,email,number,hobbies;

app.post("/deleteRow",async function(req,res){
    const id = await req.body._id;
    console.log(id);
    const response = await Donor.findByIdAndDelete(id); 
});

app.post("/submit",async function(req,res){
    var emailid=req.body.formData.email;
    var response=await Donor.findOne({email:emailid});
    if(response==null)
    {
        const donor = new Donor({
            Name:req.body.formData.name,
            email:req.body.formData.email,
            phone_number:req.body.formData.number,
            hobbies:req.body.formData.hobbies
        });
        donor.save().then(function (doc) {
            console.log(doc._id.toString());
        }).catch(function (error) {
            console.log(error);
        });
        console.log(0);
    }
    else
    {
        var doc = await Donor.findOneAndUpdate({ email: emailid }, { Name: req.body.formData.name , phone_number:req.body.formData.number , email:req.body.formData.email, hobbies:req.body.formData.hobbies});
        console.log(doc);
    }
});

app.post("/email",function(req,res){
    console.log(req.body);
});  

const PORT = 5000 || process.env.PORT;

app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}`)
});