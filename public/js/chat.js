const socket = io()
const query = location.search.replace('name', '').replace('?', '').replace('&', ' ').replace('room', '').replace('=', '').replace('=', '').split(' ')

socket.emit('join', query)
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
const $messageButton = document.querySelector('#send') 
const $message = document.querySelector('#message')
$messageButton.addEventListener('click', (e)=>{
    e.preventDefault()
    // disabling button until the message sent to server
    $messageButton.setAttribute('disabled', 'disabled')
    if ($message.value !== ''){
        // enabling button again when message handled by server
        socket.emit('message', $message.value, (error)=>{
            $messageButton.removeAttribute('disabled')
            $message.value = ''
            $message.focus()
            if (error){
                return console.log(error)
            }
            console.log('message was delivered') // Event Acknowledgement. server runs this fn when io.emit() runs
        })
    }else{
        $messageButton.removeAttribute('disabled')
    }
})
document.querySelector('#location').addEventListener('click', ()=>{
    navigator.geolocation.getCurrentPosition((location)=>{
        socket.emit('location', location, ()=>{
            console.log('Location Delivered')
        })
    })
})