import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    data: {
      title: {
        type: String,
      },
      category: {
        type: String,
      },
      amount: {
        type: Number,
      },
      productType: {
        type: String,
       
      }
    }
});



const Porduct = mongoose.model('Porduct', productSchema);

export default Porduct;


