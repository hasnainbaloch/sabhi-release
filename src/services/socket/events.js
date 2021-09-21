import { socket } from './index';

export const socketEvents = ({ setValue }) => {
    socket.on('connectionSuccess', (socket) => {
        setValue(state => { return { ...state, socket } });
    });

    socket.on('applicantReport', (applicantReport) => {
        setValue(state => { return { ...state, applicantReport } });
    });
};