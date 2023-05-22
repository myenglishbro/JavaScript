import mongoose from "mongoose";
const cartColletion = "carts";
const cartSchema = mongoose.Schema({
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }]
});
const cartModel = mongoose.model(cartColletion, cartSchema);
export default cartModel;
