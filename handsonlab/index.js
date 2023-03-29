const ProductManager = require('./manager/ProductManager');

const productManager = new ProductManager('./files/products.json');
// Agregar un producto
// productManager.addProduct({
//    title: 'Producto 3',
//    description: 'Descripción del producto 1',
//    price: 10,
//    thumbnail: 'ruta/imagen1.jpg',
//    code: 'COD1',
//    stock: 5
//  });
 
 // Obtener todos los productos
//  const products = productManager.getProducts();
//  console.log(products)
 // Obtener un producto por su id
//  const productById = productManager.getProductById(1);
 
 // Actualizar un producto
//  productManager.updateProduct(1, {
//    title: 'Producto actualizado',
//    description: 'Nueva descripción del producto',
//    price: 15,
//    thumbnail: 'ruta/imagen1.jpg',
//    code: 'COD1',
//    stock: 3
//  });
 
//  // Eliminar un producto
//  productManager.deleteProduct(1);