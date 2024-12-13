const http = require("http");
const expressApp = require("./app"); // Rename to expressApp to avoid conflict
const { Server } = require("socket.io");
const handleSockets = require("./sockets");

const PORT = 3000;

// Create HTTP server
const httpServer = http.createServer(expressApp);

// Attach Socket.IO to the server
const io = new Server(httpServer);

// Initialize Socket.IO handlers
handleSockets(io);

// Start the server
httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
