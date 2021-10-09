const express = require('express')
const index = express.Router()
module.exports = (() => {
    console.log("here on index")
    index.get('/',(req, res) => {
        console.log("here on index")
        res.render('../public/index')
     }
    )
})()
module.exports = index