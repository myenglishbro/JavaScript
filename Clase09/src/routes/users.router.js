import {Router} from 'express'

const router=Router();
const users=[];

router.get('/',(req,res)=>{
res.send({users})
})

router.post('/',(req,res)=>{
    const user=req.body();
    users.push();
    res.send({
        status:"Success",
        users
    })
})

export default router;