import { Router } from "express";
import ProductManager from "../Managers/ProductManager.js"

const viewRouter=Router()

const product = new ProductManager();

viewRouter.get("/realtimeprod", async (req, res) => {
    const products = await product.getProducts();
    res.render("realtimeprod", { products });
  });



export default viewRouter;