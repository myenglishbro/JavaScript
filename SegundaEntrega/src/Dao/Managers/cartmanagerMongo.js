import cartModel from '../models/cartModel.js';
import ProductManager from './ProductManager.js';

const productAll = new ProductManager();

export default class CartManagerMongo {
  async createCart() {
    const cart = await cartModel.create({});
    
    return {
      code: 202,
      status: 'Success',
      message: cart
    };
  }

  async getCart(cid) {
    const cart = await cartModel.findOne({ _id: cid });
  
    if (!cart) {
      return {
        code: 400,
        status: 'Error',
        message: 'No se ha encontrado un carrito con ese ID'
      };
    }
  
    const populatedCart = await cartModel.findOne({ _id: cid }).populate('products._id');
  
    return {
      code: 202,
      status: 'Success',
      message: populatedCart.products.map(product => ({
        _id: product._id._id,
        quantity: product.quantity
      }))
    };
  }
  

  async updateCart(cid, pid) {
    try {
      const cart = await cartModel.findOne({ _id: cid });
  
      if (!cart) {
        return {
          code: 404,
          status: 'Error',
          message: 'No se ha encontrado un carrito con ese ID'
        };
      }
  
      const product = cart.products.find(p => p.product.toString() === pid);
  
      if (!product) {
        // Si el producto no existe en el carrito, lo agregamos con cantidad 1
        cart.products.push({
          product: pid,
          quantity: 1
        });
      } else {
        // Si el producto ya existe en el carrito, incrementamos la cantidad en 1
        product.quantity += 1;
      }
  
      await cart.save();
  
      return {
        code: 200,
        status: 'Success',
        message: cart
      };
    } catch (error) {
      return {
        code: 500,
        status: 'Error',
        message: 'Error al actualizar el carrito'
      };
    }
  }
  
  

  async deleteAllProducts(cid) {
    try {
      const cart = await cartModel.findOne({ _id: cid });
  
      if (!cart) {
        return {
          code: 404,
          status: 'Error',
          message: 'No se ha encontrado un carrito con ese ID'
        };
      }
  
      cart.products = [];
      await cart.save();
  
      return {
        code: 200,
        status: 'Success',
        message: cart
      };
    } catch (error) {
      return {
        code: 500,
        status: 'Error',
        message: 'Error al eliminar los productos del carrito'
      };
    }
  }
  

  async getCarts() {
    try {
      const carts = await cartModel.find();

      return {
        code: 200,
        status: 'Success',
        message: carts
      };
    } catch (error) {
      return {
        code: 500,
        status: 'Error',
        message: 'Error al obtener los carritos'
      };
    }
  }


 
}
