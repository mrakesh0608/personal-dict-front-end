import React,{ createContext, useState, useEffect } from 'react'
import io from "socket.io-client";
import ToggleDarkTheme from '../helpers/ToggleDarkTheme';

const url = 'http://localhost:8080';

export const SocketContext = createContext();
export const SocketContextProvider = ({ children }) => {
    const [isSockError, setIsSockError] = useState(false);

    const socket = io(url);
    useEffect(() => {
        // socket.disconnect();
        if (localStorage.getItem('Dark-Theme')) ToggleDarkTheme();

        socket.on('connect', async err => {
            console.log('connect');
            socket.emit('IAM', ({Username:'mrakesh0608'}));
            setIsSockError(false);
        });
        socket.on('connect_error', err => {
            setIsSockError('failed to connect to server');
        });
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isSockError }} >
            {isSockError && <div className='socket-error'>{isSockError}</div>}
            {children}
        </SocketContext.Provider>
    )
}