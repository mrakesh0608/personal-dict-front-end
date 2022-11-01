import React, { createContext, useEffect, useReducer } from 'react';

import { useAuthContext } from '../hooks/context/useAuthContext';
import useFetch from '../hooks/useFetch';

const initVal = {
    list: [],
    pending: false,
    error: false
};

export const ListContext = createContext();

export const ListReducer = (state, action) => {

    switch (action.type) {
        case 'INITIALIZE': {
            return initVal;
        }
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

    const { user, isLoading } = useAuthContext();
    const { fetchData, data, isError, isPending } = useFetch();

    const [state, dispatch] = useReducer(ListReducer, initVal);

    useEffect(() => {
        if (!isLoading && user) fetchData({
            path: '/getList',
            method: 'GET'
        });
    }, [user, isLoading]);

    useEffect(() => {
        // console.log(isPending);
        dispatch({ type: 'SET_PENDING', payload: isPending ? 'Loading . . .' : false });
    }, [isPending])

    useEffect(() => {
        // console.log(data);
        if (data) dispatch({ type: 'SET_LIST', payload: [...data] });
    }, [data])
    useEffect(() => {
        // console.log(isError);
        dispatch({ type: 'SET_ERROR', payload: isError ? isError : false });
    }, [isError])

    console.log('ListContext state:', state);
    return (
        <ListContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ListContext.Provider>
    )
}


// socket.on('statusAddWord', (res) => {
//     // console.log(res);
//     if (res.data) {
//         dispatch({ type: 'ADD_WORD_TO_LIST', payload: res.data.List[0] })
//         navigate('/');
//     }
//     else dispatch({ type: 'SET_ERROR', payload: res.err })
// })
// socket.on('statusDeleteWord', (res) => {
//     // console.log(res);
//     if (res.data) {
//         dispatch({ type: 'DELETE_WORD_FROM_LIST', payload: res.data })
//         navigate('/');
//     }
//     else dispatch({ type: 'SET_ERROR', payload: res.err })
// })