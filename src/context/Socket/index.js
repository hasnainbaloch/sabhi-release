import { createContext, useState, useEffect } from 'react';
import { initSockets } from '../../services/socket';


// create Socket Context
export const SocketContext = createContext(null);

export default function SocketProvider({ children }) {

    const [value, setValue] = useState({
        queueLength: 0,
        positionInLine: 0,
    });

    useEffect(() => initSockets({ setValue }), [initSockets]);

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )

}
