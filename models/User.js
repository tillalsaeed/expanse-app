import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Do Not Feel To Give Your Name"],
        unique: true,
       
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true,
      },
      img: {
        type: String,
        
      },
      balance: {
        type: Number,
        default: 0
      },
      role: {
        type: String,
        default: 'customer'
      }
     
    
    },
    {timestamps: true}

);




const User = mongoose.model('User', userSchema);

export default User;