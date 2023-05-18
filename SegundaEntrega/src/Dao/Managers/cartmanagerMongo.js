import cartModel from '../models/cartModel.js';

import ProductManager from './ProductManager.js';

const productAll=new ProductManager()

export default class CartManagerMongo{



        exist= async(id)=>{
            const carts=await this.readCarts();
            return  carts.find(cart=>cart.id===id)
            }


 

         
  async createCart(){

    const cart = await cartModel.create({});
    
    return {
        code: 202,
        status: 'Success',
        message: cart
    };

};

         
      



async getCart(cid){
        
    const cart = await cartModel.findOne({_id:cid});

    if(!cart){
        return {
            code: 400,
            status: 'Error',
            message: 'No se ha encontrado un cart con ese ID'
        };
    };

    return {
        code: 202,
        status: 'Success',
        message: cart.products
    };
};
      

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

          async deleteProductCart(cid, pid){
 
            const cart = await cartModel.findOne({_id:cid})
    
            const prodIndex = cart.products.findIndex(u=>u._id === pid);
    
            
           // console.log(prodIndex);
            if (prodIndex === -1){
                //
            } 
            else {
                //let total = cart.products[prodIndex].quantity;
                cart.products.splice(prodIndex,1)
            }
    
            const result = await cartModel.updateOne({_id:cid},{$set:cart})
            
            return {
                code: 202,
                status: 'Success',
                message: cart.products
            };
    
        };
    

          async getCarts(){
        
            const carts = await cartModel.find();
      
            return {
                code: 202,
                status: 'Success',
                message: carts
            };
        };
      
        async updateProductQuantity(cartId, productId, quantity) {
            try {
              const cart = await Cart.findById(cartId);
              if (!cart) {
                return {
                  code: 404,
                  status: 'Error',
                  message: 'Carrito no encontrado'
                };
              }
        
              const product = cart.products.find(p => p._id.toString() === productId);
              if (!product) {
                return {
                  code: 404,
                  status: 'Error',
                  message: 'Producto no encontrado en el carrito'
                };
              }
        
              product.quantity = quantity;
              await cart.save();
        
              return {
                code: 200,
                status: 'Éxito',
                message: 'Cantidad de producto actualizada exitosamente'
              };
            } catch (error) {
              console.error(error);
              return {
                code: 500,
                status: 'Error',
                message: 'Error al actualizar la cantidad del producto en el carrito'
              };
            }
          }


}