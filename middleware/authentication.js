const user = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnaunthenticatedError } = require('../errors')

const auth = async (req, res, next) => {
  //Check header
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnaunthenticatedError('Authorization not granted')
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    //Attaching job routes
    req.user = { userId: payload.userId, name: payload.name}
    next()
  } catch (error) {
    throw new UnaunthenticatedError('Authorization denied')
  }
}


module.exports = auth 

