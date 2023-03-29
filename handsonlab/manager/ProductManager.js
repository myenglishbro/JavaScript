const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }
  getProducts() {
    try {
      const products = fs.readFileSync(this.path);
      return JSON.parse(products);
    } catch (error) {
      return [];
    }
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find(product => product.id === id);
  }
  addProduct(product) {
    const products = this.getProducts();
    product.id = products.length + 1;
    products.push(product);
    fs.writeFileSync(this.path, JSON.stringify(products));
  }

  

  updateProduct(id, updatedProduct) {
    const products = this.getProducts();
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      updatedProduct.id = id;
      products[productIndex] = updatedProduct;
      fs.writeFileSync(this.path, JSON.stringify(products));
    }
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const updatedProducts = products.filter(product => product.id !== id);
    fs.writeFileSync(this.path, JSON.stringify(updatedProducts));
  }
}

module.exports = ProductManager;
