import fs from 'fs';
// import {nanoid} from 'nanoid';
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
            const data = await fs.promises.readFile(this.path, 'utf-8');
            const carts=JSON.parse(data);
            return  carts;
          }
          

          
          writeCart=async(carts)=>{
            await fs.promises.writeFile(this.path,JSON.stringify(carts))
        
          }

        getCart=async()=>{
         if(fs.existsSync(this.path)){
          return await this.readCarts()
          
         }
         else{
          return []
         }
        }


         
        addCart = async () => {
            const carts = await this.readCarts();
            let cartNew={
              products:[]
            }
            if(carts.length===0){
              cartNew.id=1;
            }
            else{
              cartNew.id=carts[carts.length-1].id+1
            }

            carts.push(cartNew);
            
            await this.writeCart(carts);
            return "Carrito Agregado";
          }


        getCartById=async(id)=> {

            const cartByiD=await this.exist(id)
            if(!cartByiD) return "Carrito No eNCONTRADO"
            return cartByiD;
          }

          addProductInCart=async(cartId,productId)=>{
              const carts=await this.getCart()
              let cartFilter= carts.find(cart=>cart.id ===cartId)
              const productsInCart= cartFilter.products
              const producIndex= productsInCart.findIndex(p=>p.id==productId)
             if (producIndex!==-1)
             {
              productsInCart[producIndex].quantity=productsInCart[producIndex].quantity+1;
             }

             else{
              let producto={
                id: productId,
                 quantity:1
              };

             productsInCart.push(producto)
             }
              
             await this.writeCart(carts)
             
          return  cartFilter;
              }




}