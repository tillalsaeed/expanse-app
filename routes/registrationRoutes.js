import express from "express";
import authication from "../auth.js";
import {zero, signup, signin, findUsers, getBalance, logout } from "../controllers/auth/registerController.js";
const Router = express.Router();


Router.post('/register', signup);
Router.post('/signin', signin);
Router.post('/zero',authication, zero);
Router.get('/users', findUsers);
Router.get('/balance',authication, getBalance);
Router.post('/logout', logout);


export default Router;