import React, { useState } from 'react';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Error from '../components/Error';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  async function registerUser(user) {
    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccess(true);
      } else {
        throw new Error('Failed to register user');
      }
    } catch (error) {
      console.log(error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister() {
    if (password === confirmPass) {
      const user = { name, email, password, confirm_pass: confirmPass };
      setLoading(true);
      try {
        await registerUser(user);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPass('');
      } catch (error) {
        console.log(error.message);
      }
    } else {
      alert('Password not Matched');
    }
  }

  return (
    <div className='bg-gray-200 h-screen'>
      <Header />
      {loading && <Loader />}
      {error && <Error />}
      <div className="flex justify-center mt-5">
        <div className="flex flex-col w-1/3 sm:w-auto text-xl shadow-lg p-4 py-8 rounded-xl bg-white">
      {success && <p className='bg-green-500 text-center text-white shadow-lg rounded-xl text-lg  p-2 m-2'>You have registered successfully!</p>}

          <div className='space-y-4'>
            <h1 className='font-bold text-2xl text-center'>Register</h1>
            <input
              type="text"
              className='form-control'
              placeholder='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className='form-control'
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className='form-control'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className='form-control'
              placeholder='Confirm password'
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />

            <button className='btn btn-dark' onClick={handleRegister}>Register</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
