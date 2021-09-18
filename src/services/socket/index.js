import io from "socket.io-client";

import { socketEvents } from "./events";
import { getQueueLength } from "./emit";

export const socket = io('socket-url');

export const initSockets = ({ setValue }) => {
    socketEvents({ setValue });
    getQueueLength();
};