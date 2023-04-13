import { Router } from "express";
import CartManager from "../Managers/CartManager.js"

const CartRouter=Router()
const cart=new CartManager

CartRouter.post("/",async(req,res)=>{
  res.send(await  cart.addCart())
})

CartRouter.get('/',async(req,res)=>{
  res.send(await cart.getCart())
})



CartRouter.get("/:cid",async(req,res)=>{
    const cid=parseInt( req.params.cid)
    res.send(await cart.getCartById(cid))
  })

  CartRouter.post("/:cid/products/:pid",async(req,res)=>{
     const cartId=parseInt(req.params.cid)
     const productId=parseInt(req.params.pid)
     res.send(await cart.addProductInCart(cartId,productId))
  })

export default CartRouter