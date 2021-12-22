import React from 'react';
import HeaderTitle from '../../components/headerTitle/HeaderTitle';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAvatar, uploadAvatar } from '../../redux/actions/user';
import {SERVER_URL} from '../../env.js';

import editBtn from '../../resources/icons/edit-pen.svg';
import defaultAvatar from '../../resources/img/profile-img.png';
import './homePage.scss';

function HomePage() {
    const user = useSelector(state => state.user.currentUser);
    const avatar = user.avatar ? `${SERVER_URL + user.avatar}` : defaultAvatar;
    const dispatch = useDispatch();

    const changeHandler = (e) => {
        if (user.avatar) {
            dispatch(deleteAvatar());
        }
        const file = e.target.files[0];
        dispatch(uploadAvatar(file));
    }
    return (
        <div className="profile">
            <HeaderTitle>Profile</HeaderTitle>
            <article className="profile__content container">
                <div className="profile__box">
                    <label className="profile__edit">
                        <input className="profile__input-file" accept="image/*" onChange={changeHandler} type="file" />
                        <img src={editBtn} alt="edit" />
                    </label>

                    <div className="profile__ava-box">
                        <img className="profile__ava" src={avatar} alt="User" />
                    </div>
                    <h3 className="profile__email">{user.email}</h3>
                </div>
            </article>
        </div>
    );
}

export default HomePage;