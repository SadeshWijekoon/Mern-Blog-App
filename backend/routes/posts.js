const express=require("express")
const router=express.Router()
const User=require("../models/User")
const bcrypt = require("bcrypt")
const Posts = require("../models/Posts")
const Comment = require("../models/Comment")
const verifyToken = require("../verifyToken")


//create
router.post("/create",verifyToken ,async(req,res)=>{
    try{
        const newPost = new Posts(req.body)
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    }
    catch(err){
        res.status(200).json(err)
    }
})

//UPDATE
router.put("/:id",verifyToken,async(req,res)=>{
    try{
        const updatedUser = await Posts.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedUser)
    }
catch(err){
    console.log(err)
    res.status(500).json(err)
}
})

//DELETE
router.delete("/:id",async(req,res)=>{
    try{
         await Posts.findByIdAndDelete(req.params.id)
         res.status(200).json("Post has been deleted")
    }
catch(err){
    console.log(err)
    res.status(500).json(err)
}
})


//GET POST DETAILS
router.get("/:id",async (req,res)=>{
    try{
        const post=await Posts.findById(req.params.id)
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
})


//GET POSTS
router.get("/",async (req,res)=>{
    const query=req.query
    
    try{
        const searchFilter={
            title:{$regex:query.search, $options:"i"}
        }
        const posts=await Posts.find(query.search?searchFilter:null)
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})


//GET POST DETAILS
router.get("/user/:userId",async(req,res)=>{
    try{
        const post = await Posts.find({userId:req.params.userId})
        res.status(200).json(post)

    }
catch(err){
    console.log(err)
    res.status(500).json(err)
}
})




module.exports=router