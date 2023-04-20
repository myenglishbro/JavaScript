import express from "express"
import productRouter from "./router/product.routes.js"
import cartRouter from "./router/carts.routes.js"
import handlebars from 'express-handlebars';
import __dirname from './utils.js';



const app=express()
const PORT=8080
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use("/",express.static(__dirname+"/public"))






app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use(express.static(__dirname + '/public'))

app.use("/api/products",productRouter)
app.use("/api/carts",cartRouter)


app.listen(PORT,()=>{
    console.log("Servidor Express Funcionando")
})