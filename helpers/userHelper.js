let users = [{ id: "545sfdf54", name: "arshal abbas", room: "defaultRoom" }];

module.exports = {
  addUser: ({ id, name, room }) => {
    if (!name || !room) return { error: "name and room is missing" };
    const checkExistance = users.find((user) => user.id === id);
    if (checkExistance) return { error: "user already joined" };
    const user = { id, name, room };

    users.push(user);

    return { user };
  },

  removeUser: (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) return users.splice(index, 1);
  },

  getUser: (id) => users.find((user) => user.id === id),

  getUserWithName: (name) => users.find((user) => user.name === name),

  getUsersInRoom: (room) => users.filter((user) => user.room === room),
};
