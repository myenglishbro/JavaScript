import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

const PORT = 8080;

const app = express();

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use("/",express.static(__dirname+"/public"))

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get ('/',(req,res)=>{
    res.render("home",{title:"Hnadel"})
})

app.listen(PORT,()=>{
    console.log(`Ejecutando Servidor en ${PORT}`)
})