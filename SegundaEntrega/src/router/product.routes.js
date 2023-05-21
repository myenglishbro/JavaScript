import { Router } from "express";
import ProductManagerMongo from "../Dao/Managers/productmanagerMongo.js";
const productRouter=Router()

const productmanagerMongo= new ProductManagerMongo()



productRouter.get("/", async (req, res) => {
    const respuesta = await productmanagerMongo.getProducts();
    res.status(respuesta.code).send({
      status: respuesta.status,
      message: respuesta.message
  });
  });


  productRouter.post('/', async (request, response)=>{
    const product = request.body;

    const respuesta = await productmanagerMongo.addProduct(product);

    response.status(respuesta.code).send({
        status: respuesta.status,
        message: respuesta.message
    });
});

productRouter.put('/:id', async (request, response) => {
  const productId = request.params.id;
  const productData = request.body;

  const respuesta = await productmanagerMongo.updateProduct(productId, productData);

  response.status(respuesta.code).send({
    status: respuesta.status,
    message: respuesta.message
  });
});



  

export default productRouter

