const { port, prefix } = require("./src/configs/env.config");
const errorHandlerMiddleware = require("./src/middlewares/error.middleware");

// Express
const express = require("express");
const cors = require("cors");
const app = express();

// Sockets
const http = require("http");
const server = http.createServer(app);
module.exports.io = require("socket.io")(server); // export socket.io instance to be used in other files
require("./src/sockets/socket"); // import socket.io events

// Middlewares
app.use(express.json());
app.use(errorHandlerMiddleware);
app.use(cors());

// Routes
app.get(prefix, (req, res) => res.json({ message: "Base route" }));
app.use(`${prefix}/test`, require("./src/routes/test.route"));

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
