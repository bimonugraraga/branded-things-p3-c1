const {User, Product, Image, Category} = require('../models')
const {signToken} = require('../helpers/jwt')
const {verifPassword} = require('../helpers/handlePassword')
class Controller {
  static async addNewUser(req, res, next){
    console.log("INI REGISTER")
    let {username, email, password, phoneNumber, address} = req.body
    try {
      let newUser = await User.create({
        username,
        email,
        password,
        role: 'admin',
        phoneNumber,
        address
      })

      let tempNewUser = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.email,
        phoneNumber: newUser.phoneNumber,
        address: newUser.address
      }

      let payload = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.email,
      }

      let access_token = signToken(payload)
      res.status(201).json({
        tempNewUser, access_token: access_token
      })
    } catch (error) {
      console.log(error)
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

  static async loginUser(req, res, next){
    console.log("INI LOGIN")
    let {email, password} = req.body
    console.log(req.body)
    try {
      if (!email){
        res.status(400).json({message: 'Email is required'})
        return
      }

      if (!password){
        res.status(400).json({message: 'Password is required'})
        return
      }

      let targetUser = await User.findOne({
        where: {
          email
        }
      })

      console.log(targetUser)
      if (!targetUser){
        res.status(401).json({message: 'Invalid Email or Password'})

      } else{
        let isPassword = verifPassword(password, targetUser.password)

        if (!isPassword){
          res.status(401).json({message: 'Invalid Email or Password'})

        } else {
          let tempLoggedUser = {
            id: targetUser.id,
            username: targetUser.username,
            email: targetUser.email,
            role: targetUser.email,
            phoneNumber: targetUser.phoneNumber,
            address: targetUser.address
          }
          let payload = {
            id: targetUser.id,
            email: targetUser.email,
            username: targetUser.username,
            role: targetUser.role
          }

          let access_token = signToken(payload)

          res.status(200).json({tempLoggedUser, access_token: access_token})

        }
      }
    } catch (error) {
      res.status(500).json({message: 'Internal sever error'})
    }

  }
}

module.exports = Controller