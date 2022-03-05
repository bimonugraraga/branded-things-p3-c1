const express = require('express')
const router = express.Router()
const userRoute = require('./userRoute')
const productRoute = require('./productRoute')
const categoryRoute = require('./categoryRoute')
const customerRoute = require('./customersRoute')
const authn = require('../middlewares/authn')

router.use('/pubs', customerRoute)

router.use('/users', userRoute)

router.use(authn)

router.use('/products', productRoute)

router.use('/categories', categoryRoute)



module.exports = router