const mongoose = require('mongoose')

const secretSchema = mongoose.Schema({
    secretTxt:{
        type:String,
        require:true
    },
    linkTo:{
        type:String,
    }
})

const Secrets = mongoose.model('secret',secretSchema)

module.exports = Secrets