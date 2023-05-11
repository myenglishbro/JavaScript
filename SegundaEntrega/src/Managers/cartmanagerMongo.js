import cartModel from '../files/models/cartModel.js';

import ProductManager from './ProductManager.js';

const productAll=new ProductManager()

export default class CartManagerMongo{

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

 

    async getCarts(){
        
      const carts = await cartModel.find();

      return {
          code: 202,
          status: 'Success',
          message: carts
      };
  };

     
         
  async createCart(){

    const cart = await cartModel.create({});
    
    return {
        code: 202,
        status: 'Success',
        message: cart
    };

};

         
      



        getCartById=async(cid)=> {
         const cart=await cartModel.findOne({_id:cid})
         if(!cart){
          return {
            code:400,
            status:'Error',
            message:'No se ha encontrado un Cart con ese ID'
          };
         };
         return {
          code:202,
          status:'Success',
          message:cart.products
         }
        }
      

        updateCart=async(cid,pid)=>{
          const cart = await cartModel.findOne({_id:cid})

          const prodIndex = cart.products.findIndex(u=>u._id === pid);
  
          
         // console.log(prodIndex);
          if (prodIndex === -1){
              const product = {
                  _id: pid,
                  quantity: 1
              }
              cart.products.push(product);
          } 
          else {
              let total = cart.products[prodIndex].quantity;
              cart.products[prodIndex].quantity = total + 1;
          }
  
          const result = await cartModel.updateOne({_id:cid},{$set:cart})
          
          return {
              code: 202,
              status: 'Success',
              message: cart.products
          };
          }

        



}