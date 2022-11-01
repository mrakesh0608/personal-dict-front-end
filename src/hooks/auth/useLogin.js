import { useState } from 'react'
import { useAuthContext } from '../context/useAuthContext';

import {url} from '../../helpers/Path'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(null)
    const { dispatch } = useAuthContext();

    const login = async (user) => {
        // console.log(user);
        setIsPending(true)
        setError(null)

        const response = await fetch(url+'/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        })
        const json = await response.json()

        if (!response.ok) {
            setIsPending(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({ type: 'LOGIN', payload: json })

            // update loading state
            setIsPending(false)
        }
    }
    return { login, isPending, error }
}