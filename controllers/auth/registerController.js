import User from "../../models/User.js";
import bcrypt from "bcrypt";
import createError from "../../error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {

    try{

        // Steps
        //1. Bcrypt password

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const sendData = {...req.body, password: hash};
        const user = new User(sendData);
        await user.save();
        res.status(200).json(user);
    
    

    }catch(e){
        res.status(400).json(e.message);
    }

}


export const signin = async(req, res, next) => {
 try{
    // Steps
    //1. get Username and password from request body
    //2. check if username is not valid through an error handler
    //3. if username is valid check password bycrpt by getting the password from body and one by getting from query.
    //4. if password is not valid through an error handler
    //5. create a new json token which accpet two things one the things u want to get and one the secret key
    //6. send data with res.cookies create a cookie name and save that json token in it and send with status.
    const username = req.body.name;
    const getPassword = req.body.password;
    console.log(getPassword);

    const findUser = await User.findOne({name: username});
    if(!findUser) return next(createError(400, "User not created you have to singup first"));
    const isCorrect = await bcrypt.compare(getPassword, findUser.password);
    if(!isCorrect) return next(createError(400, "Password Doesnot matching Please enter your password correctly"));
    const token = jwt.sign({id: findUser._id, email: findUser.email}, "Secretkey");
    const {password, ...other} = findUser._doc;
    res.cookie("access_token", token, {
        httpOnly: true,
    }).status(200).json(other);





 }catch(e){
    res.status(404).json(e.message);
 }


}

export const findUsers = async (req, res, next) => {
    try{

        const findUsers = await User.find();
        res.status(200).json(findUsers);

    }catch(e){
        res.status(404).json(e.message);
    }
};

export const getBalance = async( req, res, next) => {
    let userId = req.user.id;
    try{
     let findUser = await User.find({_id: userId});
     res.status(200).json({balance: findUser[0].balance});

    }catch(e){
        res.status(404).json(e.message);
    }
}

export const logout = async(req,res,next) => {

    try{
        res.clearCookie("access_token");
        res.status(200).json({msg: "Logout successfully"});

    }catch(e){
        res.status(400).json({msg: e.message});
    }
}

export const zero = async (req, res, next) => {
    try{
        const id = req.user.id;
        const data = await User.findById(id);
        data.balance = 0;
        data.save();
        res.status(200).json("Balance Set to Empty");
        

    }catch(e){
        res.status(400).json({msg: e.message});
    }
}