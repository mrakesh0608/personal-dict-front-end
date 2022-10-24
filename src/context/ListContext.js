import React, { createContext, useEffect, useReducer } from 'react'
import { useSocketContext } from '../hooks/context/useSocketContext';
import { useNavigate } from 'react-router-dom';

export const ListContext = createContext();

export const ListReducer = (state, action) => {

    switch (action.type) {
        case 'SET_LIST': {
            return {
                ...state,
                list: action.payload
            }
        }
        case 'ADD_WORD_TO_LIST': {
            state.list.push(action.payload)
            return { ...state }
        }
        case 'DELETE_WORD_FROM_LIST': {
            return {
                ...state,
                list: state.list.filter(item => item._id !== action.payload)
            };
        }
        case 'SET_ERROR': {
            return {
                ...state,
                error: action.payload
            }
        }
        case 'SET_PENDING': {
            return {
                ...state,
                pending: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export const ListContextProvider = ({ children }) => {

    const { socket } = useSocketContext();
    const navigate = useNavigate();

    const [state, dispatch] = useReducer(ListReducer, {
        list: [],
        pending: false,
        error: null
    });

    useEffect(() => {
        dispatch({ type: 'SET_PENDING', payload: 'Loading . . .' });
        socket.emit('getList');
        socket.on('onList', res => {
            // console.log(res);
            if (res.data) dispatch({ type: 'SET_LIST', payload: [...res.data] });
            else dispatch({ type: 'SET_ERROR', error: res.err });

            dispatch({ type: 'SET_PENDING', payload: false });
        })
        socket.on('statusAddWord', (res) => {
            // console.log(res);
            if (res.data) {
                dispatch({ type: 'ADD_WORD_TO_LIST', payload: res.data.List[0] })
                navigate('/');
            }
            else dispatch({ type: 'SET_ERROR', payload: res.err })
        })
        socket.on('statusDeleteWord', (res) => {
            // console.log(res);
            if (res.data) {
                dispatch({ type: 'DELETE_WORD_FROM_LIST', payload: res.data })
                navigate('/');
            }
            else dispatch({ type: 'SET_ERROR', payload: res.err })
        })
    }, [])

    console.log('ListContext state:', state);
    return (
        <ListContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ListContext.Provider>
    )
}