import { Link, Route, Routes, Navigate } from 'react-router-dom';
import React from 'react';

import { useAuthContext } from './hooks/context/useAuthContext';
import { useLogout } from './hooks/auth/useLogout';

import Home from './pages/Home';
import AddWord from './pages/AddWord';
import FiveWords from './pages/FiveWords';
import WordDesc from './pages/WordDesc';
import UpdateWord from './pages/UpdateWord';
import NotFound from './pages/NotFound';

import LogIn from './pages/Auth/LogIn';
import SignUp from './pages/Auth/SignUp';

import DownloadDictList from './components/DownloadDictList';
import ToggleDarkTheme from './helpers/ToggleDarkTheme';
import menuIcon from './icons/menu.png';

import './css/App.css';

export default function App() {

    const { user, isLoading } = useAuthContext();
    const { logout } = useLogout();
    
    return (
        <div id="App" className="App">
            {user &&
                <header className='main-header'>
                    <h1><Link to='/'>Dictionary</Link></h1>
                    <div className='header-menu'>
                        <button className='header-menu-btn button-default bg-trans'>
                            <img src={menuIcon} className='img-invert' alt='menu' />
                        </button>
                        <div className='header-menu-list'>
                            <Link to='/'>All Words</Link>
                            <Link to='/5words'>5 Words</Link>
                            <Link to='/addWord'>Add Word</Link>
                            <span onClick={ToggleDarkTheme}>Toggle Dark Theme</span>
                            <DownloadDictList />
                            <span onClick={logout}>Logout</span>
                        </div>
                    </div>
                </header>
            }
            {!isLoading &&
                <Routes>
                    <Route exact path='/' element={user ? <Home /> : <Navigate to='/login' />} />
                    <Route exact path='/addWord' element={user ? <AddWord /> : <Navigate to='/login' />} />
                    <Route exact path='/5words' element={user ? <FiveWords /> : <Navigate to='/login' />} />
                    <Route exact path='/WordDesc/:id' element={user ? <WordDesc /> : <Navigate to='/login' />} />
                    <Route exact path='/UpdateWord/:id' element={user ? <UpdateWord /> : <Navigate to='/login' />} />

                    <Route exact path='/login' element={!user ? <LogIn /> : <Navigate to='/' />} />
                    <Route exact path='/signup' element={!user ? <SignUp /> : <Navigate to='/' />} />

                    <Route path='*' element={<NotFound />} />
                </Routes>
            }
        </div>
    );
}