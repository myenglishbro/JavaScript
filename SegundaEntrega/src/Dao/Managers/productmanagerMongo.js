
import productModel from "../models/productModel.js";

export default class ProductManagerMongo {




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

  addProduct = async (_product) => {
    
    const product = {
            title: _product.title,
            description: _product.description,
             code: _product.code,
            price: _product.price,
            stock: _product.stock,
            thumbnail: _product.thumbnail
        };


        try {

          const result = await productModel.create(product)
              return {
                  code: 202,
                  status: 'Success',
                  message: `El producto ${product.title} ha sido agregado con éxito. Su ID interno es ${product.id}`
              };
      } catch (error) {
          return {
              code: 400,
              status: 'Error',
              message: `${error}`
          };
      };
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
    const products = await productModel.find();
            
       
        return {
            code: 202,
            status: 'Success',
            message: products
        };
    
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

