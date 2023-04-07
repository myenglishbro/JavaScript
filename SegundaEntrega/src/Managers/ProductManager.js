import fs from 'fs';
const path ='./src/files/DB.json';

export default class  ProductManager
 {
    getProducts=async()=>{
        if(fs.existsSync(path)){
            const data= await fs.promises.readFile(path,'utf-8')
            const products=JSON.parse(data);
            return products
         }
         else{
            return []
         }
    }
    getProductLimit = async (limit) => {
        const products = await this.getProducts();
        const limitedProducts = products.slice(0, limit);
        return limitedProducts;
      };
      

      getProduct = async (idproduct) => {
        const products = await this.getProducts();
        const product = products.find(pro => pro.id == idproduct);
      
        if (!product) {
          return 'El Producto no encontrado';
        }
      
        return product;
      }
      

    // AddProduct=async(product)=>{
    //      const products= await this.getProducts();
    //       let id=products[products.length-1].id;
    //       product.id=++id;
    //      products.push(product)
    //      try {
    //         await fs.promises.writeFile(path, JSON.stringify(products,null,'\t'));
    //         return 'Producto se ha Agregado'
    //     } catch (error) {
    //          return error
    //     }
    // }

    // DeleteProduct=async(idproduct)=>{
    //     const products = await this.getProducts();
    //     const productIndex = products.findIndex(product =>{return product.id !== idproduct});
    //     products.splice(productIndex,1)
    //     try {
    //         await fs.promises.writeFile(path, JSON.stringify(products,null,'\t'));
    //         return 'Producto Eliminado'
    //     } catch (error) {
    //          return error
    //     }
    // }

    // UpdateProduct=async(idproduct,title,description,price,thumbnail,code,stock)=>{
    //     const products= await this.getProducts();
    //     const productIndex = products.findIndex(product =>{
    //         return product.id !== idproduct
    //     });
    //     products[productIndex].title=title;
    //     products[productIndex].title=description;
    //     products[productIndex].title=price;
    //     products[productIndex].title=thumbnail;
    //     products[productIndex].title=code;
    //     products[productIndex].title=stock;
    //     try {
    //         await fs.promises.writeFile(path, JSON.stringify(products,null,'\t'));
    //         return 'Producto Eliminado'
    //     } catch (error) {
    //          return error
    //     }
    // }
}