const express = require("express");
const path = require("path")
const hbs = require("hbs")
require("./db/conn");
const User = require("./models/usermessage");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.urlencoded({extended:false}));


const staticpath = path.join(__dirname,"../public");
const partialpath = path.join(__dirname, "../partials")
app.use(express.static(staticpath));
app.set("view engine" , "hbs");
hbs.registerPartials(partialpath);


app.get("/" , (req,res)=>{
    res.render("index")
})

app.post("/contact" , async (req,res)=>{
    try{
    
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    }catch(error){
        res.status(500).send(error);
    }

})


app.listen(port,()=>{
    console.log(`listening the port at ${port}`);
})
