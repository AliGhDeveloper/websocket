import express from 'express';
import { Server } from 'socket.io';


const app = express();
const PORT = process.env.PORT || 4000
const server = app.listen(PORT, () => {
    console.log('listening to port 4000')
});

const io = new Server(server);
app.use(express.static('public'))



io.on('connection', (socket) => {
    console.log('made socket connection', socket.id)

    socket.on('typing', (data) => {
        socket.broadcast.emit('feedback', data)
    })


    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    })
})

