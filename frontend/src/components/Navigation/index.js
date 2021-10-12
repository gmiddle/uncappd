import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }){
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    
    const [ credential, setCredential ] = useState('');
    const [ password, setPassword ] = useState('');

    const demoLogin = async () => {
        setCredential("Demo-lition")
        setPassword("password")
        return dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" }))
    }

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
        <ProfileButton user={sessionUser} />
        );
    } else {
        sessionLinks = (
        <>
            <button onClick={demoLogin}>
                Demo User
            </button>
            <LoginFormModal />
            <NavLink to="/signup">Sign Up</NavLink>
        </>
        );
    }

    return (
        <ul>
        <li>
            <NavLink exact to="/">Home</NavLink>
            {isLoaded && sessionLinks}
        </li>
        </ul>
    );
}

export default Navigation;