const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const initRoutes = require('./src/routes');
const cors = require('cors');
const { initialize } = require('./src/socket/socket');
require('dotenv').config();
require('./connection_db');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: '*',
    }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
initRoutes(app, io);
initialize(io)



const PORT = process.env.PORT || 8000;
const listener = server.listen(PORT, () => {
    console.log('Server is running on the port ' + listener.address().port);
});





// const express = require('express');
// // const cors = require('cors');
// import cors from 'cors'
// const initRoutes = require('./src/routes')
// require('dotenv').config();
// require('./connection_db')
// const app = express()
// app.use(cors())

// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// initRoutes(app)

// const PORT = process.env.PORT || 8000

// const listener = app.listen(PORT, () => {
//     console.log('Sever is running on the port ' + listener.address().port)
// })