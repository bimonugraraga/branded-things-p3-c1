const {verifyToken} = require('../helpers/jwt')
const {User, Product, Image, Category} = require('../models')
async function authn(req, res, next){
  console.log('INI AUTHN')
  let {access_token} = req.headers
  console.log(access_token)

  try {
    if (!access_token) {
      res.status(401).json({"message": "Invalid token"})
      return
    }
  
    let payload = verifyToken(access_token)
    let {id, email, username, role} = payload
    let targetedUser = await User.findByPk(+id)
  
    if (!targetedUser){
      res.status(401).json({"message": "Invalid token"})
      return
    } else {
      req.loggedUser = {
        id : targetedUser.id,
        email : targetedUser.email,
        username : targetedUser.username,
        role: targetedUser.role
      }
      next()
    }
  } catch (error) {
    if (error.name === 'JsonWebTokenError'){
      res.status(401).json({"message": "Invalid token"})
    } else{
      res.status(500).json({"message": "Internal server error"})
    }
  }

}

module.exports = authn