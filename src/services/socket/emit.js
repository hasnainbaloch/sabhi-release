import { socket } from "./index";

export const connectionEmit = () => {
    socket.emit('connection');
};

