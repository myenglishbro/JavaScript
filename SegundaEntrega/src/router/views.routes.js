import { Router } from "express";
import ProductManager from "../Dao/Managers/productmanagerMongo.js"

import CartModel from "../Dao/models/cartModel.js";
import productModel from "../Dao/models/productModel.js";

const viewRouter=Router()

const product = new ProductManager();


viewRouter.get("/products", async (req, res) => {
  const {page = 1} = req.query;
  const {docs, hasPrevPage, hasNextPage, nextPage, prevPage   } = await productModel.paginate({},{limit:4, page, lean:true })
  const products = docs;
  res.render('home', {
    products,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage
})

});
viewRouter.get('/carts/:cid', async (req, res) => {
  const cid = req.params.cid;
  try {
    const cart = await CartModel.findById(cid).populate('products.product');
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    const products = cart.products.map((item) => item.product.toObject()); // Convertir cada producto a un objeto plano

    res.render('cart', { cart: cart.toObject(), products });
  } catch (error) {
    res.status(500).json({ status: 'Error', message: 'Error al obtener el carrito' });
  }
});




viewRouter.get("/realtimeprod", async (req, res) => {
    const products = await product.getProducts();
    res.render("realtimeprod", { products });
  });



export default viewRouter;