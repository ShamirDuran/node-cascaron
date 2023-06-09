const { io } = require("../../index");

io.on("connection", (socket) => {
    console.log("a user connected");
});
