const {User, Product, Image, Category} = require('../models')

class Controller{
  static async getAllCategory(req, res, next){
    console.log("INI ALL CAT")
    try {
      let allCategories = await Category.findAll({
        attributes: {exclude: ['createdAt', 'updatedAt']}
      })
      res.status(200).json(allCategories)
    } catch (error) {
      res.status(500).json({message: 'Internal sever error'})
    }
  }

  static async addNewCategory(req, res, next){
    console.log("INI ADD CAT")
    let {name} = req.body
    try {
      let newCategory = await Category.create({
        name
      })

      res.status(201).json(newCategory)
    } catch (error) {
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

  static async deleteCategory(req, res, next){
    console.log("INI DEL CAT")
    let {categoryId} = req.params

    try {
      let targetedCategory = await Category.findByPk(+categoryId)

      if (!targetedCategory){
        res.status(404).json({message: 'Category Not Found!'})
        return
      }

      let deletedCategory = await Category.destroy({
        where: {
          id: +categoryId
        }
      })

      res.status(200).json({message: 'Category Has Been Deleted'})
    } catch (error) {
      res.status(500).json({message: 'Internal sever error'})
    }
  }
}

module.exports = Controller