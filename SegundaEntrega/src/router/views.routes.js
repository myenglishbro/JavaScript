import { Router } from "express";
import ProductManager from "../Dao/Managers/ProductManager.js"

const viewRouter=Router()

const product = new ProductManager();


viewRouter.get("/", async (req, res) => {
  const products = await product.getProducts();
  res.render("home", { products });
});


viewRouter.get("/realtimeprod", async (req, res) => {
    const products = await product.getProducts();
    res.render("realtimeprod", { products });
  });



export default viewRouter;