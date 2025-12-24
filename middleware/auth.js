const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const auth = (req, res, next) => {
    const token = req.cookies.token
    if(!token){
       return res.redirect('/login');    
    } 
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    }catch(err){
        res.status(403).json({message:'invalid or expired token'})
    }
}

module.exports = auth