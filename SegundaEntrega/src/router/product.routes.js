import { Router } from "express";
import ProductManager from "../Dao/Managers/ProductManager.js"
import ProductManagerMongo from "../Dao/Managers/productmanagerMongo.js";
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
    const products = await productmanagerMongo.getProductsLimit(limit);
    res.json(products);
  });
  
  
  productRouter.get("/:id",async(req,res)=>{
    const id= parseInt(req.params.id)
    res.send(await productmanagerMongo.getProductsById(id))
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
    res.send(await productmanagerMongo.deleteProduct(id))
  })

  // productRouter.put("/:id",async(req,res)=>{
  //   const id= parseInt(req.params.id)
  //   const updateProduct=req.body;

  //   res.send(await productmanagerMongo.updateProduct(id,updateProduct))
  // })
  productRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const updatedProduct = req.body;
  
    const respuesta = await productmanagerMongo.updateProduct(id, updatedProduct);
  
    res.status(200).send({
      status: "Success",
      message: "Producto actualizado correctamente",
      updatedProduct
    });
  });
  
  

export default productRouter


// productRouter.get("/",async(req,res)=>{
    
//     res.send(await product.getProducts())
//   })
