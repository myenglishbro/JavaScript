import { Router } from "express";
import ProductManager from "../Managers/ProductManager.js"

const ProductRouter=Router()

const product = new ProductManager();



ProductRouter.get("/",async(req,res)=>{
    
    res.send(await product.getProducts())
  })

  
  ProductRouter.get("/:id",async(req,res)=>{
    const id= parseInt(req.params.id)
    res.send(await product.getProductsById(id))
  })

  ProductRouter.post("/",async(req,res)=>{
  const newProduct=req.body
  res.send(await product.addProduct(newProduct))
})

ProductRouter.delete("/:id",async(req,res)=>{
    const id= parseInt(req.params.id)
    res.send(await product.deleteProduct(id))
  })

  ProductRouter.put("/:id",async(req,res)=>{
    const id= parseInt(req.params.id)
    const updateProduct=req.body;

    res.send(await product.updateProduct(id,updateProduct))
  })

export default ProductRouter