import { Request, Response } from "express";
import { Socket } from "socket.io";
const { Server } = require("socket.io");

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

// socket io initialization
const io = new Server(server);

app.get("/", (req: Request, res: Response) => {
    res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket: Socket) => {
    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
        console.log("message: " + msg);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

server.listen(3000, () => {
    console.log("listening on *:3000");
});
