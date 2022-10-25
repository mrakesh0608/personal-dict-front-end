import { useState } from 'react'
import { useAuthContext } from 'hooks/context/useAuthContext';
import {url} from 'helpers/Path'

export const useSignup = () => {
    
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (newUser) => {
        console.log(newUser);
        setIsLoading(true)
        setError(null)

        const response = await fetch(url+'/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        })
        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the auth context
            dispatch({ type: 'LOGIN', payload: json })

            // update loading state
            setIsLoading(false)
        }
    }

    return { signup, isLoading, error }
}