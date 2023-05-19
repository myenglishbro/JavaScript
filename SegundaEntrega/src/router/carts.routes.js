import { Router } from "express";
import CartManager from "../Dao/Managers/CartManager.js"
import CartManagerMongo from "../Dao/Managers/cartmanagerMongo.js";
const cartRouter=Router()
const cart=new CartManager
const cartmanagermongo= new CartManagerMongo();
cartRouter.post("/",async(req,res)=>{
  // const respuesta=await CartManager.addCart();
  const respuesta=await cartmanagermongo.createCart()
  res.status(respuesta.code).send({
    status: respuesta.status,
    message: respuesta.message
});
 

})

// cartRouter.get('/',async(req,res)=>{
//   res.send(await cart.getCart())
// })
cartRouter.get('/', async(req, res) => {

    const respuesta = await cartmanagermongo.getCarts();

    res.status(respuesta.code).send({
        status: respuesta.status,
        message: respuesta.message
    });
})




  cartRouter.get('/:cid', async(req, res) => {
    const cid = (req.params.cid);

    const respuesta = await cartmanagermongo.getCart(cid);

    res.status(respuesta.code).send({
        status: respuesta.status,
        message: respuesta.message
    });
});

  cartRouter.put("/:cid/products/:pid",async(req,res)=>{

    const cid = req.params.cid;
    const pid = req.params.pid;

    const respuesta = await cartmanagermongo.updateCart(cid, pid);

    res.status(respuesta.code).send({
        status: respuesta.status,
        message: respuesta.message
    });
    //  const cartId=parseInt(req.params.cid)
    //  const productId=parseInt(req.params.pid)

    //  res.send(await cart.addProductInCart(cartId,productId))
  })

  cartRouter.delete('/:cid/products/:pid', async (req, res) => {
  
    const cid = req.params.cid;
    const pid = req.params.pid;
    
    const result = await cartmanagermongo.deleteProductCart(cid, pid);
    
    res.status(result.code).send({
        status: result.status,
        message: result.message
    });
});
//eliminar todos los productos del carrito

cartRouter.delete('/:cid', async (req, res) => {
  const cid = req.params.cid;

  const cart = await cartmanagermongo.getCart(cid);
  if (!cart) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }

  cart.products = [];
  await cartmanagermongo.updateCart(cid, cart.products);

  res.status(200).json({ message: 'Productos eliminados exitosamente del carrito' });
});


// cartRouter.put("/:cid/products/:pid", async (req, res) => {
//   const cid = req.params.cid;
//   const pid = req.params.pid;
//   const quantity = req.body.quantity;

//   try {
//     const respuesta = await cartmanagermongo.updateProductQuantity(cid, pid, quantity);

//     res.status(respuesta.code).send({
//       status: respuesta.status,
//       message: respuesta.message
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error al actualizar la cantidad del producto' });
//   }
// });

export default cartRouter