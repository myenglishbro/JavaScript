import { Router } from "express";
import ManagerAccess from "../Dao/managers/managerAccess.js";
import userModel from "../Dao/models/users.js";

const managerAccess= new ManagerAccess();
const router=Router();

router.get('/', async (req,res)=>{
  await managerAccess.crearRegistro('Consulta todos los usuarios');
  const result = await userModel.find();
  res.send({result})
})
router.post('/', async (req,res)=>{
  await managerAccess.crearRegistro('Alta usuario');

  const {nombre, apellido, edad } = req.body;

  if(!nombre || !apellido || !edad){
      return  res.status(400).send({
          error : 'Datos incompletos'
      })
  }
  const user = {
      nombre, apellido, edad
  }
  const result = await userModel.create(user)
   res.send({result})

})
router.get('/:uid' , async (req,res)=>{
  await managerAccess.crearRegistro('Consulta un solo usuario');

  const id = req.params.uid;
  const result = await userModel.find({_id:id})
  res.send({result})
})
router.delete('/:uid', async (req,res)=>{
  await managerAccess.crearRegistro('Elimina un usuario');

  const id = req.params.uid;
  const result = await userModel.deleteOne({_id:id})
  res.send({result})
})

router.put('/:uid', async (req,res)=>{
  await managerAccess.crearRegistro('Actualiza un usuario');

  const id = req.params.uid;
  const newUser = req.body;

  const result = await userModel.updateOne({_id:id},{$set:newUser})

  res.send({result});

})


export default router