import { Router } from "express";
import ProductManager from "../Managers/ProductManager.js"

const productRouter=Router()

const product = new ProductManager();



productRouter.get("/", async (req, res) => {
    const products = await product.getProducts();
    res.render("home", { products });
  });

  productRouter.get('/limit', async (req, res) => {
    const limit = parseInt(req.query.limit);
    const products = await product.getProductsLimit(limit);
    res.json(products);
  });
  
  
  productRouter.get("/:id",async(req,res)=>{
    const id= parseInt(req.params.id)
    res.send(await product.getProductsById(id))
  })

  productRouter.post("/",async(req,res)=>{
  const newProduct=req.body
  res.send(await product.addProduct(newProduct))
})


productRouter.delete("/:id",async(req,res)=>{
    const id= parseInt(req.params.id)
    res.send(await product.deleteProduct(id))
  })

  productRouter.put("/:id",async(req,res)=>{
    const id= parseInt(req.params.id)
    const updateProduct=req.body;

    res.send(await product.updateProduct(id,updateProduct))
  })

export default productRouter


// productRouter.get("/",async(req,res)=>{
    
//     res.send(await product.getProducts())
//   })
