const socket = io()
socket.on('count updated', (count)=>{
    console.log('count updated', count)
})

socket.on('new client', ()=>{
    console.log('new client')
})
socket.on('new connection', ()=>{
    console.log('welcome')
})

socket.on('message', (msg)=>{
    console.log(msg)
})

socket.on('location', (loc)=>{
    console.log(loc)
})

document.querySelector('#increment').addEventListener('click', ()=>{
    console.log('Click')
    socket.emit('increment')
})
document.querySelector('#send').addEventListener('click', (e)=>{
    e.preventDefault()

    const msg = document.querySelector('#message').value
    if (msg !== ''){
        socket.emit('message', msg)
    }
})
document.querySelector('#location').addEventListener('click', ()=>{
    navigator.geolocation.getCurrentPosition((location)=>{
        socket.emit('location', location)
    })
})