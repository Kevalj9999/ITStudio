const express = require("express");
const bodyPraser = require("body-parser");
const mailer = require('nodemailer');
const https = require("https");
const app = express();
var cors = require('cors');
app.use(cors);

app.set("view engine", "ejs");
const mongoose = require("mongoose");
const { METHODS } = require("http");
app.use(express.static(__dirname));
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/ITStudio',{ useNewUrlParser: true});


const donorSchema = new mongoose.Schema({
    Name: String,
    email: String,
    phone_number: Number,
    hobbies: String
});

const Donor = mongoose.model("Donor", donorSchema);

app.get("/",async function(req,res){
    const donor_data=await Donor.find();
    res.json(donor_data);
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
    console.log(req.body.formData.name);
});

app.post("/email",function(req,res){
    console.log(req.body);
});  

app.listen(5000 || process.env.PORT, function () {
    console.log("Server is running on port 5000")
});