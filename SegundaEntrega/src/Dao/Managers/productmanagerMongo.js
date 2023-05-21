
import productModel from "../models/productModel.js";

export default class ProductManagerMongo {



  getProducts=async()=> {
    const products = await productModel.find();
            
       
        return {
            code: 202,
            status: 'Success',
            message: products
        };
    
  }

  
  async addProduct(_product) {
    const product = {
      title: _product.title,
      description: _product.description,
      price: _product.price,
      stock: _product.stock,
      thumbnail: _product.thumbnail,
      code: _product.code
    };
  
    try {
      const createdProduct = await productModel.create(product);
      return {
        code: 202,
        status: 'Success',
        message: `El producto ${createdProduct.title} ha sido agregado con éxito. Su ID interno es ${createdProduct._id}`
      };
    } catch (error) {
      return {
        code: 400,
        status: 'Error',
        message: `${error}`
      };
    }
  };
  
  async updateProduct(productId, updatedData) {
    try {
      const updatedProduct = await productModel.findByIdAndUpdate(productId, updatedData, { new: true });
  
      if (updatedProduct) {
        return {
          code: 202,
          status: 'Success',
          message: `El producto con ID ${productId} ha sido actualizado exitosamente.`
        };
      } else {
        return {
          code: 404,
          status: 'Error',
          message: `No se encontró un producto con ID ${productId}.`
        };
      }
    } catch (error) {
      return {
        code: 400,
        status: 'Error',
        message: `${error}`
      };
    }
  }
  
}

