const path = require('path')
const express = require('express')
const socket = require('socket.io')
const http = require('http')

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
        io.emit('message', msg)
        cb() // send the user information that message is delivered
    })
    socket.on('disconnect', ()=>{
        io.emit('message', 'user left')
    })
    socket.on('location', (location)=>{
        socket.broadcast.emit('location', location)
    })
})

server.listen(3000, (msg)=>{
    console.log('at port 3000')

})