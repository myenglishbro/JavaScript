import mongoose from "mongoose"

const cartColletion="carts";

const cartSchema=mongoose.Schema({
    products:{
        type:Array,
        default:[ ]
    }
})


const cartModel=mongoose.Model(cartColletion,cartSchema);
export default cartModel;