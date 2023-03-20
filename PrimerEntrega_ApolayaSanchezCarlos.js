
class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts(){
   return  this.products;
  }

  

  addProducto(title,description,price,thumbnail,code,stock){
    //adding id to my productos
    let id_producto=(this.getProducts()).length;
    let product =
    {
      id:++id_producto,
      title:title,
      description:description,
      price:price,
      thumbnail:thumbnail,
      code:code,
      stock:stock
    }

    if (
        !product.title ||
        !product.description ||
        !product.price ||
        !product.thumbnail ||
        !product.code ||
        !product.stock
      ) {
        return console.log("Todos los campos son obligatorios");
      } else if (isNaN(price)) {
        return console.log("El precio ingresado debe ser un numero");
      } else if (isNaN(stock)) {
        return console.log("El Stock  ingresado debe ser un numero");
      }
  
      let codigo = this.products.find((prod) => prod.code == product.code);
      if (codigo) {
        return console.log("El code que ingreso ya existe, ingrese otro code");
      } else {
        this.products.push(product);
        return this.products;
      }











    // this.products.push(product);
    // return this.products
  }


  getProductById(id_producto){
    let buscado = this.products.find(elemento=>elemento.id===id_producto)
    if (buscado){
     return buscado;
    }
    else{
     return "Not Found";
    }
   }
}
  const Productazo=new ProductManager();
let productos=Productazo.addProducto("prodcuto1","descripto1",15,"url1","213",80)
 let producto2=Productazo.addProducto("prodcuto2","descripto2",18,"url2","213",70)
// console.log(  Productazo.getProductById(1))
console.log(  Productazo.getProducts())



