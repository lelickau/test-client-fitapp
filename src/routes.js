import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import AuthPage from './pages/authPage/AuthPage';
import FoodPage from './pages/foodPage/FoodPage';
import HomePage from './pages/homePage/HomePage';
import NotesPage from './pages/notesPage/NotesPage';
import RecoverPage from './pages/recoverPasswordPage/RecoverPage';
import RecoverPassword from './pages/recoverPasswordPage/RecoverPassword';


export const useRoutes = (isAuth) => {

    if (isAuth) {
        return (
            <Switch>
                <Route path="/foods" exact>
                    <FoodPage/>
                </Route>
                <Route path="/home" exact>
                    <HomePage/>
                </Route>
                <Route path="/notes" exact>
                    <NotesPage/>
                </Route>
                <Redirect to="/foods" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/autorization" exact>
                <AuthPage/>
            </Route>
            <Route path="/recover/:token" exact>
                <RecoverPassword/>
            </Route>
            <Route path="/forget" exact>
                <RecoverPage/>
            </Route>
            <Redirect to="/autorization"/>
        </Switch>
    )
}