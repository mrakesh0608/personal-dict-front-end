import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { SocketContextProvider } from './context/SocketContext';
import { ListContextProvider } from './context/ListContext';

import App from './App';
import './css/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <SocketContextProvider>
            <ListContextProvider>
                <App />
            </ListContextProvider>
        </SocketContextProvider>
    </BrowserRouter>
);