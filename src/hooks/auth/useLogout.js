import { useAuthContext } from 'hooks/context/useAuthContext'
import { usePostListContext } from 'hooks/context/usePostListContext'
import { useSocketContext } from 'hooks/context/useSocketContext';
export const useLogout = () => {
    const { dispatch } = useAuthContext()
    
    const { socket } = useSocketContext();
    const { dispatch: dispatchPostList } = usePostListContext();

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user');
        localStorage.removeItem('Following_users');
        
        socket.disconnect();
        //Clear Data
        dispatchPostList({ type: 'REFRESH' });
        // dispatch logout action
        dispatch({ type: 'LOGOUT' })
    }
    return { logout }
}