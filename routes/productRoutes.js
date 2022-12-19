import express from "express";
import { createProduct, getProduct, getUserProduct, deleteProduct, getProductType, updateProduct,getSingleProduct } from "../controllers/productController.js";
import authication from "../auth.js";

const Router = express.Router();


Router.post('/product',authication, createProduct);
Router.get('/product', getProduct);
Router.get('/product/:id', getSingleProduct);
Router.get('/data/:type',authication, getProductType);
Router.get('/productUser',authication, getUserProduct);
Router.patch('/product/:id',authication, updateProduct);
Router.delete('/product/:id',authication, deleteProduct);

export default Router;