const express = require('express')
const Users = require('../models/users.models')
const jwt = require('jsonwebtoken')
const router = express.Router()
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
dotenv.config()

//render register page
router.get('/register',(req,res)=>{
    res.render('register')
})
//render login page
router.get('/login',(req,res)=>{
    res.render('login')
})

//register
router.post('/register',async(req,res)=>{
    try {
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const regexPass = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,}$/
        const {name,email,password} = req.body
        if((name=='')||(email=='')||(password=='')) return res.status(400).json({message:'Empty field!!'}) 
        if(!regexEmail.test(email)) return res.status(400).json({message:'Invalid email address!!'})
        if(!regexPass.test(password)) return res.status(400).json({message:'Password must be at least one digit(0-9), one lowercase letter (a-z), one uppercase letter (A-Z) and minimum (6-8) character long.'})
        const existingUser = await Users.find({email:req.body.email})
        const hashPassword = await bcrypt.hash(password,10)
        if(existingUser !='') return res.status(400).json({message:'Email already exist.'})
        const user = await Users.insertOne({
            name:name,
            email:email,
            password:hashPassword
        })
        res.status(200).json({message:'Register successfully.'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

//login
router.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body
        if((email=='')||(password=='')) return res.status(400).json({message:'Empty field!!'})
        const user = await Users.findOne({email})
        if(!user) return res.status(404).json({message:'User not found!'})
        const isMatch = bcrypt.compare(password,user.password) // compare password
        if(!isMatch) return res.status(401).json({message:'Invalid Credentials!'})
        const token = jwt.sign({userId:user._id,username:user.name},process.env.JWT_SECRET)
        res.cookie('token',token,{
            httpOnly:true,
            secure:true
        })
        res.json({token})
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

//logout
router.get('/logout',(req,res)=>{
    res.clearCookie('token',{

    })
    res.redirect('/login')
})
module.exports = router