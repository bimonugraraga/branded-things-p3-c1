const express = require('express')
const router = express.Router()
const Controller = require('../controllers/productController')

router.get('/', Controller.getAllProduct)

router.get('/:id', Controller.getOneProduct)

router.post('/', Controller.addProduct)

router.put('/:productId', Controller.editProduct)

router.delete("/:productId", Controller.deleteProduct)


module.exports = router