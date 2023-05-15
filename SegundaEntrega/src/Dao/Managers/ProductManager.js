import { promises as fs } from 'fs';
export default class ProductManager {
  constructor() {
    this.path = './src/files/products.json';
  }


  exist= async(id)=>{
  const products=await this.readProducts();
  return  products.find(prod=>prod.id===id)
  }
  readProducts=async()=>{
    const products = await fs.readFile(this.path, 'utf-8');
    return JSON.parse(products);
  }
  writeProduct=async(product)=>{
    await fs.writeFile(this.path,JSON.stringify(product))

  }

  addProduct = async (product) => {
    let productsOld = await this.readProducts();
    if (productsOld.length === 0) {
      product.id = 1;
    } else {
      product.id = productsOld[productsOld.length - 1].id + 1;
    }
    // Validar campos obligatorios
    if (!product.title || !product.description || !product.price  || !product.code || !product.stock) {
      return "Faltan campos obligatorios";
    }
    const productAll = [...productsOld, product];
    await this.writeProduct(productAll);
    return "Producto Agregado";
  };

  updateProduct=async(id,product)=> {
    const productByiD=await this.exist(id)
    if(!productByiD) return "Producto No Encontrado"
    await this.deleteProduct(id)
    const productOld=await this.readProducts();
    const products=[{...product,id:id},...productOld]
    await this.writeProduct(products)
    return "Producto Actualizado"

  }


  

  getProducts=async()=> {
    return await this.readProducts()
    
  }

  getProductsById=async(id)=> {

    const productByiD=await this.exist(id)
    if(!productByiD) return "Producto No eNCONTRADO"
    return productByiD;
  }

  getProductsLimit=async(limit) =>{
    const products = await this.readProducts();
  
    if (limit) {
      return products.slice(0, limit);
    } else {
      return products;
    }
  }
  



  deleteProduct=async(id)=> {
    const products=await this.readProducts();
    let existProduct=products.some(prod=>prod.id==id)

    if(existProduct) 
   {
    let filterProduct=products.filter(prod=>prod.id!=id)
    await this.writeProduct(filterProduct)
    return "Producto Eliminado"
   }
   return "Producto a Eliminar Inexistente"
  }
}

