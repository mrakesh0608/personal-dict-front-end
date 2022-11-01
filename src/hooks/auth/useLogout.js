import { useAuthContext } from '../context/useAuthContext';
import { useListContext } from '../context/useListContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    // const { dispatch: dispatchList } = useListContext();

    const logout = () => {
        localStorage.removeItem('user'); // remove user from storage
        
        // dispatchList({ type: 'INITIALIZE' });  //Clear Data
        dispatch({ type: 'LOGOUT' }); // dispatch logout action
    }
    return { logout }
}