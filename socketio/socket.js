const {
  addUser,
  getUser,
  getUsersInRoom,
  removeUser,
} = require("../helpers/userHelper");

const admin = "chatGlint-admin-28-09-2003";

function socket(io) {
  io.on("connection", (socket) => {
    socket.on("join", ({ name, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room });

      if (error) return console.log(error);

      socket.join(user.room);

      socket.emit("message", {
        user: admin,
        text: `${user.name}, welcome to the party!`,
      });
      socket.broadcast.to(user.room).emit("message", {
        user: admin,
        text: `${user.name} has been joined the party!`,
      });

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });

      callback();
    });

    socket.on("sendMessage", (message, callback) => {
      const user = getUser(socket.id);
      io.to(user.room).emit("message", { user: user.name, text: message });
      callback();
    });

    socket.on("disconnect", () => {
      const user = removeUser(socket.id);

      if (user) {
        io.to(user[0].room).emit("message", {
          user: admin,
          text: `${user[0].name} has left the party!`,
        });
        io.to(user[0].room).emit("roomData", {
          room: user[0].room,
          users: getUsersInRoom(user[0].room),
        });
      }
    });
  });
}

module.exports = socket;
