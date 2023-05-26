// import mongoose from "mongoose";
// const cartColletion = "carts";


// const cartSchema = mongoose.Schema({
//   products: [{
//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Product"
//     },
//     quantity: {
//       type: Number,
//       default: 0
//     }
//   }]
// });



// const cartModel = mongoose.model(cartColletion, cartSchema);
// export default cartModel;



// const cartSchema = mongoose.Schema({
//   products: [{
//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Product"
//     },
//     quantity: Number
//   }]
// });
// import mongoose from "mongoose";

// const cartColletion = "carts";

// const cartSchema = mongoose.Schema({
//   products: [{
//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Product"
//     },
//     quantity: {
//       type: Number,
//       default: 0
//     }
//   }]
// });



// const cartModel = mongoose.model(cartColletion, cartSchema);
// export default cartModel;
import mongoose from "mongoose";

const cartColletion = "carts";

const cartSchema = mongoose.Schema({
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products"
    },
    quantity: {
      type: Number,
      default: 0
    }
  }]
});

cartSchema.pre('findOne', function() {
  this.populate('products.product');
});

const cartModel = mongoose.model(cartColletion, cartSchema);

export default cartModel;
