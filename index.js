import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import {register, product} from "./routes/index.js";


const app = express();
app.use(cookieParser());

app.use(express.json());


dotenv.config();


// Middleware


app.use('/api', product);
app.use('/api', register);

const connect = () => {
    mongoose.connect(process.env.MONGO_URL).then(() => {console.log("connected Successfully")});
}


const Port = 8080 || process.env.PORT;

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
connect();

app.listen(Port, () => {
   
    console.log('Server Created succesfully ' + Port)});


    