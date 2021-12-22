import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/user';
import ButtonItem from '../UI/buttons/ButtonItem';
import {SERVER_URL} from '../../env.js';

import "./sidebar.scss";
import foodIco from '../../resources/icons/food.svg';
import notesIco from '../../resources/icons/tasks.svg';
import logoutIco from '../../resources/icons/logout.svg';
import defaultAvatar from '../../resources/img/profile-img.png';

function Sidebar() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.currentUser);
    const avatar = user.avatar ? `${SERVER_URL + user.avatar}` : defaultAvatar;

    const userLogout = (e) => {
        dispatch(logout())
    }
    return (
        <div className="sidebar">
            <nav className="sidebar__menu">
                <ul className="sidebar__list">
                    <li className="sidebar__item">
                        <NavLink to="/home" className="sidebar__link">
                            <img className="sidebar__link-img profile-img" alt="Profile" src={avatar} />
                            <span className="sidebar__link-title">Profile</span>
                        </NavLink>
                    </li>
                    <li className="sidebar__item">
                        <NavLink to="/foods" className="sidebar__link">
                            <img className="sidebar__link-icon" alt="Food" src={foodIco} />
                            <span className="sidebar__link-title">Food</span>
                        </NavLink>
                    </li>
                    <li className="sidebar__item">
                        <NavLink to="/notes" className="sidebar__link">
                            <img className="sidebar__link-icon" alt="Notes" src={notesIco} />
                            <span className="sidebar__link-title">Notes</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <ButtonItem
                className="sidebar__logout"
                    onClick={userLogout}
            >
            <img className="sidebar__logout-ico" src={logoutIco} alt="logout" />
            <span className="sidebar__logout-title">Log Out</span>
            </ButtonItem>
        </div>
    );
}

export default Sidebar;
