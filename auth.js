import jwt from "jsonwebtoken";
import createError from './error.js';

const authication =  (req, res, next) => {

    // Steps
    //1. get token value through cookies from request
    //2. check if token is not valid through an error handler
    //3. if token is valid verify token with token value and our secret key and a call back function call back function have two parameters one is err and other is success if givien value or verify is not compared u can throw and error else u can assign to req.user to your send back value.

    const token = req.cookies.access_token;
    if(!token) return next(createError(400, "Invalid Access Token"));
    jwt.verify(token, "Secretkey", (err, user) => {
      if(err) return next(createError(400, err.message));
      req.user = user;
      next();
    });

};

export default authication;