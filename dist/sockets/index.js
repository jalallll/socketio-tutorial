"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userManager_1 = __importDefault(require("../utils/userManager"));
const handleSockets = (io) => {
    io.on("connection", (socket) => {
        console.log("A user connected");
        // Handle username selection
        socket.on("set username", (username) => {
            if (!userManager_1.default.addUser(socket.id, username)) {
                socket.emit("username error", "Invalid or already taken username");
                return;
            }
            socket.emit("username accepted", username);
            io.emit("chat message", `${username} has joined the chat`);
        });
        // Handle chat messages
        socket.on("chat message", (msg) => {
            const username = userManager_1.default.getUsername(socket.id);
            if (!username) {
                socket.emit("username error", "You must set a username before sending messages.");
                return;
            }
            io.emit("chat message", `${username}: ${msg}`);
        });
        // Handle user disconnection
        socket.on("disconnect", () => {
            const username = userManager_1.default.removeUser(socket.id);
            if (username) {
                io.emit("chat message", `${username} has left the chat`);
            }
        });
    });
};
exports.default = handleSockets;
