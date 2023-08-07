import { Router } from "express";
import ManagerAccess from "../Dao/managers/managerAccess.js";

const managerAccess= new ManagerAccess();
const router=Router();

router.get('/',async(req,res)=>{
  await managerAccess.crearRegistro('GET')

res.send({msg:"get"})
})

router.post('/',async(req,res)=>{
await managerAccess.crearRegistro('POST')

  res.send({msg:"post"})

})

export default router