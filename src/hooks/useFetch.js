import { useState } from "react";
import { useAuthContext } from "../hooks/context/useAuthContext";
import { useLogout } from './auth/useLogout'

import { url } from '../helpers/Path'

const MethodLoad = (method, payload, token) => {

    if (method === "GET" || method === "DELETE") {
        return {
            method: method,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
    }
    else if (method === 'POST' || method === "PATCH") {
        return {
            method: method,
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload),
        };
    }
    else throw Error("Invalid Method");
}

const useFetch = () => {

    const { user } = useAuthContext();
    const { logout } = useLogout();

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(null);

    const fetchData = async ({ path, method, payload }) => {
        // console.log(path, method, payload);
        setIsPending(true);
        // setData(null);
        setIsError(null);

        try {
            const load = MethodLoad(method, payload, user.token);

            if (!load.method) return { err: load };
            const response = await fetch(url + path, load);
            const json = await response.json();
            if (!response.ok) {
                if (response.status === 401) logout();
                setIsError(json.error);
                setIsPending(false)
            }
            if (response.ok) {
                setData(json);
                setIsError(null);
                setIsPending(false);
                return json;
            }
        } catch (error) {
            console.log(error);
            setData(null);
            setIsError(error.message);
            setIsPending(false);
        }
    }
    return { fetchData, data, setData, isPending, isError };
}

export default useFetch;