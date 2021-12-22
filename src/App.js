import React, {useEffect} from 'react';
import {useRoutes} from './routes';
import {BrowserRouter} from 'react-router-dom';
import Sidebar from './components/sidebar/Sidebar';
import Loader from './components/loader/Loader';
import { useSelector, useDispatch } from 'react-redux';
import { initializeApp } from './redux/reducers/initializeReducer';

import './styles/style.scss';

function App() {

  const isAuth = useSelector(state => state.user.isAuth);

  const initialized = useSelector(state => state.initializedApp.initialized);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeApp())
  }, [dispatch]);

  // const {token, login, logout, userId, ready} = useAuth();
  // const isAauthenticated = !!token;
  const routes = useRoutes(isAuth);

  if(!initialized) {
    return (
      <Loader/>
    )
  }

  return (
    // <AuthContext.Provider value={{token, login, logout, userId, isAauthenticated}}>
      <BrowserRouter>
        <div className="app">
          {isAuth && <Sidebar/>}
          {routes}
        </div>
      </BrowserRouter>
    /* </AuthContext.Provider> */
  );
}

export default App;
