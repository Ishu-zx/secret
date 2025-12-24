const express = require('express')
const cors = require('cors')
const connectDB = require('./config/database')
const secretsRouter = require('./routes/secrets.routes')
const usersRouter = require('./routes/users.routes')
const auth = require('./middleware/auth')
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express()
app.use(cors())

//database connection
connectDB()

//middleware
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))
app.use(cookieParser())

app.use('/',usersRouter)

// secret page
app.get('/',auth,(req,res)=>{
    res.render('secrets')
})
app.use('/secrets',auth,secretsRouter)

app.listen(3000,()=>{
    console.log('Server Started!!')
})