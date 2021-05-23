const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const morgan = require("morgan");

const PORT = process.env.PORT || 5000;

const router = require("./routes/router");
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

const userRouter = require('./routes/users/userRouter');
app.use('/users', userRouter);

const socket = require('./socketio/socket');
socket(io);

server.listen(PORT, () => {
  console.log(`Server connected to port ${PORT}`);
});
