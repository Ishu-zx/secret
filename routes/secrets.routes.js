const express = require('express')
const Secrets = require('../models/secrets.models')
const router = express.Router()

//getting all secrets
router.get('/', async (req, res) => {
    try {
        const secrets = await Secrets.find()
        if (secrets == '') { return res.status(400).json({ message: 'No Secrets', user: req.user }) }
        res.status(200).json({ secrets, user: req.user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//adding a secret
router.post('/', async (req, res) => {
    try {
        const secret = new Secrets({
            secretTxt: req.body.secretTxt,
            linkTo: req.body.linkTo
        })
        if (secret.secretTxt == '') {
            return res.status(400).json({ message: 'no secret entered!!' })
        }
        secret.save()
        res.status(200).json({ message: 'secret saved.' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//edit a secret
router.patch('/:id', async (req, res) => {
    try {
        await Secrets.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({ message: 'secret update!' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//delete secret
router.delete('/delete/:id', async (req, res) => {
    try {
        await Secrets.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'secret deleted'})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

})

module.exports = router
