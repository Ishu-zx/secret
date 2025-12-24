const mongoose = require('mongoose')

const connectDB = ()=>{
    mongoose.connect('mongodb+srv://ishu_zx:chucha46024@student-data.e2zevb8.mongodb.net/?appName=Student-data')
    .then(()=>{
        console.log('MongoDb connected!!')
    })
}

module.exports = connectDB