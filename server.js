const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
mongoose.connect('mongodb://localhost/userdata');
require('./models/user');
 
var db=mongoose.connection; 

db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}); 


hostname= 'localhost';
app.set('port', process.env.PORT || 3001);
var port = app.get('port');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));


const user = mongoose.model("user");

app.get("/posts", async (req, res) => {
    try {
        const users = await user.find({})
        res.send(users)
    } catch (error){
        res.status(500)
    }
});


app.post("/posts", async (req, res) => {
    try {
        const user = new user();
        user.username = req.body.username;
        user.email = req.body.email;
        user.save()
        await res.send({
            data: user,
            status: "success"
        });
    } catch{
        res.send({
            status: "failed"
        })
    }
});


app.listen(port, (req, res) => {
    console.log(`I am running at port number http://${hostname}:${port}`);
});