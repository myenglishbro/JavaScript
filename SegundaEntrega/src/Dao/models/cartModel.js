import mongoose from "mongoose"

const cartColletion="carts";

const cartSchema=mongoose.Schema({
    products:{
        type:Array,
        default:[ ]
    }
})


const cartModel=mongoose.model(cartColletion,cartSchema);
export default cartModel;