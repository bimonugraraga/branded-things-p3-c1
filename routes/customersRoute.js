const express = require('express')
const router = express.Router()
const Controller = require('../controllers/productController')

router.get('/', Controller.getAllProduct)

router.get('/:id', Controller.getOneProduct)


module.exports = router