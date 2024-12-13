class UserManager {
    private users: Map<string, string>; // socket.id -> username

    constructor() {
        this.users = new Map();
    }

    addUser(socketId: string, username: string): boolean {
        if (!username || Array.from(this.users.values()).includes(username)) {
            return false; // Username invalid or already taken
        }
        this.users.set(socketId, username);
        return true;
    }

    removeUser(socketId: string): string | undefined {
        const username = this.users.get(socketId);
        if (username) {
            this.users.delete(socketId);
        }
        return username;
    }

    getUsername(socketId: string): string | undefined {
        return this.users.get(socketId);
    }
}

export default new UserManager();
