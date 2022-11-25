const {Router} = require('express')
const Dialog = require('../models/Dialog')

const router = Router()
const emitter = require('../lib/emitter')

router.get('/dialogsList/:id', async (req, res) => {
  try {
    const {id} = req.params || {};
    if(!id) throw new Error('Wrong params!')
    const dialogs = await Dialog.find({members: id})
    res.json(dialogs) 
  } catch (e) {
    console.error(e)
    res.status(400)
  }
  
})

router.get('/myMessages/:name', async (req, res) => {
  try {
    const {name} = req.params || {}
    const msg = await Dialog.find({recipient: name})
    res.json(msg) 
  } catch (e) {
    console.error(e)
    res.status(400)
  }
})

router.get('/sentMessages/', async (req, res) => {
  try {
    const {currName, recName} = req.query || {}
    const msg = await Dialog.find({sender: currName, recipient: recName})
    res.json(msg) 
  } catch (e) {
    console.error(e)
    res.status(400)
  }
})

router.post('/sendMessage', async (req, res) => {
  try {
    const {text, header, sender, recipient, idRecipient, senderId} = req.body

    let dialog = new Dialog({text, header, sender, recipient, idRecipient, senderId})
    await dialog.save()
    emitter.emit('notifyAboutMessage', recipient, text, header, sender)
    res.json({text, header, sender, recipient, idRecipient, senderId})
  } catch(e) {
    console.error(e)
    res.status(400)
  }
})
  
module.exports = router   