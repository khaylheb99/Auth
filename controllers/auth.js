const { BadRequestError, UnauthenticatedError } = require('../errors')
const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')



const Register = async (req, res) => {

  const user = await User.create({...req.body})
  const token = user.createJWT()
  console.log(user)

  if(user.password == user.Confirm_password){
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token }) 
  } else {
    
    throw new UnauthenticatedError('Password do not match')
  }
}


const Login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  
  const user = await User.findOne({ email })
  
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  // compare password
  const CorrectPassword = await user.comparePassword(password)
  if (!CorrectPassword) {
    throw new UnauthenticatedError('Invalid password')
  }

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

module.exports = {
  Register, Login
}