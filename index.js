const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PhoneDirectory = require('./db.js');

//middlewares
app.use(express.json())
//databse connection
mongoose.connect("mongodb://localhost:27017/getData",{useNewUrlParser:true,useUnifiedTopology:true},(err) =>{
    if(err) console.log(err);
    console.log("database connected successfuly")
})

//contact list
let contactList = ["+911234567890","+911234567890","1234567890","1234567890","+912345654323","+9156221455245","+9898558521"];

//API handling
app.get('/',async (req,res) => {
    //this logic sorted the phone number array on the +91 and unique no means non repeatating array
    let filterContactList = contactList.filter((ele) => ele.includes("+91")).filter((ele,idx,arr) => ele !== arr[idx+1]);
    let verifyArr = [];
    const data = PhoneDirectory.find({},(err,docs) => {
        if (err) throw err;
        verifyArr = docs[0].phoneNo;
        res.send(verifyArr)
    });
    //this check if filter array is having any value or not and also check new array will have previous numbers or not
    if (filterContactList.length > 0 && filterContactList.join() !== verifyArr.join()){
        let newData = new PhoneDirectory();
        newData.phoneNo = filterContactList;
        await newData.save();
    } else {
        res.send("no new data inserted in array");
    }
})


//server connection
const PORT = "8000" || process.env.PORT;
app.listen(PORT,(err) => {
    if (err) console.log({message:`error got ${err}`});
    console.log(`app is listening on port ${PORT}`)
})