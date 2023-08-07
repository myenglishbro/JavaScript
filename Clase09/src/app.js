import  express  from "express";
import userRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
const PORT=8080;

const app=express();
app.use(express.json)
app.use(express.urlencoded({extended:true}))

app.listen(PORT,()=>{
    console.log('Puerto funcionando en '+ PORT)
})

app.use('/api/users',userRouter);
app.use('/api/pets',petsRouter);