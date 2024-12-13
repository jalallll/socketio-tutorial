"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserManager {
    constructor() {
        this.users = new Map();
    }
    addUser(socketId, username) {
        if (!username || Array.from(this.users.values()).includes(username)) {
            return false; // Username invalid or already taken
        }
        this.users.set(socketId, username);
        return true;
    }
    removeUser(socketId) {
        const username = this.users.get(socketId);
        if (username) {
            this.users.delete(socketId);
        }
        return username;
    }
    getUsername(socketId) {
        return this.users.get(socketId);
    }
}
exports.default = new UserManager();
