const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const useSocket = require('socket.io')
const cors = require('cors')
const http = require('http')
const emitter = require('./lib/emitter')

const PORT = config.get('port') || 5001
let HOST = 'localhost'

const app = express()
const path = require("path")

const server = http.createServer(app)
const io = useSocket(server)

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/dialog', require('./routes/dialog.routes'))

if(process.env.NODE_ENV === 'production') {
  HOST = '45.83.123.102'
  app.use('/', express.static(path.join(__dirname, 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  })
}



async function start() { 
  try {
    mongoose.connect(config.get('mongoUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    io.on('connection', socket => {
      console.log('soc connected', socket.id)
      socket.on('init', (name) => {
        socket.join(name)
      })
      
    })
 
    emitter.on('notifyAboutMessage', (recipient, text, header, sender) => {
      io.to(recipient).emit('messageNotify', text, header, sender)
    })

    server.listen(PORT, HOST, () => console.log(`Server OK - ${HOST}:${PORT}`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
} 

start() 