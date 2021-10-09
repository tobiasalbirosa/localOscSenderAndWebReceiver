const express = require('express')
const controller = express.Router()
const index = require('../routes/index')
module.exports = ((req, res) =>{
    controller.get('/',index)
})()
module.exports = controller