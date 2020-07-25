const path = require('path')
const express = require('express')
const socket = require('socket.io')
const http = require('http')
const Filter = require('bad-words')

const app = express()

const server = http.createServer(app)
const io = socket(server)

const staticDir = path.join(__dirname, '../public')
app.use(express.json())
app.use(express.static(path.join(staticDir))) 

io.on('connection',(socket)=>{
    // socket.emit() to that instance where 'on' method is fired i.e. the user.
    // io.emit() emit to all connection
    // socket.broadcast.emit() emit to all except the user
    socket.emit('new connection')
    socket.broadcast.emit('new client')
    socket.on('message', (msg, cb)=>{
        const filter = new Filter()
        if (filter.isProfane(msg)){
            return cb('Bad language not allowed')
        }
        io.emit('message', msg)
        cb() // send the user information that message is delivered. run on client side. kind of feedback function.
    })
    socket.on('disconnect', ()=>{
        io.emit('message', 'user left')
    })
    socket.on('location', (location, cb)=>{
        socket.broadcast.emit('location', location)
        cb() 
    })
})

server.listen(3000, (msg)=>{
    console.log('at port 3000')

})