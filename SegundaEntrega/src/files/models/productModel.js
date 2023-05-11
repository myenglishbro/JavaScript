import mongoose from "mongoose"

const productColletion="products";

const productSchema=mongoose.Schema({
    title:String,
    description:String,
    stock: Number,
    thumbnail: String,
    price: Number,
    code: String
  
})


const productModel=mongoose.Model(productColletion,productSchema);
export default productModel;