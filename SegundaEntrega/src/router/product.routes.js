import { Router } from "express";
import ProductManager from "../Managers/ProductManager.js"
import ProductManagerMongo from "../Managers/productmanagerMongo.js";
const productRouter=Router()

// const product = new ProductManager();
const productmanagerMongo= new ProductManagerMongo()



productRouter.get("/", async (req, res) => {
    const respuesta = await productmanagerMongo.getProducts();
    res.status(respuesta.code).send({
      status: respuesta.status,
      message: respuesta.message
  });
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
 
  const newProduct = req.body;

  const respuesta = await productmanagerMongo.addProduct(newProduct);

  res.status(respuesta.code).send({
      status: respuesta.status,
      message: respuesta.message
  });
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
