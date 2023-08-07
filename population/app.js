import mongoose from "mongoose";
import studenModel from "./models/student.js";
import courseModel from "./models/courses.js";

const MONGO = 'mongodb+srv://carlosapolayasanchez:sixx1am1@cluster0.cbayzpv.mongodb.net/?retryWrites=true&w=majority';


const environment=async()=>{
 await mongoose.connect(MONGO)
//  const result=await studenModel.create({
//     first_name: "Hilda",
//     last_name:"Apolayas",
//     email:"temis_it@hotmail.com",
//     gender:"female"
//  })

// {
//     first_name: 'Hilda',
//     last_name: 'Apolayas',
//     email: 'temis_it@hotmail.com',
//     gender: 'female',
//     _id: new ObjectId("646520a9bb2dce0fd8b3d517"),
//     courses: [],
//     __v: 0
//   }


// const result=await courseModel.create({
//     title: "book1",
//     description:"descrioto book 1",
//     difficulty:5,
//     topics:["sex","drug"],
//     professor:"carlos"
    
//      })
//   console.log(result)
// {
//     title: 'book1',
//     description: 'descrioto book 1',
//     difficulty: 5,
//     topics: [ 'sex', 'drug' ],
//     professor: 'carlos',
//     students: [],
//     _id: new ObjectId("64652259c098873c9970670e"),
//     __v: 0
//   }

// const student=await studenModel.find({_id:"646520a9bb2dce0fd8b3d517"});
// student[0].courses.push({course:"64652259c098873c9970670e"})
// const result=await studenModel.updateOne({_id:"646520a9bb2dce0fd8b3d517"},{$set:student[0]})
// console.log(result)

// const student=await studenModel.find({_id:"646520a9bb2dce0fd8b3d517"}).populate("courses.course");
const student=await studenModel.find({_id:"646520a9bb2dce0fd8b3d517"});

console.log(JSON.stringify(student,null,"\t"));
};

environment()