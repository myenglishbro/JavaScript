import { Router } from "express";
import ProductManager from "../Managers/ProductManager.js"

const viewRouter=Router()

const product = new ProductManager();

viewRouter.get("/", async (req, res) => {
    const products = await product.getProducts();
    res.render("home", { products });
  });



export default viewRouter;