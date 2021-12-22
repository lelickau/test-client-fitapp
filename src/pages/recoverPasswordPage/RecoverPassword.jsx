import React, {useState} from 'react';
import InputItem from '../../components/UI/inputs/InputItem';
import ButtonItem from '../../components/UI/buttons/ButtonItem';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../redux/actions/user';
import { setIsError } from '../../redux/actions/global';

import showPass from '../../resources/icons/show-pass.svg';
import hidePass from '../../resources/icons/hide-pass.svg';
import './recoverPassword.scss';

function RecoverPassword() {
    const error = useSelector(state => state.global.isError);
    const success = useSelector(state => state.global.isSuccess);
    const dispatch = useDispatch();
    const history = useHistory();
    const {token} = useParams();
    const [visiblePass, setVisiblePass] = useState(false);
    const [newPassword, setNewPassword] = useState({password: ''});
    const [checkPassword, setCheckPassword] = useState('');

    const toggleShow = (e) => {
        setVisiblePass(!visiblePass)
    }

    const changeHandler = (e) => {
        dispatch(setIsError(false));
        if (e.target.name === 'password') setNewPassword({...newPassword, [e.target.name]: e.target.value});
        if (e.target.name === 'repeat') setCheckPassword(e.target.value);
    }

    const sendNewPassword = (e) => {
        if (!(checkPassword === newPassword.password) || (checkPassword.length < 6)) {
            dispatch(setIsError('Passwords must match and contain at least six characters'))
        } else {
            dispatch(updatePassword(newPassword, token));
            history.push('autorization');
        }
    }

    const backToAutorization = (e) => {
        history.push('/autorization')
    }

    const preventDef = (e) => {
        e.preventDefault();
    }


    return (
    <div className="recover">
        <form onSubmit={preventDef} className="recover__form">
        <div className={error ? "error" : "hidden"}>{error}</div>
        <div className={success ? "success" : "hidden"}>Password successfully recover</div>
        <button onClick={backToAutorization} className="recover__back">Back to log-in</button>
        <h1 className="recover__form-title">Create new password</h1>
            <div className={error ? "recover__pass-box recover__pass-error" : "recover__pass-box"}>
                <InputItem
                    autoComplete="current-password"
                    placeholder="Password"
                    id="updatePassword"
                    type={visiblePass ? "text" : "password"}
                    name="password"
                    value={newPassword.password}
                    onChange={changeHandler}
                />
                <div className="recover__show-pass" onClick={toggleShow}>
                    <img className="recover__show-pass-ico" src={visiblePass ? hidePass : showPass} alt="Show/Hide" />
                </div>
            </div>
            <div className={error ? "recover__pass-box recover__pass-error" : "recover__pass-box"}>
            <InputItem
                    autoComplete="current-password"
                    placeholder="Repeat password"
                    id="repeatPassword"
                    type={visiblePass ? "text" : "password"}
                    name="repeat"
                    value={checkPassword}
                    onChange={changeHandler}
                />
                <div className="recover__show-pass" onClick={toggleShow}>
                    <img className="recover__show-pass-ico" src={visiblePass ? hidePass : showPass} alt="Show/Hide" />
                </div>
            </div>

            <ButtonItem
                onClick={sendNewPassword}
            >Send</ButtonItem>
        </form>
    </div>
    );
}

export default RecoverPassword;