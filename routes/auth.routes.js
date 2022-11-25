const {Router} = require('express')
const User = require('../models/User')
const config = require('config')
const jwt = require('jsonwebtoken')

const router = Router()

router.post('/login', async (req, res) => {

  try {
    const {name} = req.body

    const candidate = await User.findOne({name: name})

    const token = jwt.sign(
      {name: name},
      config.jwtSecret,
      {expiresIn: '1h'}
    )
    
    const user = new User({name})

    if (!candidate) {
      await user.save() 
      res.json({name, token, id: user._id}) 
    } else {
      res.json({name, token, id: user._id}) 
    }

  } catch (err) {
    res.status(500).json({message: 'Oooops. Something went wrong...'})
  } 
})

router.get('/', async (req, res) => { 
  try {
    const users = await User.find()
    res.json(users)
  } catch (e) {
    res.status(500).json({message: 'Oooops. Something went wrong...'})
  } 
}) 

module.exports = router