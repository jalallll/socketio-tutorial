import { Server, Socket } from "socket.io";
import UserManager from "../utils/userManager";

const handleSockets = (io: Server) => {
    io.on("connection", (socket: Socket) => {
        console.log("A user connected");

        // Handle username selection
        socket.on("set username", (username: string) => {
            if (!UserManager.addUser(socket.id, username)) {
                socket.emit(
                    "username error",
                    "Invalid or already taken username"
                );
                return;
            }

            socket.emit("username accepted", username);
            io.emit("chat message", `${username} has joined the chat`);
        });

        // Handle chat messages
        socket.on("chat message", (msg) => {
            const username = UserManager.getUsername(socket.id);
            if (!username) {
                socket.emit(
                    "username error",
                    "You must set a username before sending messages."
                );
                return;
            }
            io.emit("chat message", `${username}: ${msg}`);
        });

        // Handle user disconnection
        socket.on("disconnect", () => {
            const username = UserManager.removeUser(socket.id);
            if (username) {
                io.emit("chat message", `${username} has left the chat`);
            }
        });
    });
};

export default handleSockets;
