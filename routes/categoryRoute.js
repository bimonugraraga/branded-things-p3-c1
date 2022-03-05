const express = require('express')
const router = express.Router()
const Controller = require('../controllers/categoryController')

router.get('/', Controller.getAllCategory)

router.post('/', Controller.addNewCategory)

router.delete('/:categoryId', Controller.deleteCategory)


module.exports = router