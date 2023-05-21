import { Router } from "express";
import ProductManager from "../Dao/Managers/productmanagerMongo.js"
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


viewRouter.get("/realtimeprod", async (req, res) => {
    const products = await product.getProducts();
    res.render("realtimeprod", { products });
  });



export default viewRouter;