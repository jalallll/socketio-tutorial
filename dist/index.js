"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Server } = require("socket.io");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
// socket io initialization
const io = new Server(server);
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});
const users = new Map(); // socket.id -> username
io.on("connection", (socket) => {
    console.log("A user connected");
    // Handle username selection
    socket.on("set username", (username) => {
        if (!username || users.has(username)) {
            socket.emit("username error", "Invalid or already taken username");
            return;
        }
        users.set(socket.id, username);
        socket.emit("username accepted", username);
        io.emit("chat message", `${username} has joined the chat`);
    });
    // Handle chat messages
    socket.on("chat message", (msg) => {
        const username = users.get(socket.id);
        if (!username) {
            socket.emit("username error", "You must set a username before sending messages.");
            return;
        }
        io.emit("chat message", `${username}: ${msg}`);
    });
    // Handle user disconnection
    socket.on("disconnect", () => {
        const username = users.get(socket.id);
        if (username) {
            users.delete(socket.id);
            io.emit("chat message", `${username} has left the chat`);
        }
    });
});
server.listen(3000, () => {
    console.log("listening on *:3000");
});
