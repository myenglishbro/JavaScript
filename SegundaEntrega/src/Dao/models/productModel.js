import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2";

const productColletion="products";

const productSchema=mongoose.Schema({
    title:String,
    description:String,
    stock: Number,
    thumbnail: String,
    price: Number,
    code: String
  
})

productSchema.plugin(mongoosePaginate);

const productModel=mongoose.model(productColletion,productSchema);
export default productModel;