import Porduct from "../models/Product.js";
import User from "../models/User.js";
import createError from "../error.js";
import { product } from "../routes/index.js";


export const createProduct = async (req, res, next) => {
    const title = req.body.title;
    const category = req.body.category;
    const amount = req.body.amount;
    const productType = req.body.productType;
    const id = req.user.id;

    
     
    try{

         const saveProduct = await new Porduct();
         saveProduct.data.title = title;
         saveProduct.data.category = category;
         saveProduct.data.amount = amount;
         saveProduct.data.productType = productType;
         saveProduct.userId = id;
         if(id){
            await saveProduct.save();
            res.status(200).json(saveProduct);
            const findUser = await User.findById(id);
            console.log(findUser);

            if(!findUser) return next(createError(400, "User not found"));
            if(productType == "Income"){
                 findUser.balance += amount;
                findUser.save();
            } else if(productType == "Expanse") {
                findUser.balance = findUser.balance - amount;
                findUser.save();
            }
             
           

         } else {
            res.status(404).json({message: "Please Login in First to Add Data"});
         }
        
        

    }catch(e){
        res.status(400).json({message: e.message});
    }

}

export const getProduct = async(req,res,next) => {

    try{
        const getProduct = await Porduct.find();
        res.status(200).json(getProduct);

    }catch(e){
        res.status(400).json({message: e.message});
    }
}

export const getUserProduct = async(req,res,next) => {

    try{
        const getProduct = await Porduct.find({userId: req.user.id});
        res.status(200).json(getProduct);

    }catch(e){
        res.status(400).json({message: e.message});
    }
}

export const deleteProduct = async(req,res,next) => {
    const id = req.params.id;
    const userid = req.user.id;
    
    // const userId = req.user.id;
    try{
        const findProduct = await Porduct.findOne({_id: id});
         if(!findProduct) return next(createError(404, "No Product found"));

         if(findProduct.userId === userid){
             let findUser = await User.findOne({_id: findProduct.userId});
             if(!findUser) return next(createError(404, "No User found"));
             if(findProduct.data.productType === "Income"){
               if(findProduct.data.amount){
                let Result = findUser.balance - findProduct.data.amount;
                findUser.balance = Result;
               }
                
               
             } else if (findProduct.data.productType === "Expanse"){
                if(findProduct.data.amount){

                let Result = findUser.balance + findProduct.data.amount;
                 findUser.balance = Result;
                }
              
             }

             await findUser.save();

              await Porduct.findByIdAndDelete(id);
             res.status(200).json("Your product has been deleted");

         } else {
            res.status(404).json("You are not allowed to delete this product");
         }

         //await Porduct.findByIdAndDelete(id);
       

    }catch(e){
        res.status(400).json({message: e.message});
    }
} 


export const getProductType = async( req, res, next ) => {
    const type = req.params.type;
    const userId = req.user.id;
    try{
        
        const find = await Porduct.find({"data.productType": type, userId : userId});
        console.log(find);
        res.status(200).json(find);

    }catch(e){
        res.status(400).json({message: e.message});
    }
}

export const updateProduct = async(req,res,next) => {
    const amount  = req.body.amount;
    const title = req.body.title;
    const category = req.body.category;
    const productType = req.body.productType;
    try{
        // 1.Get id of product which u updates
        const id = req.params.id;
        // 2. Get Product Detail by id
        const getProduct = await Porduct.findById(id);
        // 3. Send Error if cannot find product by id.
        if (!getProduct) return next(createError(400, "Product Not Found"));

        //4. Get User id from token.
        const userId = req.user.id;
        // 5. Check if login user have same id as Product user Id than we can update product

        const getUser = await User.findOne({_id: getProduct.userId});

        if(getProduct.userId === userId) {
            // Check if product type is Income or Expanse and also is it change or not.
             if(productType === "Income" && getProduct.data.amount !== amount){
                  const removeData  = getUser.balance - getProduct.data.amount;
                  getUser.balance = removeData;
                  const addData = getUser.balance + amount;
                  getUser.balance  = addData;
                  await getUser.save();

             } else if(productType === "Expanse" && getProduct.data.amount !== amount){
                
                getUser.balance  = getUser.balance + getProduct.data.amount;
                getUser.balance  = getUser.balance - amount;
                await getUser.save();
             } else {
                getUser.save();
             }

             getProduct.data.title = title;
             getProduct.data.amount = amount;
             getProduct.data.category = category;
             getProduct.data.productType = productType;
             await getProduct.save();
             res.status(200).json(getProduct);
        } else {
            res.status(404).json({message: "You not allowed to change some one else Product"});
        }




    }catch(e){
        res.status(400).json({message: e.message});
    }
}

export const getSingleProduct = async(req, res, next) => {
     const id = req.params.id;
    try{
        const singleProduct = await Porduct.findById(id);
        res.status(200).json(singleProduct);

    }catch(e){
        res.status(404).json({message: e.message});
    }
}