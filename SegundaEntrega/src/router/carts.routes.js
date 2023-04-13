import { Router } from "express";
import CartManager from "../Managers/CartManager.js"

const cartRouter=Router()
const cart=new CartManager

cartRouter.post("/",async(req,res)=>{
  res.send(await  cart.addCart())
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