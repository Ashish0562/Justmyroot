const express=require('express');
const router=express.Router();
var jwt = require('jsonwebtoken');
const userModel=require('../schema/user')

const secretKey = 'this-is-a-key'

router.post("/signup",async (req,res)=>{

   
        try{
            const {username,email,password} =req.body;
            const user = await userModel.findOne({ email: email } )
            if (user) {
                res.status(400).json({
                    message: 'user already exists'
                })
            }else{
                const newUser = await userModel.create({
                    username, email, password
                })
    
                res.status(201).json({
                    status: "Success",
                    newUser
            
                })
            }
           
    
        }catch(e){
            res.status(500).json({
                status: "Failed",
                message : e.message
        
            })
        }
    })

router.post("/signin",async(req,res)=>{
    try{
        console.log(req);
        const { email, password } = req.body;

        const user = await userModel.findOne({ $and: [ {email} , {password}] });
        console.log(user);

        if (user) {
            const token = jwt.sign(
                { data: user._id },
                secretKey,
                { expiresIn: '1h' }
            )
            res.status(200).json({
                token
            })
        }else{
            res.status(404).json({
                message:"user is not found"
            })
        }
    }catch(e){
        res.status(501).json({
            status: "Failed",
            message : e.message
    
        })
    }
})




module.exports = router;