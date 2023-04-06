import express from 'express'
import ProductManager from './Managers/ProductManager.js';

const productManager=new ProductManager();

const PORT= 8080;

const app=express();
app.use(express.urlencoded({extended:true}))
app.listen(PORT,()=>{
    console.log("Se esta ejecutando el servidor")
})


app.get('/',async(req,res)=>{
   const products= await productManager.getProducts();

   res.send(products)
})

app.get('/products/:pid',async(req,res)=>{

    let pid = req.params.pid;
    let product=await productManager.getProduct(pid);
    res.send(product)
 })

 app.get('/delete/:pid',async(req,res)=>{

    let pid = req.params.pid;
    let msg=await productManager.DeleteProduct(pid);
    res.send(msg)
 })

 
 app.get('/newquery',async(req,res)=>{

    const {title,description,price,thumbnail,code,stock}=req.query;
    if(!title||!description||!price||!thumbnail||!code||!stock){
         res.send('Falta datos del Producto')
         return
    }

     const product={
        title,description,price,thumbnail,code,stock
     }
     const msg=await productManager.AddProduct(product)
     res.send(msg)
 })


 
  app.get('/products', async (req, res) => {
    const limit = req.query.limit;
    if (isNaN(parseInt(limit))) {
      res.send('Limit debe ser un numero');
      return;
    }
    const msg = await productManager.getProductLimit(parseInt(limit));
 
    res.send(msg);
  });

app.get('/products',async(req,res)=>{

    const products= await productManager.getProducts();

    res.send(products)
   
})

