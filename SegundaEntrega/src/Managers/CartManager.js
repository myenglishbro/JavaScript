import { promises as fs } from 'fs';
import {nanoid} from 'nanoid';
import ProductManager from './ProductManager.js';

const productAll=new ProductManager()

export default class CartManager{

    constructor(){
        this.path = './src/files/carts.json';    }

        exist= async(id)=>{
            const carts=await this.readCarts();
            return  carts.find(cart=>cart.id===id)
            }
        readCarts=async()=>{
            const carts = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(carts);
          }
          writeCart=async(carts)=>{
            await fs.writeFile(this.path,JSON.stringify(carts))
        
          }

         
        addCart = async () => {
            const cartsOld = await this.readCarts();
            let id=nanoid()
            const newCart = { id: id, products: [] };
            const cartsConcat = [newCart, ...cartsOld];
            await this.writeCart(cartsConcat);
            return "Carrito Agregado";
          }


        getCartById=async(id)=> {

            const cartByiD=await this.exist(id)
            if(!cartByiD) return "Carrito No eNCONTRADO"
            return cartByiD;
          }

          addProductInCart=async(cartId,productId)=>{
           const cartByiD=await this.exist(cartId)
           if(!cartByiD) return "Carrito no encontrado"

           let productByiD=await productAll.exist(productId)

           if(!cartByiD) return "Producto  no encontrado"
           let  cartsAll=await this.readCarts()
           let cartFilter= cartsAll.filter(cart=>cart.id !=cartId)

           if(cartByiD.products.some(prod=>prod.id===productId)){
            let moreproductInCart=cartByiD.products.find(prod=>prod.id===productId)
            moreproductInCart.cantidad ++

            let cartsConcat=[cartByiD,...cartFilter]
            await this.writeCart(cartsConcat)
            return  "Productos Sumado al carrito"
           }

          cartByiD.products.push({id:productByiD.id,cantidad:1})

           let cartsConcat=[cartByiD,...cartFilter]
           await this.writeCart(cartsConcat)
           return  "Productos agregados al carrito"

          }
}