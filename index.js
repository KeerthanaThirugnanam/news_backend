import express from "express"
//const express =require("express") 
//import bcrypt from "bcrypt"
 import cors from "cors"



 import newsRoute from "./controller/newsRoute.js"
 import bodyparser from 'body-parser';



//const cors =require("cors") 
import mongoose from "mongoose"
const app=express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb+srv://keerthanat2021:Keervit21.@cluster0.2hbdyej.mongodb.net/news")
var db=mongoose.connection;
db.on("open",()=>console.log("Connected to DB"))
db.on("error",()=>console.log("Not Connected to DB"))


const newSchema=new mongoose.Schema({
"email":{
type: String,
required: true
},
"password": {
type: String,
required: true
}
})

const collection=mongoose.model("collection",newSchema)


app.get("/",cors(),(req,res)=>{
  
})

app.post("/", async(req,res)=>{
    const{email, password}=req.body



    try{
        const check=await collection.findOne({email: email,password:password})

        if(check){
            
          
            console.log("Password is correct.");
            res.json("exist");
            

        

        }

        else{
            res.json("Not exist")
            
        }
   
   
   
    }

    catch(e){
        res.json("notexist")
        console.log("other error")

    }
})




app.post("/signup",async(req,res)=>{
    const{email,password}=req.body

      const data={
        email:email,
        password:password

      }

    try{
        const check=await collection.findOne({email:email})

        if(check){
            res.json("exist")
        }
        else{
            res.json("Not exist")
            await collection.insertMany([data])
        }
    }

    catch(e){
        res.json("notexist")

    }
})










app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());
app.use("/newsRoute",newsRoute);



app.listen(8000,()=> {
    console.log("port connected")
})
