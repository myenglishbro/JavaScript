import { Router } from "express";
import CartManager from "../Managers/CartManager.js"
import CartManagerMongo from "../Managers/CartManagerMongo.js";
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

  cartRouter.post("/:cid/products/:pid",async(req,res)=>{

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

  cartRouter.delete('/:cid/product/:pid', async (req, res) => {
  
    const cid = req.params.cid;
    const pid = req.params.pid;
    
    const result = await cartmanagermongo.deleteProductCart(cid, pid);
    
    res.status(result.code).send({
        status: result.status,
        message: result.message
    });
});

export default cartRouter