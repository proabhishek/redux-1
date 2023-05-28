import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../actions/user.actions';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');

    dispatch(clearUser());
     // Navigate to signup after logout
     navigate('/signup');
  };

  return (
    <div>
      <h1>Welcome, {currentUser.name}</h1>
      <h2>Email: {currentUser.email}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Profile;
