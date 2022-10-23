import { Link, Route, Routes } from 'react-router-dom';
import React from 'react';

import Home from './pages/Home';
import AddWord from './pages/AddWord';
import FiveWords from './pages/FiveWords';

import menuIcon from './icons/menu.png'
import ToggleDarkTheme from './helpers/ToggleDarkTheme';

import './css/App.css';

const App = () => {
    return (
        <div className="App">
            <header className='main-header'>
                <h1><Link to='/'>Dictionary</Link></h1>
                <div className='header-menu'>
                    <button className='header-menu-btn button-default bg-trans'>
                        <img src={menuIcon} className='img-invert' alt='menu' />
                    </button>
                    <div className='header-menu-list'>
                        <Link to='/'>All Words</Link>
                        <Link to='/add'>Add Word</Link>
                        <Link to='/5words'>5 Words</Link>
                        <span onClick={ToggleDarkTheme}>Toggle Dark Theme</span>
                    </div>
                </div>
            </header>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/add' element={<AddWord />} />
                <Route exact path='/5words' element={<FiveWords />} />
            </Routes>
        </div>
    );
}
export default App;