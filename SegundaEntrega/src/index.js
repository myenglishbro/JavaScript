import express from "express"
import productRouter from "./router/product.routes.js"
import cartRouter from "./router/carts.routes.js"

import viewRouter from "./router/views.routes.js";


import handlebars from 'express-handlebars';

import { Server } from "socket.io";

import __dirname from './utils.js';
import ProductManager from "./Managers/ProductManager.js";


const app=express()
const PORT=8080

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

const server=app.listen(PORT,()=>{
    console.log("Servidor Express Funcionando")
})


const product = new ProductManager();

const io = new Server(server);


    io.on('connection',async socket=>{
        console.log("cliente conectado")
        const products = await product.getProducts();

        socket.emit('productos',products)

        socket.on('addProduct',async data=>{
            console.log(data)
           await product.addProduct(data)
        })
    })
