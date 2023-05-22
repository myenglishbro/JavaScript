import { Router } from "express";
import CartManager from "../Dao/Managers/CartManager.js";
import CartManagerMongo from "../Dao/Managers/cartmanagerMongo.js";

const cartRouter = Router();
const cart = new CartManager();
const cartmanagermongo = new CartManagerMongo();

cartRouter.post("/", async (req, res) => {
  const respuesta = await cartmanagermongo.createCart();
  res.status(respuesta.code).send({
    status: respuesta.status,
    message: respuesta.message
  });
});

cartRouter.get('/', async (req, res) => {
  const respuesta = await cartmanagermongo.getCarts();
  res.status(respuesta.code).send({
    status: respuesta.status,
    message: respuesta.message
  });
});

cartRouter.get('/:cid', async (req, res) => {
  const cid = req.params.cid;
  const respuesta = await cartmanagermongo.getCart(cid);
  res.status(respuesta.code).send({
    status: respuesta.status,
    message: respuesta.message
  });
});

cartRouter.put("/:cid/products/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const respuesta = await cartmanagermongo.updateCart(cid, pid);
  res.status(respuesta.code).send({
    status: respuesta.status,
    message: respuesta.message
  });
});



cartRouter.delete('/:cid', async (req, res) => {
  const cid = req.params.cid;
  const cart = await cartmanagermongo.getCart(cid);
  if (!cart) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }
  const respuesta = await cartmanagermongo.deleteAllProducts(cid);
  res.status(respuesta.code).json({ message: 'Productos eliminados exitosamente del carrito' });
});

export default cartRouter;
