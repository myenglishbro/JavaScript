import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2";

const productColletion="products";

const productSchema=mongoose.Schema({
    title:String,
    description:String,
    price: Number,

    stock: Number,
    thumbnail: String,
    code: String
  
})

productSchema.plugin(mongoosePaginate);

const productModel=mongoose.model(productColletion,productSchema);
export default productModel;