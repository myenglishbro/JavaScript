import { Router } from "express";
import CartManager from "../Managers/CartManager.js"
import CartManagerMongo from "../Managers/CartManagerMongo.js";
const cartRouter=Router()
const cart=new CartManager
const cartmanagermongo= new CartManagerMongo();
cartRouter.post("/",async(req,res)=>{
  // const respuesta=await CartManager.addCart();
  const respuestaMongo=await cartmanagermongo.createCart()
  response.status(respuesta.code).send({
    status: respuesta.status,
    message: respuesta.message
});
 

})

cartRouter.get('/',async(req,res)=>{
  res.send(await cart.getCart())
})



cartRouter.get("/:cid",async(req,res)=>{
    const cid=parseInt( req.params.cid)
    res.send(await cart.getCartById(cid))
  })

  cartRouter.post("/:cid/products/:pid",async(req,res)=>{
     const cartId=parseInt(req.params.cid)
     const productId=parseInt(req.params.pid)
     res.send(await cart.addProductInCart(cartId,productId))
  })

export default cartRouter