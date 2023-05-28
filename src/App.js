import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { setCurrentUser } from './actions/user.actions';
import Signup from './Components/Signup';
import Profile from './Components/Profile';

function App() {
  const currentUser = useSelector((state) => state.currentUser);
  const accessToken = useSelector((state) => state.accessToken);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Fetch user state from local storage when component mounts
  useEffect(() => {
    const localStorageUser = localStorage.getItem('user');
    const localStorageAccessToken = localStorage.getItem('accessToken');

    if (localStorageUser && localStorageAccessToken) {
      const user = JSON.parse(localStorageUser);
      const accessToken = localStorageAccessToken;

      dispatch(setCurrentUser({ user, accessToken }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!accessToken && window.location.pathname === '/profile') {
      navigate('/signup');
    }
    if (accessToken && window.location.pathname === '/signup') {
      navigate('/profile');
    }
  }, [currentUser, accessToken, navigate]);

  return (
    
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
  
  );
}

export default App;
