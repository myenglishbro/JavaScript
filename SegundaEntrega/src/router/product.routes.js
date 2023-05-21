import { Router } from "express";
import ProductManagerMongo from "../Dao/Managers/productmanagerMongo.js";
const productRouter=Router()

const productmanagerMongo= new ProductManagerMongo()



productRouter.get("/", async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;

  const options = {
    limit: parseInt(limit),
    page: parseInt(page),
    sort: sort === "desc" ? { price: -1 } : sort === "asc" ? { price: 1 } : null
  };

  const filters = query ? { category: query } : {};

  try {
    const products = await productmanagerMongo.getProducts(options, filters);

    res.status(200).json({
      code: 200,
      status: "Success",
      message: products
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "Error",
      message: error.message
    });
  }
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

productRouter.delete('/:id', async (request, response) => {
  const productId = request.params.id;

  const respuesta = await productmanagerMongo.deleteProduct(productId);

  response.status(respuesta.code).send({
    status: respuesta.status,
    message: respuesta.message
  });
});


  

export default productRouter

