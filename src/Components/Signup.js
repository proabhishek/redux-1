import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../actions/user.actions';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError('All fields are mandatory');
      setSuccess(null);
      return;
    }

    setError(null);
    setSuccess('Successfully Signed Up');

    const user = {
      name,
      email,
      password,
    };

    const accessToken = uuidv4();

    // save user state to local storage
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('accessToken', accessToken);

    dispatch(setCurrentUser({ user, accessToken }));

    // Navigate to profile after successful signup
    navigate('/profile');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Name' onChange={(e) => setName(e.target.value)} />
      <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
      <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
      <button type='submit'>Sign Up</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
}

export default Signup;
