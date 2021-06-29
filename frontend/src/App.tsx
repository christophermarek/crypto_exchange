import React, { useState } from 'react';
import axios from 'axios';

import Home from './components/Home';

import logo from './logo.svg';
import './App.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [formToDisplay, setFormToDisplay] = useState<string>('register');

  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const registerClicked = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/register', { userName: userName, password: password });
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  }


  const loginClicked = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/login', { userName: userName, password: password });
      let loggedIn = response.data.loggedIn;
      //set if true
      console.log(`log in req returned: ${loggedIn}`)
      setIsLoggedIn(loggedIn);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <p>{isLoggedIn ? 'Logged in' : 'Not Logged in'}</p>
      <p>Exchange Name</p>
      {isLoggedIn ?
        (
          <>
            <input type='button' value='Logout' onClick={() => setIsLoggedIn(false)} />
            <Home />
          </>
        )
        :
        (
          <div className='formSelect'>
            <input type='button' value={'Login'} onClick={() => setFormToDisplay('login')} />
            <input type='button' value={'Register'} onClick={() => setFormToDisplay('register')} />
            {/* Need to separate into components for private state later but right now they are the same fields*/}
            {formToDisplay === 'register' ?
              (
                <div className='register'>
                  <p>Register</p>

                  <p>Username</p><input type='text' value={userName} onChange={(event) => setUserName(event.target.value)} />
                  <p>Password</p><input type='text' value={password} onChange={(event) => setPassword(event.target.value)} />
                  <input type="button" value='Register' onClick={registerClicked} />
                </div>
              )
              :
              (
                <div className='login'>
                  <p>Login</p>

                  <p>Username</p><input type='text' value={userName} onChange={(event) => setUserName(event.target.value)} />
                  <p>Password</p><input type='text' value={password} onChange={(event) => setPassword(event.target.value)} />
                  <input type="button" value='Login' onClick={loginClicked} />
                </div>
              )
            }

          </div>
        )}
    </div>
  );
}

export default App;
