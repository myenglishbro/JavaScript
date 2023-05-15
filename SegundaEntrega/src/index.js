import express from "express";
import mongoose from 'mongoose';

import productRouter from "./router/product.routes.js"
import cartRouter from "./router/carts.routes.js"

import viewRouter from "./router/views.routes.js";


import handlebars from 'express-handlebars';

import { Server } from "socket.io";

import __dirname from './utils.js';
import ProductManager from "./Dao/Managers/ProductManager.js";


const app=express()
const PORT=8080
const MONGO = 'mongodb+srv://carlosapolayasanchez:sixx1am1@cluster0.cbayzpv.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO)


app.use(express.static(__dirname+'/public'));

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');


app.use(express.json())
app.use(express.urlencoded({extended:true}))


//Rutas
//Vistas
app.use('/', viewRouter);
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

const server = app.listen(PORT, () => {
    console.log("Servidor Express Funcionando");
  });
  
  const product = new ProductManager();
  const io = new Server(server);
  
  io.on('connection', async socket => {
    console.log("cliente conectado");
    const products = await product.getProducts();
    socket.emit('productos', products);
  
    socket.on('addProduct', async data => {
      console.log(data);
      await product.addProduct(data);
      const updatedProducts = await product.getProducts(); // Obtener la lista actualizada de productos
      io.emit('productos', updatedProducts);
    });
  
    socket.on('deleteProduct', async data => {
      console.log("ID del producto a eliminar: ", data);
      const deletedProduct = await product.deleteProduct(data);
      console.log("Producto eliminado: ", deletedProduct);
      const updatedProducts = await product.getProducts(); // Obtener la lista actualizada de productos
      io.emit('productos', updatedProducts);
    });
  });
  
  
// const server=app.listen(PORT,()=>{
//     console.log("Servidor Express Funcionando")
// })


// const product = new ProductManager();

// const io = new Server(server);


//     io.on('connection',async socket=>{
//         console.log("cliente conectado")
//         const products = await product.getProducts();

//         socket.emit('productos',products)

//         socket.on('addProduct',async data=>{
//             console.log(data)
//            await product.addProduct(data)
//            io.emit('productos', products);
//         })

//         socket.on('deleteProduct', async data => {
//             console.log("ID del producto a eliminar: ", data);
        
//             const deletedProduct = await product.deleteProduct(data);
//             console.log("Producto eliminado: ", deletedProduct);
//             io.emit('productos', products);
//           });
//     })