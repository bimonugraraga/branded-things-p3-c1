const {User, Product, Image, Category, sequelize} = require('../models')

class Controller {
  static async getAllProduct(req, res, next){
    console.log("INI GET PRODUCT")
    try {
      let allProducts = await Product.findAll({
        include: [
          {
            model: User,
            attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
          },
          {
            model:Category,
            attributes: {exclude: ['createdAt', 'updatedAt']}
          },
          {
            model:Image,
          }
        ],
        attributes: {exclude: ['createdAt', 'updatedAt']}
      })

      res.status(200).json(allProducts)
    } catch (error) {
      console.log(error)
      res.status(500).json({message: 'Internal sever error'})
    }
  }

  static async getOneProduct(req, res, next){
    console.log("INI ONE PRODUCT")
    let {id} = req.params
    // console.log(id)
    try {
      let targetedProduct = await Product.findOne({
        where: {
          id: +id
        },
        include: [
          {
            model: User,
            attributes: {exclude: ['password', 'createdAt', 'updatedAt']}
          },
          {
            model:Category,
            attributes: {exclude: ['createdAt', 'updatedAt']}
          },
          {
            model:Image,
            attributes: {exclude: ['createdAt', 'updatedAt']}
          }
        ],
        attributes: {exclude: ['createdAt', 'updatedAt']}
      })

      if (!targetedProduct){
        res.status(404).json({message: 'Product Not Found!'})
        return
      }

      res.status(200).json(targetedProduct)
    } catch (error) {
      res.status(500).json({messahe: 'Internal server error'})
    }
  }

  static async addProduct(req, res, next){
    console.log('INI ADD PRODUCT')
    console.log(req.body)
    let {name, description, mainImg, categoryId, price, imgUrl} = req.body
    // console.log(imgUrl)
    let {id} = req.loggedUser
    let slug = name.toLowerCase().split(" ").join("-")

    const t = await sequelize.transaction()
    try {
      let newProduct = await Product.create({
        name,
        slug,
        description,
        mainImg,
        price: +price,
        categoryId: +categoryId,
        authorId: +id
      }, {
        transaction: t
      })


      // console.log(imgUrl)
      let imagesData = imgUrl.map((el) => {
        let temp = {
          imgUrl: el,
          productId: newProduct.id
        }
        return temp
      })

      console.log(imagesData, "<<<")
      let newImages = await Image.bulkCreate(imagesData, {
        transaction: t
      })

      await t.commit()
      res.status(201).json({newProduct, newImages})
    } catch (error) {
      await t.rollback()
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
        let errorMapped = error.errors.map((el) => {
          return el.message
        })
        res.status(400).json(errorMapped)
      } else{
        res.status(500).json({message: 'Internal sever error'})
      }
    }
  }

  static async editProduct(req, res, next){
    console.log("INI UPDATE")
    let {productId} = req.params
    let {name, description, mainImg, categoryId, price, authorId} = req.body
    // let {id} = req.loggedUser
    let slug = name.toLowerCase().split(" ").join("-")
    const t = await sequelize.transaction()
    try {

      let targetedProduct = await Product.findByPk(+productId)

      if (!targetedProduct){
        res.status(404).json({message: 'Product Not Found!'})
        return
      }

      let updatedProduct = await Product.update({
        name,
        description,
        slug,
        mainImg,
        price: +price,
        categoryId: +categoryId,
        authorId: +authorId
      }, {
        where: {
          id: +productId,
        },
        transaction: t
      })

      await t.commit()

      res.status(200).json({message: 'Product Has Been Updated'})
    } catch (error) {
      // console.log(error)
      await t.rollback()
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError'){
        let errorMapped = error.errors.map((el) => {
          return el.message
        })
        res.status(400).json(errorMapped)
      } else{
        res.status(500).json({message: 'Internal sever error'})
      }
    }

  }

  static async deleteProduct(req, res, next){
    console.log("INI DELETE")
    // console.log(req.params)
    let {productId} = req.params
    try {
      let targetedProduct = await Product.findByPk(+productId)
      
      if (!targetedProduct){
        res.status(404).json({message: 'Product Not Found!'})
        return
      }

      let deletedProduct = await Product.destroy({
        where: {
          id: +productId
        }
      })

      res.status(200).json({message: 'Product Has Been Deleted'})
    } catch (error) {
      res.status(500).json({message: 'Internal sever error'})
    }
  }
}

module.exports = Controller