const app = require("./app");
const http = require("http");
const socket = require("socket.io");

const server = http.createServer(app);

const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const PORT = 3000;

server.listen(PORT);
console.log(`started server on port ${PORT}`);

let readyPlayers = 0;
io.on("connection", (socket) => {
  console.log(`A client connected with id -  ${socket.id}`);
  socket.on("ready", () => {
    console.log("Player ready", socket.id);
    readyPlayers += 1;
    console.log(readyPlayers);
    if (readyPlayers % 2 === 0) {
      io.emit("startGame", socket.id);
    }
  });
  socket.on("paddleMove", (paddleData) => {
    console.log(`paddlemove data - ${paddleData}`);
    socket.broadcast.emit("paddleMove", paddleData);
  });
  socket.on("ballMove", (ballData) => {
    socket.broadcast.emit("ballMove", ballData);
  });
});
