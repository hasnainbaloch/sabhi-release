import io from "socket.io-client";

import { socketEvents } from "./events";
import { connectionEmit } from "./emit";

export const socket = io('https://757a-39-33-129-177.ngrok.io/');

export const initSockets = ({ setValue }) => {
    socketEvents({ setValue });
    connectionEmit();
};