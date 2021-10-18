import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation({ isLoaded }){
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory()
    
    const [ credential, setCredential ] = useState('');
    const [ password, setPassword ] = useState('');

    const demoLogin = async () => {
        setCredential("Demo-lition")
        setPassword("password")
        history.push('/beers')
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
            <button className="demo-login-button" onClick={demoLogin}>
                Demo User
            </button>
            <LoginFormModal />
            <div className="signup-button-container">
                <NavLink to="/signup">
                <button className="signup-button">Sign Up</button>
                </NavLink>
            </div>
        </>
        );
    }

    return (
        <div className="nav-bar">
            <div className="nav-container">
                <div className="home-container">
                    <NavLink className="home-button" exact to="/">
                        <img className="logoImg" src="https://res.cloudinary.com/dxo7djnid/image/upload/v1634081657/uncappd/uncappd_logo_smyrkl.svg" alt="" />
                        {/* <img className="logoImg" src="https://res.cloudinary.com/dxo7djnid/image/upload/v1634098191/uncappd/uncappd_logo_dnj6ne.gif" alt="" /> */}
                    </NavLink>
                </div>
                {sessionUser && 
                <div className="beers-list-button-container">
                    <NavLink className="beers-list-navlink" to="/beers/">
                        <div className="beers-list-button-div">Beers List</div>
                    </NavLink>
                </div>
                
                }
                <div className="nav-button">
                    {isLoaded && sessionLinks}
                </div>
            </div>
        </div>
    );
}

export default Navigation;