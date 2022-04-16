const http = require('http');
const { Server } = require('socket.io');

const port = process.env.PORT || 8000;

const app = require('./app');

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    socket.emit('Server is connected')
    console.log('Server is connected');
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});