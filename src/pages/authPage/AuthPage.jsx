import React, {useState, useEffect} from 'react';
import { registration, login } from '../../redux/actions/user';
import {useDispatch, useSelector} from 'react-redux';
import InputItem from '../../components/UI/inputs/InputItem';
import LocalLoader from '../../components/loader/LocalLoader';

import './authPage.scss';
import showPass from '../../resources/icons/show-pass.svg'
import hidePass from '../../resources/icons/hide-pass.svg'
import logo from '../../resources/img/logo-bg.svg';
import { useHistory } from 'react-router';

function AuthPage() {
    const history = useHistory();
    const isError = useSelector(state => state.user.isError);
    const isLoading = useSelector(state => state.global.isLoading);

    const [visiblePass, setVisiblePass] = useState(false);
    const [form, setForm] = useState({
        email: '', password: ''
    });
    const [active, setActive] = useState(false);
    const [emailDirty, setEmailDirty] = useState(false);
    const [passDirty, setPassDirty] = useState(false);
    const [emailErr, setEmailErr] = useState('Please enter an email address.');
    const [passErr, setPassErr] = useState('Please enter a password.');
    const [formValid, setFormValid] = useState(false)
    const dispatch = useDispatch();

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPassDirty(true)
                break
            default:
                return;
        }
    }

    const changeHandler = (e) => {
        setForm({...form, [e.target.name]: e.target.value});

        if (e.target.name === 'email') {
            const re = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;

            if (!re.test(String(e.target.value).toLowerCase())) {
                setEmailErr('Please check the email address entered')
            } else {
                setEmailErr('')
            }
        }
        if (e.target.name === 'password') {
            if (e.target.value.length < 6) {
                setPassErr('The password is too short. Please enter at least 6 characters.')
                if (!e.target.value) {
                    setPassErr('Please enter a password.')
                }
            } else {
                setPassErr('')
            }
        }
    }

    const toggleShow = (e) => {
        setVisiblePass(!visiblePass)
    }

    useEffect(() => {
        if (emailErr || passErr) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailErr, passErr])

    const changeActive = () => {
        setActive(!active)
    }

    const recoverPassword = (e) => {
        history.push('forget')
    }

    const singUp = (e) => {
        dispatch(registration(form));
    }

    const loginUser = (e) => {
        dispatch(login(form))
    }

    const preventDef = (e) => {
        e.preventDefault();
    }


    return (
        <div className="auth">
        <div className="auth__logo"><img src={logo} alt="Check Your Food" /></div>
            <form onSubmit={preventDef} className="auth__form-main">
                <div className={isError ? "auth__error" : 'hidden'}>{isError}</div>
                <div className="auth__form-box">
                    <div className="auth__form">
                        <h1 className={`auth__title ${!active ? '' : "hidden"} `}>Log in</h1>
                        <h1 className={`auth__title ${active ? '' : "hidden"} `}>Sing up</h1>
                        <div className="auth__inputs">
                            <label className="auth__label">Email address
                        {(emailDirty && emailErr) && <span className="auth__err-valid">{` (${emailErr})`}</span>}
                                <InputItem
                                    autoComplete="username"
                                    placeholder="email@mail.com"
                                    id="loginEmail"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={changeHandler}
                                    onBlur={blurHandler}
                                />
                            </label>
                            <label className="auth__label">Password
                            {(passDirty && passErr) && <span className="auth__err-valid">{` (${passErr})`}</span>}
                            <div className="auth__pass-box">
                                <InputItem
                                    autoComplete="current-password"
                                    placeholder="******"
                                    id="loginPassword"
                                    type={visiblePass ? "text" : "password"}
                                    name="password"
                                    value={form.password}
                                    onChange={changeHandler}
                                    onBlur={blurHandler}
                                />
                                <div className="auth__show-pass" onClick={toggleShow}>
                                    <img className="auth__show-pass-ico" src={visiblePass ? hidePass : showPass} alt="Show/Hide" />
                                </div>
                            </div>
                            </label>

                            {!isLoading ? <><button
                                className={`auth__btn ${!active ? '' : "hidden"}`}
                                onClick={loginUser}
                                disabled={!formValid}
                            >Log In</button>
                            <button
                                className={`auth__btn ${active ? '' : "hidden"}`}
                                onClick={singUp}
                                disabled={!formValid}
                            >Sing Up</button></> : <div className="auth__loader-box"><LocalLoader/></div>}
                        </div>
                    </div>
                    <div
                        onClick={recoverPassword}
                        className="auth__forgot"
                    >Forgot Password?</div>
                    <div className="auth__tabs">
                        <div
                            className={`auth__tab ${active ? '' : "hidden"} `}
                            onClick={changeActive}
                        >Already have an account? <span>Sign in</span></div>
                        <div
                            className={`auth__tab ${!active ? '' : "hidden"} `}
                            onClick={changeActive}
                        >New user? Sing up</div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AuthPage;